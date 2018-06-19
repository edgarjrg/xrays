import { findAuthor, findApprovers } from './pullRequestParticipantsFetcher';
import { ap } from 'ramda';
// import * as Bluebird from 'bluebird';

const pullRequestLink = {
  "projectKey": "atlassian-oauth",
  "pullRequestURL": "https://api.bitbucket.org/2.0/repositories/atlassian/atlassian-oauth/pullrequests/24",
  "repoSlug": "atlassian-oauth",
  "userName": "atlassian",
}

describe('finders', () => {
  const firstPage = require('./testData/firstPage.json')
  const secondPage = require('./testData/secondPage.json')

  test('findAuthor should get author', async () => {
    expect(ap([findAuthor], [firstPage, secondPage])).toMatchSnapshot()
  });

  test('findApprovers should get approvers', async () => {
    expect(ap([findApprovers], [firstPage, secondPage])).toMatchSnapshot()
  });

  test('', () => {
    expect(ap([findAuthor, findApprovers], [firstPage, secondPage])).toMatchSnapshot()
  })
});
