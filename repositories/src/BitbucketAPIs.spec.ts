import { BitbucketAPI } from "./BitbucketAPIs";
import { Auth } from "../../auth/src/index";

describe('Bitbucket API', () => {
  let API: BitbucketAPI
  const repo = {
    projectKey: "atlassian-oauth",
    repoSlug: "atlassian-oauth",
    userName: "atlassian",
  }
  const PullRequestID = 34;

  beforeAll(() => {
    API = new BitbucketAPI(new Auth())
  })
  describe('pullRequests', () => {

    test('should retrieve MERGED pull requests', async () => {
      const response = await API.pullRequests(repo, 'MERGED')
      expect(Object.keys(response)).toMatchSnapshot()
    });

    test('should retrieve DECLINED pull requests', async () => {
      const response = await API.pullRequests(repo, 'DECLINED')
      expect(Object.keys(response)).toMatchSnapshot()
    });

    test('should retrieve OPEN pull requests', async () => {
      const response = await API.pullRequests(repo, 'OPEN')
      expect(Object.keys(response)).toMatchSnapshot()
    });

    test('should retrieve SUPERSEDED pull requests', async () => {
      const response = await API.pullRequests(repo, 'SUPERSEDED')
      expect(Object.keys(response)).toMatchSnapshot()
    });
  })

  describe('activityInPullRequest', () => {
    it('should bring the activity of the Pull Request', async () => {
      const response = await API.activityInPullRequest(repo, PullRequestID)
      expect(Object.keys(response)).toMatchSnapshot()
    });
  });

  describe('pullRequest', () => {
    it('should bring the pull request summary', async () => {
      const response = await API.pullRequest(repo, PullRequestID)
      expect(Object.keys(response)).toMatchSnapshot()
    });
  })

  test('should retrieve username projects', async () => {
    const response = await API.userRepositories(repo)
    expect(Object.keys(response)).toMatchSnapshot()
  });
});

