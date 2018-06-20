import { Model, Column, Table, UpdatedAt, CreatedAt, DataType } from "sequelize-typescript";

@Table({ tableName: 'REPOSITORY' })
export class Repository extends Model<Repository> {

  @Column({ field: 'project_key' })
  projectKey?: string;

  @Column({ field: 'repo_slug' })
  repoSlug?: string;

  @Column({ field: 'user_name' })
  userName?: string;

  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt?: Date;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt?: Date;
}

export default Repository