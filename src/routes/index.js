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
const { authenticateUser } = require('../middleware/authMiddleware');
const authenticate = require('../middleware/authMiddleware');



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
//indexRoutes.get('/carrinho', CarrinhoController.carrinho)
indexRoutes.get('/carrinho/:id_usuario', CarrinhoController.visualizarCarrinho);


// Rota para adicionar um produto ao carrinho
indexRoutes.post('/carrinho/adicionar', CarrinhoController.adicionarProdutoAoCarrinho);

// Rota para atualizar a quantidade de um produto no carrinho
indexRoutes.post('/atualizar/:id_produto', CarrinhoController.atualizarProdutoNoCarrinho);

// Rota para remover um produto do carrinho
indexRoutes.delete('/remover/:id_produto', CarrinhoController.removerProdutoDoCarrinho);

// Rota para finalizar a compra
indexRoutes.post('/finalizar', CarrinhoController.finalizarCompra);


indexRoutes.get('/cadastro', UserController.view)
indexRoutes.post('/create_user', UserController.create)

// Rotas de usuário
indexRoutes.post('/cadastro', UserController.create);
indexRoutes.get('/login', UserController.login);
indexRoutes.post('/login', UserController.login);

// Rotas de usuários
indexRoutes.get('/listaUsers', UserController.viewAllUsers); // Visualizar todos os usuários
//indexRoutes.get('/listaUsers/:id', UserController.viewUserById); // Visualizar usuário por ID
// Atualizar utilizador
indexRoutes.get('/users/:id/edit', UserController.editUserForm); // Formulário de edição
indexRoutes.post('/users/:id/update', UserController.updateUser); // Atualizar utilizador
//indexRoutes.post('/perfil/:id/update', UserController.updatePerfil); // Atualizar perfil


//const { updatePerfil } = require('../controllers/UserController'); // Certifique-se de importar a função

//indexRoutes.post('/perfil', updatePerfil);


// Deletar utilizador
indexRoutes.post('/users/:id/delete', UserController.deleteUser); // Deletar utilizador

indexRoutes.get('/listaUsers',UserController.listaUsers)

// const { getPerfil } = require('../controllers/UserController');

// indexRoutes.get('/perfil', getPerfil);

indexRoutes.get('/resumocompras',UserController.resumocompras)
// Adicionar produto ao carrinho
// indexRoutes.post('/add', CarrinhoController.addToCart);
// indexRoutes.get('/cart', CarrinhoController.getCart);
// Visualizar resumo de compras
indexRoutes.post('/resumodecompras', UserController.getSummary);
indexRoutes.get('/resumodecompras', UserController.getSummary);


indexRoutes.post('/logout', UserController.logout);



indexRoutes.get('/cadastroproduto', ProdutoController.view)
indexRoutes.post('/create_Product',  upload.single('imagem'),ProdutoController.create)


// Rota para exibir o formulário de edição de produto
indexRoutes.post('/produtos/:id/update', ProdutoController.updateProduct);
// Rota para editar o produto
//indexRoutes.put('/produtos2/:id', ProdutoController.updateProduct);
indexRoutes.get('/produtos/:id/editar', ProdutoController.showEditForm);
indexRoutes.post('/produtos/:id/atualizar', upload.single('imagem'), ProdutoController.updateProduct);
indexRoutes.get('/produtoAndCard/:tipoCategoriaId',ProdutoController.getProdByIdCategory)
indexRoutes.get('/produtoAndCard', ProdutoController.produtoAndCard)
indexRoutes.get('/produtos', ProdutoController.getMenu);


// Rota para excluir o produto
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
//indexRoutes.get('/computer',ProdutoController.computer)
//indexRoutes.get('/game',ProdutoController.game)
indexRoutes.get('/produtos_categoria/:id_categoria',ProdutoController.prodByCategoria)

indexRoutes.get('/produtosCategoria/:id_categoria',ProdutoController.getProdByCategory)
indexRoutes.get('/detalhes_produto/:detalhes',ProdutoController.VerDetalhes)
indexRoutes.get('/detalhes_produto/:id',ProdutoController.VerDetalhes)

// Rota de atualização
indexRoutes.put('/produto/:id', ProdutoController.updateProduct);

// Rota de exclusão
indexRoutes.delete('/produto/:id', ProdutoController.deleteProduct);

indexRoutes.post('/atualizarProduto', ProdutoController.atualizarProduto)

indexRoutes.get('/detalhes',ProdutoController.detalhes)



indexRoutes.get('/tipoUsuario', TipoUsuarioController.view)
indexRoutes.post('/tipo_usuario', TipoUsuarioController.create)

indexRoutes.get('/tipoCategoria',CategoriaController.tipoCategoria)
indexRoutes.get('/tipoCategoria', CategoriaController.view)
indexRoutes.post('/tipo_categoria', CategoriaController.create)


indexRoutes.get('/categoria',ProdutoController.categoria)
//indexRoutes.get('/categoria/:id_categoria',ProdutoController.getProdByCategory)






 indexRoutes.get('/login', UserController.login)
indexRoutes.post('/login', UserController.validateLogin)
indexRoutes.post('/validateLogin' ,UserController.validateLogin);


indexRoutes.get('/welcome', HomeController.welcome)


// Rotas de produtos
//indexRoutes.get('/produtos2', ProdutoController.getAllProducts);
//indexRoutes.get('/produtos2/:id', ProdutoController.getProductById);
//indexRoutes.post('/produtos', upload.single('imagem'), ProdutoController.createProduct);
//indexRoutes.put('/produtos2/:id', upload.single('imagem'), ProdutoController.updateProduct);
//indexRoutes.delete('/produtos2/:id', ProdutoController.deleteProduct);


// routes/carrinhoRoutes.js
indexRoutes.get('/carrinho', CarrinhoController.visualizarCarrinho);

// indexRoutes.post('/cart/add', CarrinhoController.addToCart);
// indexRoutes.get('/cart', CarrinhoController.listCartItems);

// Aplica o middleware de autenticação
// indexRoutes.get('/perfil', UserController. getPerfil);
//indexRoutes.post('/perfil', authenticate,UserController, updatePerfil);
indexRoutes.get('/perfil', UserController.perfil);





module.exports = indexRoutes;
