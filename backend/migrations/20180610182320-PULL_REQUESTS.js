// @ts-check
'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PULL_REQUEST', {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
      },
      "project_key": {
        type: Sequelize.STRING,
        allowNull: false
      },
      "pull_request_url": {
        type: Sequelize.STRING,
        allowNull: false
      },
      "repo_slug": {
        type: Sequelize.STRING,
        allowNull: false
      },
      "user_name": {
        type: Sequelize.STRING,
        allowNull: false
      },
      "created_at": {
        type: Sequelize.DATE
      },
      "updated_at": {
        type: Sequelize.DATE
      }
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PULL_REQUEST')
  }
};
