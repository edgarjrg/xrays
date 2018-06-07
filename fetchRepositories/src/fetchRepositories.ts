import { lensProp, lensPath, view, map, compose, flip, append, transduce } from 'ramda';
import { DoWhileAsync } from "../../repositories/src/DoWhileAsync";
import { BitbucketAPI } from "../../repositories/src/BitbucketAPIs";
import { Auth } from "../../auth/src";

export async function fetchAllPRLinksFrom(callback, repository: IRepository) {
  const bitbucketAPI = new BitbucketAPI(new Auth())

  let page = 1

  const response = await DoWhileAsync(
    () => bitbucketAPI.pullRequests(repository, 'MERGED', page),
    (httpResponse) => httpResponse.next !== undefined,
    (httpResponse) => {
      return callback(httpResponse2ObjectToPreserve(repository, httpResponse))
        .then(() => {
          page++;
        })
    }
  )
}

export function httpResponse2ObjectToPreserve(repository, httpResponse) {
  const links2ObjectToPreserve = map((pullRequestURL) => ({
    ...repository,
    pullRequestURL
  }))

  const httpResponse2Links = map(view(linkLens))

  const transducer = compose(httpResponse2Links, links2ObjectToPreserve)

  return transduce(transducer, flip(append), [], view(valuesLens, httpResponse))
}

export const valuesLens = lensProp('values')
export const linkLens = lensPath<any, string>(['links', 'self', 'href'])