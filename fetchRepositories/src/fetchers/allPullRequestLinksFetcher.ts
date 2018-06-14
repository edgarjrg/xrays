import { DoWhileAsync } from "../../../repositories/src/DoWhileAsync";
import { BitbucketAPI } from "../../../repositories/src/BitbucketAPIs";
import { Auth } from "../../../auth/src";
import { lensProp, lensPath, view, map, compose, flip, append, transduce } from 'ramda';


export async function allPullRequestLinksFetcher(callback, repository: IRepository) {
  const bitbucketAPI = new BitbucketAPI(new Auth())

  let page = 1

  await DoWhileAsync(
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

  const transducer = compose(httpResponse2Links, links2ObjectToPreserve(repository))

  return transduce(transducer, flip(append), [], view(valuesLens, httpResponse))

}

export const valuesLens = lensProp('values')
export const linkLens = lensPath<any, string>(['links', 'self', 'href'])

var links2ObjectToPreserve = repository => map((pullRequestURL) => ({
  ...repository,
  pullRequestURL
}))

const httpResponse2Links = map(view(linkLens))