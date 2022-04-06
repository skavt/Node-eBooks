'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    instanceLevelMethod() {
      return 'test';
    }
  }

  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(1024),
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    imagePath: DataTypes.STRING,
    passwordResetToken: DataTypes.STRING(1024),
    resetTokenExpireDate: DataTypes.DATE,
    accessToken: DataTypes.STRING(1024),
    accessTokenExpireDate: DataTypes.DATE,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('NOW'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('NOW'),
    },
  }, {
    sequelize,
    modelName: 'User',
  });
}