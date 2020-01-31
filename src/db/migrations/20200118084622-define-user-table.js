'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('wms_users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING(255),
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      fullName: {
        type: Sequelize.STRING,
        field: "full_name"
      },
      role: {
        allowNull: false,
        type: Sequelize.STRING(50)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),
        field: "created_at"
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW'),//sequelize call this again whenever update
        field: "updated_at"
      },
      deletedAt: {//only show rows which deleted_at is null
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null,
        field: "deleted_at"
      }
    }, {});
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('wms_users');
  }
};