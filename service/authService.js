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
      success: true, user: {
        access_token: user.access_token,
        username: user.username,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        uuid: user.uuid,
      }
    };
  }

  return {success: false, message: 'Email or Password is not correct'};
}

module.exports = {
  login,
}