import { DoWhileAsync } from './DoWhileAsync'
import { Repository } from "./BitbucketAPIs";
import { Auth } from "../../auth/src/index";
import * as Bluebird from 'bluebird';

test('should iterate while matched criteria', async () => {
  let accumulator = 0
  const responses: any[] = []

  await DoWhileAsync(
    () => Bluebird.resolve(++accumulator),
    (r) => r !== 4,
    (r) => {
      responses.push(r)
    }
  )

  expect(responses).toEqual([1, 2, 3, 4])

});

test('should retrieve repository information', async () => {
  const responses: any[] = []
  const repository = new Repository(new Auth())
  const repositories = await repository.repositories()

  await DoWhileAsync(
    () => repository.activityInPullRequest(repositories[0], 1),
    (r) => r.next !== undefined,
    (r) => {
      responses.push(r)
    }
  )

  expect(responses[0]).toHaveProperty('pagelen')
  expect(responses[0]).toHaveProperty('values')
  expect(responses[0]).toHaveProperty('values')

});

