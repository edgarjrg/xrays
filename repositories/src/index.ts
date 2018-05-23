import * as  Promise from "bluebird";
import fetch from "node-fetch";
import { Auth } from "../../auth/src";
import { repositories } from "../../creds/repos";
import {
  ACTIVITY_IN_PULL_REQUESTS_TEMPLATE,
  AUTHORIZATION_TEMPLATE,
  COMMENTS_IN_PULL_REQUEST_TEMPLATE,
} from "./apiTemplates";
import { IRepository } from "./IRepository";

function fetchFromAPI({ Authorization, URL }) {
  return Promise
    .resolve(
      fetch(URL, {
        headers: {
          Authorization,
        },
        method: "GET",
      }))
    .then((response) => response.json());
}

export class Repository {
  public auth: Auth;
  constructor(auth) {
    this.auth = auth;
  }

  public repositories(): Promise<IRepository> {
    return Promise.resolve(repositories);
  }

  public activityInPullRequests(repository) {
    return this.auth.logIn()
      .then((authentication) =>
        fetchFromAPI({
          Authorization: AUTHORIZATION_TEMPLATE(authentication.access_token),
          URL: ACTIVITY_IN_PULL_REQUESTS_TEMPLATE(repository),
        }));
  }

  public commentsInPullRequest(repository, pullRequestID) {
    return this.auth.logIn()
      .then((authentication) =>
        fetchFromAPI({
          Authorization: AUTHORIZATION_TEMPLATE(authentication['access_token']),
          URL: COMMENTS_IN_PULL_REQUEST_TEMPLATE(repository, pullRequestID)
        }))
  }
}

// // manual tests
// const r = new Repository(new Auth());

// r.repositories()
//   .tap(console.log)
//   .then((repositories) => r.commentsInPullRequest(repositories[0], 330))
//   .then(JSON.stringify)
//   .tap(console.log)
//   .catch(console.error);
