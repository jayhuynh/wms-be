'use strict';
module.exports = (queryInterface, Sequelize) => {
  const User = queryInterface.define('wms_user', {
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
    full_name: {
      type: Sequelize.STRING
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
      defaultValue: Sequelize.literal('NOW() ON UPDATE NOW()'),
      field: "updated_at"
    }
  }, {
    charset: 'utf8',
    collate: 'utf8_general_ci'
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};