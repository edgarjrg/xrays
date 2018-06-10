import { lensProp, lensPath, view, map, compose, flip, append, transduce } from 'ramda';
import { DoWhileAsync } from "../../repositories/src/DoWhileAsync";
import { BitbucketAPI } from "../../repositories/src/BitbucketAPIs";
import { Auth } from "../../auth/src";
import { PullRequest } from '../../models/pullRequest'
import * as Bluebird from 'bluebird'

export async function FetchAndStorePullRequestFromRepository(repository: IRepository) {
  return new FetchingAndStoringProcess()
    .that.will
    .fetchFromRepository(repository)
    .using(allPullRequestLinksFetcher)
    .and.will
    .storeAtEachStepUsing(pullRequestBulkStore)
    .startingNow()
}

export function retrieveAllPRsFromRepository(repository: IRepository) {
  return PullRequest.findAll({
    where: {
      ...repository
    },
    raw: true
  })
}

function pullRequestBulkStore(data) {
  return PullRequest.bulkCreate(data)
}

class FetchingAndStoringProcess {
  readonly and = this
  readonly that = this
  readonly will = this
  private preserver?: () => Bluebird<any>
  private repository?: IRepository
  private fetcher

  storeAtEachStepUsing(preserverImplementation) {
    this.preserver = preserverImplementation
    return this
  }

  using(fetcherImplementation) {
    this.fetcher = fetcherImplementation;
    return this
  }

  fetchFromRepository(repository: IRepository) {
    this.repository = repository
    return this
  }

  async startingNow() {
    if (this.passesAllStartPolicies()) {
      return this.fetcher(this.preserver, this.repository!)
    }
    else {
      return FetchingAndStoringProcess.startError(this)
    }
  }

  private passesAllStartPolicies() {
    return (this.preserver && this.repository) ? true : false
  }

  private static startError(instance: FetchingAndStoringProcess) {
    return new Error('Either the preserver or the repository is not well defined!')
  }

}

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