const userService = require('../service/authService')
const {
  checkRequiredFields,
  setErrors,
  checkEmail,
  checkPassword,
  matchPasswords
} = require("../helpers/fieldValidation");

const login = async (req, res) => {
  await checkRequiredFields(['email', 'password'], req);
  await checkEmail(req);

  const response = await setErrors(req);
  if (!response.success) {
    return res.status(400).json(response.messages);
  }

  const {success, user, message} = await userService.login(req.body);

  if (success) {
    res.send(JSON.stringify(user));
  } else {
    res.status(400);
    res.send(JSON.stringify({message}));
  }
}

const register = async (req, res) => {
  await checkRequiredFields(['email', 'password', 'repeat_password', 'first_name', 'last_name'], req);
  await checkEmail(req);
  await checkPassword(req);
  await matchPasswords(req);

  const response = await setErrors(req);
  if (!response.success) {
    return res.status(400).json(response.messages);
  }

  const {success, user, message} = await userService.login(req.body);

  if (success) {
    res.send(JSON.stringify(user));
  } else {
    res.status(400);
    res.send(JSON.stringify({message}));
  }
}

module.exports = {
  login,
  register,
}