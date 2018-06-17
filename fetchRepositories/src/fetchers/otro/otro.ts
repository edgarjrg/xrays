import { DoWhileAsync } from "../../../../repositories/src/DoWhileAsync";
import { BitbucketAPI } from "../../../../repositories/src/BitbucketAPIs";
import { Auth } from "../../../../auth/src";
import { into, has, last, filter, map, transduce, compose, lensPath, view, applySpec, lensProp, prop } from 'ramda'
import { PullRequestParticipant } from "../../../../models/pullRequestParticipant";

const approvalLens = lensProp('approval')
const usersLens = lensProp('user')
const dateLens = lensProp('date')
const updateLens = lensProp('update')
const pullRequestLens = lensProp('pull_request')
const hrefLinkLens = lensPath(['links', 'self', 'href'])


export function findAuthor(httpResponse) {
  if (!httpResponse.next) {
    const firstActivity = last(httpResponse.values)

    const authorObj = applySpec({
      pullRequestURL: view(compose(pullRequestLens, hrefLinkLens)),
      date: view(compose(updateLens, dateLens)),
      author: view(lensPath(['update', 'author', 'links', 'self', 'href'])),
      type: () => 'author'
    })

    return authorObj(firstActivity)
  }
}

export function findApprovers(httpResponse) {
  const activities = httpResponse.values
  const filterApprovals = filter(has('approval'))
  const getUser = map(applySpec({
    pullRequestURL: view(compose(pullRequestLens, hrefLinkLens)),
    date: view(compose(approvalLens, dateLens)),
    author: view(compose(approvalLens, usersLens, hrefLinkLens)),
    type: () => 'participant'
  }))

  const transducer = compose(filterApprovals, getUser)
  return into([], transducer, activities)
}

export function pullRequestParticipantBulkStore(data) {
  return PullRequestParticipant.bulkCreate(data).then(map(prop('dataValues')))
}