interface CommentsInPullRequest {
  pagelen: number,
  values: {
    links: any,
    deleted: boolean,
    pullrequest: any,
    content: any,
    created_on: string,
    user: any,
    inline: any,
    updated_on: string,
    type: string,
    id: number
  }[],
  page: number,
  size: number
}
