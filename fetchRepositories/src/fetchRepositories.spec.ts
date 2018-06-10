import { valuesLens, linkLens, fetchAllPRLinksFrom, httpResponse2ObjectToPreserve } from './fetchRepositories';
import { view } from 'ramda';
import * as Bluebird from 'bluebird';

const repository = {
  projectKey: "atlassian-oauth",
  repoSlug: "atlassian-oauth",
  userName: "atlassian",
}

test('valuesLens should bring the value of response', async () => {
  const PRsResponse = require('./testData/mergedPRsResponse.json')
  const valuesLensResponse = require('./testData/valuesLensResponse.json')
  expect(view(valuesLens, PRsResponse)).toEqual(valuesLensResponse)
});

test('linkLens should bring the link of the PR', async () => {
  const linkLensInput = require('./testData/linkLens.input.json')
  const linkLensExpected = require('./testData/linkLens.expected.json')
  expect(view<string, any>(linkLens, linkLensInput)).toEqual(linkLensExpected)
});

test('httpResponse2ObjectToPreserve', async () => {
  const PRsResponse = require('./testData/mergedPRsResponse.json')


  const response = httpResponse2ObjectToPreserve(repository, PRsResponse)
  expect(response).toMatchSnapshot()
});

describe('fetchAllPRLinksFrom', () => {
  it('should bring all repository from a repository @integration @slow', async () => {

    const spy = jest.fn(((a) => Bluebird.resolve({})))

    const response = await fetchAllPRLinksFrom(spy, repository)


    expect(spy.mock.calls).toMatchSnapshot()
  }, 10000);
});