const express = require('express')
const indexRoutes = express.Router()
const UserController = require('../controllers/UserController')
//const CadastroController = require('../controllers/ClienteController')
//const LoginController = require('../controllers/UserController')
const CarrinhoController = require('../controllers/CarrinhoController'); // Ajuste o caminho conforme a estrutura de pastas
const HomeController = require ('../controllers/HomeController')


indexRoutes.get('/', UserController.home)



indexRoutes.get('/carrinho', CarrinhoController.carrinho)

indexRoutes.get('/cadastro', UserController.cadastro)

indexRoutes.get('/login', UserController.login)

indexRoutes.get('/welcome', HomeController.welcome)

module.exports = indexRoutes;

/*// Importando o CarrinhoController
const CarrinhoController = require('../controllers/CarrinhoController'); // Caminho correto para o controlador

// Definindo as rotas
router.get('/carrinho', CarrinhoController.carrinho);*/
