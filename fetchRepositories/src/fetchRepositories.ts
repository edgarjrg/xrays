import { allPullRequestLinksFetcher } from "./fetchers/allPullRequestLinksFetcher";
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