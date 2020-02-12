'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('wms_users', [{
      email: 'nhanvo@gmail.com',
      full_name: 'Nhan Vo',
      password: 'random',
      role: 'admin',
    }, {
      email: 'duonghuynh@gmail.com',
      full_name: 'Duong Huynh',
      password: 'random2',
      role: 'sub',
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('wms_users', {
      email: {
        [Op.or]: [
          "duonghuynh@gmail.com",
          "nhanvo@gmail.com"
        ]
      }
    }, {});
  }
};