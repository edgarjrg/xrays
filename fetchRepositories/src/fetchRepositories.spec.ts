import { valuesLens, linkLens, getLinks, fetchAllPRLinksFrom } from './fetchRepositories'
import { view } from 'ramda'

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

test('getLinks should bring the link of the PR', async () => {
  const PRsResponse = require('./testData/mergedPRsResponse.json')
  expect(getLinks(PRsResponse)).toMatchSnapshot()
});



describe('fetchAllPRLinksFrom', () => {
  it('should brind all repos from a repository', async () => {
    const repo = {
      projectKey: "atlassian-oauth",
      repoSlug: "atlassian-oauth",
      userName: "atlassian",
    }
    const response = await fetchAllPRLinksFrom(repo)

    expect(response).toMatchSnapshot()
  });
});

