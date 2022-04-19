const routes = require('express').Router();
const {login, register, getCurrentUser} = require("../controllers/authController");

routes.post('/login', login);
routes.post('/register', register);
routes.get('/get-current-user', getCurrentUser);

module.exports = routes;