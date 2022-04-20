'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING(512),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(512),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(1024),
        allowNull: false,
      },
      first_name: {
        type: Sequelize.STRING(512),
        allowNull: false,
      },
      last_name: {
        type: Sequelize.STRING(512),
        allowNull: false,
      },
      status: Sequelize.STRING,
      image_path: Sequelize.STRING,
      password_reset_token: Sequelize.STRING(1024),
      reset_token_expire_date: Sequelize.DATE,
      register_token: Sequelize.STRING(1024),
      register_token_expire_date: Sequelize.DATE,
      access_token: Sequelize.STRING(1024),
      access_token_expire_date: Sequelize.DATE,
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        field: 'updated_at'
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
        field: 'created_at'
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};