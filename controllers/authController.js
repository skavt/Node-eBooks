const logger = require('../logger');
const userService = require('../service/authService')

const login = async (req, res) => {
  if (Object.keys(req.body).length < 2) {
    res.send(JSON.stringify({message: 'Email and Password are required'}));
    return;
  }
  const userData = req.body;
  try {
    const {success, user, message} = await userService.login(userData);

    if (success) {
      res.send(JSON.stringify(user));
    } else {
      res.send(JSON.stringify({message}));
    }
  } catch (e) {
    logger.error(e);
    res.status(500);
    res.send(JSON.stringify({message: e}));
  }
}

module.exports = {
  login,
}