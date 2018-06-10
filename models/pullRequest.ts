import { Model, Column, Table, UpdatedAt, CreatedAt, DataType } from "sequelize-typescript";

@Table({ tableName: 'PULL_REQUEST' })
export class PullRequest extends Model<PullRequest> {

  @Column({ field: 'project_key' })
  projectKey?: string;

  @Column({ field: 'pull_request_url' })
  pullRequestURL?: string;

  @Column({ field: 'user_name' })
  userName?: string;

  @Column({ field: 'repo_slug' })
  repoSlug?: string;

  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt?: Date;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt?: Date;
}

export default PullRequest