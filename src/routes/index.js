const express = require('express')
const indexRoutes = express.Router()
const UserController = require('../controllers/UserController')
//const CadastroController = require('../controllers/ClienteController')
//const LoginController = require('../controllers/UserController')
const CarrinhoController = require('../controllers/CarrinhoController'); // Ajuste o caminho conforme a estrutura de pastas
const HomeController = require ('../controllers/HomeController')
const ProdutoController = require ('../controllers/ProdutoController')
const TipoUsuarioController = require ('../controllers/TipoUsuarioController')
const CategoriaController = require ('../controllers/CategoriaController')
//const multer = require ('multer');
// const upload = require ('../public/uploads');


indexRoutes.get('/', UserController.home)



indexRoutes.get('/carrinho', CarrinhoController.carrinho)

indexRoutes.get('/cadastro', UserController.view)
indexRoutes.post('/create_user', UserController.create)

indexRoutes.get('/perfil',UserController.perfil)


indexRoutes.get('/cadastroproduto', ProdutoController.view)
indexRoutes.post('/create_Product', ProdutoController.create)

//indexRoutes.get('/cadastroproduto',ProdutoController.cadastroproduto)
indexRoutes.get('/telephone',ProdutoController.telephone)
indexRoutes.get('/computer',ProdutoController.computer)
indexRoutes.get('/game',ProdutoController.game)
indexRoutes.get('/produtos_categoria/:id_categoria',ProdutoController.prodByCategoria)

indexRoutes.get('/tipoUsuario', TipoUsuarioController.view)
indexRoutes.post('/tipo_usuario', TipoUsuarioController.create)

indexRoutes.get('/tipoCategoria',CategoriaController.tipoCategoria)
indexRoutes.get('/tipoCategoria', CategoriaController.view)
indexRoutes.post('/tipo_categoria', CategoriaController.create)

// indexRoutes.get('/categoria',ProdutoController.seeAllProducts)
indexRoutes.get('/categoria/:id_categoria',ProdutoController.getProdByCategory)





indexRoutes.get('/login', UserController.login)

indexRoutes.get('/welcome', HomeController.welcome)




module.exports = indexRoutes;

/*// Importando o CarrinhoController
const CarrinhoController = require('../controllers/CarrinhoController'); // Caminho correto para o controlador

// Definindo as rotas
router.get('/carrinho', CarrinhoController.carrinho);*/
