const express = require('express')
const indexRoutes = express.Router()
const UserController = require('../controllers/UserController')
//const CadastroController = require('../controllers/ClienteController')
const CarrinhoController = require('../controllers/CarrinhoController'); // Ajuste o caminho conforme a estrutura de pastas
const HomeController = require ('../controllers/HomeController')
const AuthController = require ('../controllers/AuthController')

const ProdutoController = require ('../controllers/ProdutoController')
const TipoUsuarioController = require ('../controllers/TipoUsuarioController')
const CategoriaController = require ('../controllers/CategoriaController')
const jwt = require('jsonwebtoken');
const { atualizarQuantidadeProduto } = require('../controllers/CarrinhoController');


const { upload } = require('../middleware/multer');
const {Authenticate} = require('../middleware/authMiddleware')


indexRoutes.get('/', UserController.home)
// Rotas de Autenticação
indexRoutes.get('/login', AuthController.login);
indexRoutes.post('/login', AuthController.login);
indexRoutes.get('/logout', AuthController.logout);
indexRoutes.post('/login', AuthController.logout);
indexRoutes.get('/login', AuthController.mostrarLogin);
indexRoutes.get('/paginainicial', Authenticate, UserController.paginainicial);
indexRoutes.get('/paginaInicialAdm', Authenticate, UserController.paginainicialadm);

// Rotas de Usuário
indexRoutes.get('/cadastro', UserController.cadastro);
indexRoutes.post('/create_user', UserController.create);

indexRoutes.get('/listaUsers',Authenticate, UserController.viewAllUsers);

indexRoutes.get('/users/:id/edit',Authenticate, UserController.editUserForm);
indexRoutes.post('/users/:id/update',Authenticate, UserController.updateUser);
indexRoutes.post('/users/:id/delete',Authenticate, UserController.deleteUser);
indexRoutes.get('/listaUsers',Authenticate, UserController.listaUsers);
indexRoutes.get('/perfil', Authenticate, upload.single('imagem'), UserController.perfil);
indexRoutes.post('/perfil/:id/update', UserController.updateUserProfile);

// Rotas de Produtos
indexRoutes.get('/cadastroproduto', ProdutoController.view);
indexRoutes.post('/create_Product', upload.single('imagem'), ProdutoController.create);
indexRoutes.get('/produtos', ProdutoController.getMenu);
indexRoutes.get('/produtos/:id/editar', ProdutoController.showEditForm);
indexRoutes.post('/produtos/:id/atualizar', upload.single('imagem'), ProdutoController.updateProduct);
indexRoutes.get('/produtoAndCard/:tipoCategoriaId', ProdutoController.getProdByIdCategory);
indexRoutes.get('/produtoAndCard', ProdutoController.produtoAndCard);
indexRoutes.post('/produtos/:id/deletar', ProdutoController.deleteProduct);
indexRoutes.get('/detalhesEditar/:detalhes', ProdutoController.VerDetalhesEdit);
indexRoutes.get('/detalhesEditar', ProdutoController.detalhesEditar);
indexRoutes.get('/produtos_categoria/:id_categoria', ProdutoController.prodByCategoria);
indexRoutes.get('/produtosCategoria/:id_categoria', ProdutoController.getProdByCategory);
indexRoutes.get('/detalhes_produto/:detalhes', ProdutoController.VerDetalhes);
indexRoutes.get('/detalhes_produto/:id', ProdutoController.VerDetalhes);
indexRoutes.get('/atualizarProduto', ProdutoController.atualizarProduto);
indexRoutes.post('/atualizarProduto', ProdutoController.atualizarProduto);
indexRoutes.get('/detalhes', ProdutoController.detalhes);
indexRoutes.get('/categoria', ProdutoController.categoria);

// Rotas de Carrinho
indexRoutes.get('/carrinho', Authenticate, CarrinhoController.carrinho);
indexRoutes.get('/pagamento', Authenticate, CarrinhoController.pagamento);
indexRoutes.post('/pagamento', Authenticate, CarrinhoController.pagamento);
indexRoutes.get('/pagamentoEfetuado', Authenticate, CarrinhoController.pagamentoEfetuado);


indexRoutes.post('/adicionar', Authenticate, CarrinhoController.adicionarProdutoAoCarrinho);
indexRoutes.post('/atualizar', Authenticate, CarrinhoController.atualizarProdutoNoCarrinho);
indexRoutes.post('/carrinho/Atualizar', atualizarQuantidadeProduto);
indexRoutes.post('/remover/:id', Authenticate, CarrinhoController.removerProdutoDoCarrinho);
indexRoutes.delete('/eliminar', Authenticate, CarrinhoController.eliminarCarrinho);
indexRoutes.post('/carrinho/remover/:id', Authenticate, CarrinhoController.finalizarCompra);

indexRoutes.post('/carrinho/finalizar', Authenticate, CarrinhoController.finalizarCompra);
indexRoutes.get('/carrinho/:id_usuario', Authenticate, CarrinhoController.obterCarrinhoPorUsuario);
indexRoutes.get('/resumocompras', CarrinhoController.resumoCompras);

// Rotas de Tipo de Usuário e Categoria
indexRoutes.get('/tipoUsuario',Authenticate, TipoUsuarioController.view);
indexRoutes.post('/tipo_usuario',Authenticate, TipoUsuarioController.create);
indexRoutes.get('/tipoCategoria',Authenticate, CategoriaController.tipoCategoria);
indexRoutes.get('/tipoCategoria',Authenticate, CategoriaController.view);
indexRoutes.post('/tipo_categoria',Authenticate, CategoriaController.create);

// Rota de Página Inicial
indexRoutes.get('/welcome', HomeController.welcome);

module.exports = indexRoutes;
