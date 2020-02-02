'use strict';
module.exports = (queryInterface, Sequelize) => {
  const {
    Op
  } = Sequelize;
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
    deletedAt: {
      allowNull: true,
      type: Sequelize.DATE,
      defaultValue: null,
      field: "deleted_at"
    }
  }, {
    defaultScope: {
      attributes: {
        exclude: ['password', 'deletedAt']
      },
      where: {
        deletedAt: {
          [Op.is]: null
        }
      }
    }
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};