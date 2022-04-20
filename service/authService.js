const model = require('../models');
const crypto = require('crypto');
const randomstring = require('randomstring');

const login = async (userData) => {
  const user = await model.user.findOne({
    where: {
      email: userData.email,
      password: crypto.createHash('sha256').update(userData.password).digest('base64'),
    }
  })

  if (user) {
    const today = new Date();
    const params = {
      access_token_expire_date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
      updated_at: today,
    }
    if (!user.access_token) {
      user.update({...params, access_token: randomstring.generate(256)});
    }
    user.update(params);

    return {
      success: true, data: {access_token: user.access_token,}
    };
  }

  return {success: false, message: 'Email or Password is not correct'};
}

const register = async (userData) => {
  const uuid = require('uuid').v4();
  const today = new Date();
  const params = {
    uuid: uuid,
    username: userData.email,
    email: userData.email,
    first_name: userData.first_name,
    last_name: userData.last_name,
    password: crypto.createHash('sha256').update(userData.password).digest('base64'),
    register_token: randomstring.generate(256),
    register_token_expire_date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
    created_at: today,
    updated_at: today,
  }

  const user = await model.user.create(params);
  if (user) {
    return {
      success: true, message: `User '${user.email}' created successfully. Please confirm your email`, data: {
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        register_token: user.register_token,
      }
    }
  }
  return {success: false, message: 'Unable to create user'};
}

const getCurrentUser = async (token) => {
  const {success, data} = await findUserByToken(token);

  if (success) {
    return {
      success: true, data: {
        uuid: data.uuid,
        email: data.email,
        username: data.username,
        first_name: data.first_name,
        last_name: data.last_name,
      }
    };
  }
  return {success: false};
}

const findUserByToken = async (token) => {
  const user = await model.user.findOne({where: {access_token: token}});

  if (user) {
    return {success: true, data: user};
  }
  return {success: false};
}

module.exports = {
  login,
  register,
  getCurrentUser,
}