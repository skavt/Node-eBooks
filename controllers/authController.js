const userService = require('../service/authService')
const {
  checkRequiredFields,
  setErrors,
  checkEmail,
  checkPassword,
  matchPasswords, checkUserByEmail
} = require("../helpers/fieldValidation");

const login = async (req, res) => {
  await checkRequiredFields(['email', 'password'], req);
  await checkEmail(req);

  const response = await setErrors(req);
  if (!response.success) {
    return res.status(400).json(response.messages);
  }

  const {success, data, message} = await userService.login(req.body);
  if (success) {
    return res.json({data});
  }
  return res.status(400).json({message})
}

const register = async (req, res) => {
  await checkRequiredFields(['email', 'password', 'repeat_password', 'first_name', 'last_name'], req);
  await checkEmail(req);
  await checkUserByEmail(req);
  await checkPassword(req);
  await matchPasswords(req);

  const response = await setErrors(req);
  if (!response.success) {
    return res.status(400).json(response.messages);
  }

  const {success, data, message} = await userService.register(req.body);
  if (success) {
    return res.json({data, message});
  }
  return res.status(400).json({message})
}

const getCurrentUser = async (req, res) => {
  const {success, data} = await userService.getCurrentUser(req.token);

  if (success) {
    return res.json({data});
  }
  return res.status(400)
}

module.exports = {
  login,
  register,
  getCurrentUser,
}