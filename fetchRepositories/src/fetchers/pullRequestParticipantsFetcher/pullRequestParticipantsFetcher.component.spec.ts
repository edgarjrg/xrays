import { pullRequestParticipantBulkStore } from './pullRequestParticipantsFetcher';
import { db } from "../../../../sequelize";
import { map, omit } from "ramda";

describe('pullRequestParticipantBulkStore', () => {

  beforeAll(() => {
    const sequelize = db()
    sequelize.models.PullRequestParticipant.destroy({ truncate: true, cascade: true })
  })

  const bulkRequestParticipants = [
    {
      "author": "https://api.bitbucket.org/2.0/users/lpater",
      "date": "2017-03-07T15:11:57.673660+00:00",
      "pullRequestURL": "https://api.bitbucket.org/2.0/repositories/atlassian/atlassian-oauth/pullrequests/34",
      "type": "participant",
    },
    {
      "author": "https://api.bitbucket.org/2.0/users/ppetrowski",
      "date": "2017-02-27T15:31:22.497552+00:00",
      "pullRequestURL": "https://api.bitbucket.org/2.0/repositories/atlassian/atlassian-oauth/pullrequests/34",
      "type": "author",
    }
  ]
  test('should preserve all the thing', async () => {
    const result = await pullRequestParticipantBulkStore(bulkRequestParticipants)
    expect(map(omit(['id', 'createdAt', 'updatedAt']), result)).toMatchSnapshot()

  })
})
