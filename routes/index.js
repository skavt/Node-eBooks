const routes = require('express').Router();
const {login} = require("../controllers/authController");

routes.post('/login', login);

module.exports = routes;