const userService = require('../service/authService')

const login = async (req, res) => {
  const userData = req.body;

  if (!Object.keys(userData).includes('email') || !Object.keys(userData).includes('password')) {
    res.status(400);
    res.send(JSON.stringify({message: 'Email and Password are required'}));
    return;
  }

  const {success, user, message} = await userService.login(userData);

  if (success) {
    res.send(JSON.stringify(user));
  } else {
    res.status(400);
    res.send(JSON.stringify({message}));
  }
}

module.exports = {
  login,
}