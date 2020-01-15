'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('users', [{
        email: 'duonghuynh@gmail.com',
        full_name: 'Duong Huynh',
        password: 'random2',
        role: 'sub',
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
