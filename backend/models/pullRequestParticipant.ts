import { Model, Column, Table, UpdatedAt, CreatedAt, DataType } from "sequelize-typescript";

@Table({ tableName: 'PULL_REQUEST_PARTICIPANT' })
export class PullRequestParticipant extends Model<PullRequestParticipant> {

  @Column({ field: 'date' })
  date?: string;

  @Column({ field: 'pull_request_url' })
  pullRequestURL?: string;

  @Column({ field: 'author' })
  author?: string;

  @Column({ field: 'type' })
  type?: string;

  @CreatedAt
  @Column({ field: 'created_at', type: DataType.DATE })
  createdAt?: Date;

  @UpdatedAt
  @Column({ field: 'updated_at', type: DataType.DATE })
  updatedAt?: Date;
}

export default PullRequestParticipant