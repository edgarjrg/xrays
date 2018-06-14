export const api2: string = "https://api.bitbucket.org/2.0/";
import { stringify } from "querystring";

export const AUTHORIZATION_TEMPLATE =
    (accessToken: string): string =>
        `Bearer ${accessToken}`;

export const COMMENTS_IN_PULL_REQUEST_TEMPLATE =
    ({ userName, repoSlug }: IRepository, pullRequestId: number): string =>
        `${api2}repositories/${userName}/${repoSlug}/pullrequests/${pullRequestId}/comments`;

export const ACTIVITY_IN_PULL_REQUESTS_TEMPLATE =
    ({ userName, repoSlug }: IRepository): string =>
        `${api2}repositories/${userName}/${repoSlug}/pullrequests/activity`;

export const ACTIVITY_IN_PULL_REQUEST_TEMPLATE =
    ({ userName, repoSlug }: IRepository, pullRequestId: number): string =>
        `${api2}repositories/${userName}/${repoSlug}/pullrequests/${pullRequestId}/activity`;

export const PULL_REQUEST_TEMPLATE =
    ({ userName, repoSlug }: IRepository, pullRequestId: number): string =>
        `${api2}repositories/${userName}/${repoSlug}/pullrequests/${pullRequestId}`;

export const PULL_REQUESTS_TEMPLATE =
    ({ userName, repoSlug }: IRepository, state: PULL_REQUEST_STATE = 'OPEN', page: number = 1): string =>
        `${api2}repositories/${userName}/${repoSlug}/pullrequests/?${stringify({ state, page })}`;

export const REPOSITORIES_TEMPLATE =
    ({ userName }: IRepository): string =>
        `${api2}repositories/${userName}/?page=2`;

