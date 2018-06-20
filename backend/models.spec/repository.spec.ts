'use strict'

import { db } from '../sequelize'
import { Repository } from "../models/repository";
import { omit, map } from 'ramda';

const repository = {
  projectKey: "atlassian-oauth",
  repoSlug: "atlassian-oauth",
  userName: "atlassian",
}

describe('repository @database', () => {
  beforeAll(() => {
    const sequelize = db()
    sequelize.models.Repository.destroy({ truncate: true, cascade: true })
  })

  it('should read an write', () => {

    return Repository
      .create(repository)
      .then(response => response.dataValues)
      .then(omit(['id', 'createdAt', 'updatedAt']))
      .then(result => {
        expect(result).toMatchSnapshot()
      })
  })
})
