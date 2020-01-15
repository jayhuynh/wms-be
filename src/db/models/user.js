'use strict';
module.exports = (queryInterface, Sequelize) => {
  const User = queryInterface.define('user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING
    },
    full_name: {
      type: Sequelize.STRING
    },
    role: {
      allowNull: false,
      type: Sequelize.STRING
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
      defaultValue: Sequelize.literal('NOW() ON UPDATE NOW()'),
      field: "updated_at"
    }
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};