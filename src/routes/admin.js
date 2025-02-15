const express = require('express')
const adminRoutes = express.Router()
const UserController = require('../controllers/UserController')
//const CadastroController = require('../controllers/ClienteController')
const CarrinhoController = require('../controllers/CarrinhoController'); // Ajuste o caminho conforme a estrutura de pastas
const HomeController = require ('../controllers/HomeController')
const AuthController = require ('../controllers/AuthController')
const AdminController = require ('../controllers/AdminController')

const ProdutoController = require ('../controllers/ProdutoController')
const TipoUsuarioController = require ('../controllers/TipoUsuarioController')
const CategoriaController = require ('../controllers/CategoriaController')
const jwt = require('jsonwebtoken');
const { atualizarQuantidadeProduto } = require('../controllers/CarrinhoController');
const { isAdmin } = require("../middleware/authMiddleware");


const { upload } = require('../middleware/multer')
const {Authenticate} = require('../middleware/authMiddleware')


// Apenas administradores podem acessar estas rotas
adminRoutes.get("/carrinhoAdm", isAdmin, AdminController.getAllCarts);
adminRoutes.get("/resumosCompras", isAdmin, AdminController.getAllSummaries);
adminRoutes.get("/perfisTodos", isAdmin, upload.single('imagem'), AdminController.getAllProfiles);

module.exports = adminRoutes;