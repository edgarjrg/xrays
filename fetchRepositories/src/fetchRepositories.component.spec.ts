import { preserveAllPRsFromRepository, retrieveAllPRsFromRepository } from './fetchRepositories';
import { db } from '../../sequelize'
import { omit, map, pipe } from 'ramda';

const repository = {
  projectKey: "atlassian-oauth",
  repoSlug: "atlassian-oauth",
  userName: "atlassian",
}

describe('preserveAllPRsFromRepository @network @database', () => {
  beforeAll(() => {
    const sequelize = db()
    sequelize.models.PullRequest.destroy({ truncate: true, cascade: true })
  })

  it('should bring all repository pull request and save them in database', async () => {

    await preserveAllPRsFromRepository(repository)

    const result = await retrieveAllPRsFromRepository(repository)

    expect(map(omit(['id', 'createdAt', 'updatedAt']), result)).toMatchSnapshot()

  }, 10000);
});

