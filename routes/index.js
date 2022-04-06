const routes = require('express').Router();
const {login} = require("../controllers/userController");

routes.post('/login', login);

module.exports = routes;