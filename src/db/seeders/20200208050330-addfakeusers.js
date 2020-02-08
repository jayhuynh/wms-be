'use strict';
const faker = require('faker/locale/vi');

module.exports = {
  up: (queryInterface, Sequelize) => {

    let seeds = [];

    for (var i = 0; i < 97; i++) {
      faker.seed(i);
      const isAdmin = (Math.random() > 0.5) ? true : false;
      const seed = {
        email: 'testEmailYouMfker_'+faker.internet.email(),
        full_name: faker.name.findName(),
        password: faker.internet.password(),
        role: isAdmin ? 'admin' : 'sub',
      };
      seeds.push(seed);
    }

    return queryInterface.bulkInsert('wms_users', seeds, {});
  },
  down: (queryInterface, Sequelize) => {
    const {
      Op
    } = Sequelize;
    return queryInterface.bulkDelete('wms_users', {
      email: {
        [Op.like]: 'testEmailYouMfker_%'
      }
    }, {});
  }
};