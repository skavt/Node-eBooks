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
      firstName: {
        type: Sequelize.STRING(512),
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING(512),
        allowNull: false,
      },
      imagePath: Sequelize.STRING,
      passwordResetToken: Sequelize.STRING(1024),
      resetTokenExpireDate: Sequelize.DATE,
      accessToken: Sequelize.STRING(1024),
      accessTokenExpireDate: Sequelize.DATE,
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW'),
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};