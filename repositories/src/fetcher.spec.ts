import { Fetcher } from './fetcher'
import { Repository } from "./BitbucketAPIs";
import { Auth } from "../../auth/src/index";
import * as Bluebird from 'bluebird';

test('should iterate while matched criteria', async () => {
  const fetcher = new Fetcher()
  let accumulator = 0
  const responses: any[] = []

  await fetcher.start(
    () => Bluebird.resolve(++accumulator),
    (r) => r !== 4,
    (r) => {
      responses.push(r)
    }
  )

  expect(responses).toEqual([1, 2, 3, 4])

});

test('should retrieve repository information', async () => {
  const fetcher = new Fetcher()
  const responses: any[] = []
  const repository = new Repository(new Auth())
  const repositories = await repository.repositories()

  await fetcher.start(
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

