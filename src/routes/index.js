const express = require('express')
const indexRoutes = express.Router()
const UserController = require('../controllers/UserController')
const LoginController = require('../controllers/LoginController')

indexRoutes.get('/', UserController.home)

indexRoutes.get('/carrinho', UserController.carrinho)

indexRoutes.get('/login', LoginController.login)

indexRoutes.get('/signup', UserController.signup)

module.exports = indexRoutes;
