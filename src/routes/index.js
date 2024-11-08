const express = require('express')
const indexRoutes = express.Router()
const UserController = require('../controllers/UserController')

indexRoutes.get('/', UserController.home)

module.exports = indexRoutes;