import { BitbucketAPI } from "./BitbucketAPIs";
import { Auth } from "../../auth/src/index";

describe('pullRequests', () => {
  let repository: BitbucketAPI
  const repo = {
    projectKey: "atlassian-oauth",
    repoSlug: "atlassian-oauth",
    userName: "atlassian",
  }
  beforeAll(() => {
    repository = new BitbucketAPI(new Auth())
  })

  test('should retrieve MERGED pull requests', async () => {
    const response = await repository.pullRequests(repo, 'MERGED')
    expect(Object.keys(response)).toMatchSnapshot()
  });

  test('should retrieve DECLINED pull requests', async () => {
    const response = await repository.pullRequests(repo, 'DECLINED')
    expect(Object.keys(response)).toMatchSnapshot()
  });

  test('should retrieve OPEN pull requests', async () => {
    const response = await repository.pullRequests(repo, 'OPEN')
    expect(Object.keys(response)).toMatchSnapshot()
  });

  test('should retrieve SUPERSEDED pull requests', async () => {
    const response = await repository.pullRequests(repo, 'SUPERSEDED')
    expect(Object.keys(response)).toMatchSnapshot()
  });
})

test('should retrieve username projects', async () => {
  const repository = new BitbucketAPI(new Auth())
  const repo = {
    projectKey: "atlassian-oauth",
    repoSlug: "atlassian-oauth",
    userName: "atlassian",
  }

  const response = await repository.userRepositories(repo)
  expect(Object.keys(response)).toMatchSnapshot()

});

