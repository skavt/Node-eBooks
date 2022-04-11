const {check, validationResult} = require("express-validator");
const {toRemoveUnderScore, toUpperCaseFirst} = require("../helpers/stringFilters");
const model = require("../models");

const checkRequiredFields = async (fields, req) => {
  for (const field of fields) {
    await check(field).exists({checkFalsy: true}).withMessage(`${toRemoveUnderScore(toUpperCaseFirst(field))} is required field`).run(req);
  }
}

const checkEmail = async (req) => {
  await check('email').isEmail().withMessage('This must be a valid email').run(req);
}

const checkUserByEmail = async (req) => {
  await check('email').custom(async (value) => {
    return await model.user.findOne({where: {email: value}}).then(user => {
      if (user) {
        return Promise.reject(`Email '${value}' is already in use`);
      }
    });
  }).run(req);
}

const checkPassword = async (req) => {
  const minLength = 6;
  await check('password').isLength({min: minLength}).withMessage(`The field must be ${minLength} or more`).run(req);
}

const matchPasswords = async (req) => {
  await check('repeat_password').custom((value, {req}) => {
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }).run(req);
}

const setErrors = (req) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    let messages = [];

    result.errors.forEach(error => {
      messages.push({field: error.param, message: error.msg});
    })

    return {success: false, messages};
  }

  return {success: true};
}

module.exports = {
  checkRequiredFields,
  checkEmail,
  checkUserByEmail,
  checkPassword,
  matchPasswords,
  setErrors,
}