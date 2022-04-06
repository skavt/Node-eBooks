'use strict';

const uuid = require('uuid').v4();
const crypto = require('crypto');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users', [{
      uuid: uuid,
      username: 'Admin',
      email: 'admin@example.com',
      password: crypto.createHash('sha256').update('admin123').digest('base64'),
      first_name: 'admin',
      last_name: 'admin',
    }]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};
