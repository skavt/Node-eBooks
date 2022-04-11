const userService = require('../service/authService')
const {capitalizeFirstLetter} = require('../helpers/stringFilters');

const login = async (req, res) => {
  const userData = req.body;
  const {validated, messages} = checkRequiredFields(userData, ['email', 'password']);

  if (!validated) {
    res.status(400);
    res.send(JSON.stringify(messages));
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

const register = async (req, res) => {
  const userData = req.body;
  const {validated, messages} = checkRequiredFields(userData,
    ['email', 'password', 'repeat_password', 'first_name', 'last_name']);

  if (!validated) {
    res.status(400);
    res.send(JSON.stringify(messages));
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

const checkRequiredFields = (data, fields) => {
  let errorMessages = [];
  fields.forEach(field => {
    if (!Object.keys(data).includes(field)) {
      errorMessages.push({field: field, message: `${capitalizeFirstLetter(field)} is required field`});
    }
  })

  return {validated: errorMessages.length === 0, messages: errorMessages};
}

module.exports = {
  login,
  register,
}