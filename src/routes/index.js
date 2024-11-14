const express = require('express')
const indexRoutes = express.Router()
const UserController = require('../controllers/UserController')

indexRoutes.get('/', UserController.home)

indexRoutes.get('/carrinho', UserController.carrinho)

indexRoutes.get('/login', UserController.login)

indexRoutes.get('/signup', UserController.signup)

module.exports = indexRoutes;
