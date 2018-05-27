import { IRepository } from "./IRepository";

export const api2: string = "https://api.bitbucket.org/2.0/";

// export const api1: string = "https://bitbucket.org/rest/api/1.0";

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

// export function TASKS_IN_PULL_REQUEST_TEMPLATE({ repoSlug, projectKey }: IRepository, pullRequestId: number): string {
//     return `${api1}/projects/${projectKey}/repos/${repoSlug}/pull-requests/${pullRequestId}/tasks`;
// }
