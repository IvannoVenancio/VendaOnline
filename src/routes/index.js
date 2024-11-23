const express = require('express')
const indexRoutes = express.Router()
const UserController = require('../controllers/UserController')
const CadastroController = require('../controllers/ClienteController')
const LoginController = require('../controllers/LoginController')
const CarrinhoController = require('../controllers/CarrinhoController'); // Ajuste o caminho conforme a estrutura de pastas


indexRoutes.get('/', UserController.home)

indexRoutes.get('/carrinho', CarrinhoController.carrinho)

indexRoutes.get('/cadastro', CadastroController.cadastro)

indexRoutes.get('/login', UserController.login)

module.exports = indexRoutes;

/*// Importando o CarrinhoController
const CarrinhoController = require('../controllers/CarrinhoController'); // Caminho correto para o controlador

// Definindo as rotas
router.get('/carrinho', CarrinhoController.carrinho);*/
