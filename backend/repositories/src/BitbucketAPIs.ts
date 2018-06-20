import * as Bluebird from "bluebird";
import fetch from "node-fetch";
import { Auth } from "../../auth/src";
import { repositories } from "../../creds/repos";
import {
  ACTIVITY_IN_PULL_REQUESTS_TEMPLATE,
  ACTIVITY_IN_PULL_REQUEST_TEMPLATE,
  AUTHORIZATION_TEMPLATE,
  COMMENTS_IN_PULL_REQUEST_TEMPLATE,
  PULL_REQUESTS_TEMPLATE,
  REPOSITORIES_TEMPLATE,
  PULL_REQUEST_TEMPLATE
} from "./apiTemplates";

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

export class BitbucketAPI {
  public auth: Auth;
  constructor(auth) {
    this.auth = auth;
  }

  public repositories(): Bluebird<IRepository[]> {
    return Bluebird.resolve(repositories);
  }

  public userRepositories(repository: IRepository): Bluebird<any> {
    return this.auth.logIn()
      .then((authentication) =>
        fetchFromAPI({
          Authorization: AUTHORIZATION_TEMPLATE(authentication.access_token),
          URL: REPOSITORIES_TEMPLATE(repository),
        }));
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

  public pullRequests(repository: IRepository, state?: PULL_REQUEST_STATE, page?: number): Bluebird<any> {
    return this.auth.logIn()
      .then((authentication) =>
        fetchFromAPI<any>({
          Authorization: AUTHORIZATION_TEMPLATE(authentication.access_token),
          URL: PULL_REQUESTS_TEMPLATE(repository, state, page),
        }));
  }

  public pullRequest(repository: IRepository, pullRequestID: number): Bluebird<any> {
    return this.auth.logIn()
      .then((authentication) =>
        fetchFromAPI<any>({
          Authorization: AUTHORIZATION_TEMPLATE(authentication.access_token),
          URL: PULL_REQUEST_TEMPLATE(repository, pullRequestID),
        }));
  }
}