const model = require('../models/index.js');
const crypto = require('crypto');
const randomstring = require('randomstring');

const login = (userData) => {
  return new Promise(async (resolve, reject) => {
    const user = await model.user.findOne({
      where: {
        email: userData.email,
        password: crypto.createHash('sha256').update(userData.password).digest('base64'),
      }
    })
    if (user) {
      const today = new Date();
      const params = {
        accessTokenExpireDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7),
        updatedAt: today,
      }
      if (!user.accessToken) {
        user.update({...params, accessToken: randomstring.generate(256)});
      }
      user.update(params);

      resolve({success: true, user: user});
    } else {
      resolve({success: false, message: 'Email or Password is not correct'});
    }
  })
}

/*const getAllUser = (req, res) => {
  model.user.findAll().then(users => {
    res.send(JSON.stringify(users));
  }).catch(err => {
    logger.error(err);
    res.status(500);
    res.send(JSON.stringify({message: err}));
  });
}*/

module.exports = {
  login,
}