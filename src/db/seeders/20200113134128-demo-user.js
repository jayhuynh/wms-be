'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
      return queryInterface.bulkInsert('users', [{
        email: 'nhanvo@gmail.com',
        full_name: 'Nhan Vo',
        password: 'random',
        role: 'admin',
      }], {});
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.bulkDelete('users', null, {});
  }
};
