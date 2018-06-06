import { lensProp, lensPath, view, map, chain } from 'ramda';
import { DoWhileAsync } from "../../repositories/src/DoWhileAsync";
import { Repository } from "../../repositories/src/BitbucketAPIs";
import { Auth } from "../../auth/src";

export async function fetchAllPRLinksFrom(repo: IRepository) {
  const responses: any[] = []
  const repository = new Repository(new Auth())
  const repositories = await repository.repositories()
  let page = 1

  const response = await DoWhileAsync(
    () => repository.pullRequests(repo, 'MERGED', page),
    (r) => r.next !== undefined,
    (r) => {
      responses.push(r)
      page++;
    }
  )

  return chain(getLinks, responses)
}

export const valuesLens = lensProp('values')
export const linkLens = lensPath<any, string>(['links', 'self', 'href'])

export function getLinks(input): string[] {
  return map(view(linkLens), view(valuesLens, input))
}