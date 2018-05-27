import * as Bluebird from "bluebird";
import fetch from "node-fetch";
import { Auth } from "../../auth/src";
import { repositories } from "../../creds/repos";
import {
  ACTIVITY_IN_PULL_REQUESTS_TEMPLATE,
  ACTIVITY_IN_PULL_REQUEST_TEMPLATE,
  AUTHORIZATION_TEMPLATE,
  COMMENTS_IN_PULL_REQUEST_TEMPLATE,
} from "./apiTemplates";
import { CommentsInPullRequest, IRepository } from './interfaces'

function fetchFromAPI<T>({ Authorization, URL }: { Authorization: string, URL: string }): Bluebird<T> {
  return Bluebird
    .resolve(
      fetch(URL, {
        headers: {
          Authorization,
        },
        method: "GET",
      }))
    .then((response) => response.json() as Promise<T>);
}

export class Repository {
  public auth: Auth;
  constructor(auth) {
    this.auth = auth;
  }

  public repositories(): Promise<IRepository[]> {
    return Promise.resolve(repositories);
  }

  public activityInPullRequests(repository: IRepository): Bluebird<any> {
    return this.auth.logIn()
      .then((authentication) =>
        fetchFromAPI({
          Authorization: AUTHORIZATION_TEMPLATE(authentication.access_token),
          URL: ACTIVITY_IN_PULL_REQUESTS_TEMPLATE(repository),
        }));
  }

  public commentsInPullRequest(repository: IRepository, pullRequestID: number): Bluebird<CommentsInPullRequest> {
    return this.auth.logIn()
      .then((authentication) =>
        fetchFromAPI<CommentsInPullRequest>({
          Authorization: AUTHORIZATION_TEMPLATE(authentication.access_token),
          URL: COMMENTS_IN_PULL_REQUEST_TEMPLATE(repository, pullRequestID)
        }))
  }

  public retrieveComment(url) {
    return this.auth.logIn()
      .then((authentication) =>
        fetchFromAPI({
          Authorization: AUTHORIZATION_TEMPLATE(authentication.access_token),
          URL: url
        }))
  }

  public activityInPullRequest(repository: IRepository, pullRequestID: number): Bluebird<any> {
    return this.auth.logIn()
      .then((authentication) =>
        fetchFromAPI<any>({
          Authorization: AUTHORIZATION_TEMPLATE(authentication.access_token),
          URL: ACTIVITY_IN_PULL_REQUEST_TEMPLATE(repository, pullRequestID),
        }));
  }
}

// // manual tests
// const r = new Repository(new Auth());

// r.repositories()
//   .tap(console.log)
//   // .then((repositories) => r.commentsInPullRequest(repositories[0], 330))
//   // .then((repositories) => r.activityInPullRequests(repositories[0]))
//   // .then((repositories) => r.activityInPullRequest(repositories[0], 360))
//   // .then((repositories) => r.activityInPullRequest(repositories[1], 14))
//   // .then((repositories) => r.retrieveComment("https://api.bitbucket.org/2.0/repositories/mxitechnologies/le-web/pullrequests/361/comments/65373531"))
//   .then(JSON.stringify)
//   .tap(console.log)
//   .catch(console.error);