'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('PULL_REQUEST_PARTICIPANT', {
      id: {
        type: Sequelize.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
      },
      "date": {
        type: Sequelize.STRING,
        allowNull: false
      },
      "pull_request_url": {
        type: Sequelize.STRING,
        allowNull: false
      },
      "author": {
        type: Sequelize.STRING,
        allowNull: false
      },
      "type": {
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
    return queryInterface.dropTable('PULL_REQUEST_PARTICIPANT')
  }
};
