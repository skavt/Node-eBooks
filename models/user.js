'use strict';

const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user extends Model {
  }

  user.init({
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
    first_name: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING(512),
      allowNull: false,
    },
    status: DataTypes.STRING,
    image_path: DataTypes.STRING,
    password_reset_token: DataTypes.STRING(1024),
    reset_token_expire_date: DataTypes.DATE,
    register_token: DataTypes.STRING(1024),
    register_token_expire_date: DataTypes.DATE,
    access_token: DataTypes.STRING(1024),
    access_token_expire_date: DataTypes.DATE,
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('NOW'),
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.fn('NOW'),
      field: 'updated_at',
    },
  }, {
    sequelize,
    modelName: 'user',
  });

  return user;
}