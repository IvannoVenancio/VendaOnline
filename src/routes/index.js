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
const { upload } = require('../middleware/multer')


indexRoutes.get('/', UserController.home)



indexRoutes.get('/carrinho', CarrinhoController.carrinho)

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

// Deletar utilizador
indexRoutes.post('/users/:id/delete', UserController.deleteUser); // Deletar utilizador

indexRoutes.get('/listaUsers',UserController.listaUsers)


indexRoutes.get('/perfil',UserController.perfil)
indexRoutes.get('/resumocompras',UserController.resumocompras)



indexRoutes.get('/cadastroproduto', ProdutoController.view)
indexRoutes.post('/create_Product',  upload.single('imagem'),ProdutoController.create)


// Rota para exibir o formulário de edição de produto
indexRoutes.post('/produtos/:id/update', ProdutoController.updateProduct);
// Rota para editar o produto
//indexRoutes.put('/produtos2/:id', ProdutoController.updateProduct);
indexRoutes.get('/produtos/:id/editar', ProdutoController.showEditForm);
indexRoutes.post('/produtos/:id/atualizar', upload.single('imagem'), ProdutoController.updateProduct);

// Rota para excluir o produto
indexRoutes.post('/produtos/:id/deletar', ProdutoController.deleteProduct);

indexRoutes.get('/detalhesEditar/:detalhes', ProdutoController.VerDetalhesEdit)
indexRoutes.get('/detalhesEditar', ProdutoController.detalhesEditar)


//indexRoutes.get('/cadastroproduto',ProdutoController.cadastroproduto)
indexRoutes.get('/produtos',ProdutoController.produtos)
//indexRoutes.get('/produtos2',ProdutoController.getProdByCategory)
//indexRoutes.get('/produtos2/:id_categoria',ProdutoController.getProdByCategory)



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
indexRoutes.post('/validateLogin', UserController.validateLogin);


indexRoutes.get('/welcome', HomeController.welcome)


// Rotas de produtos
//indexRoutes.get('/produtos2', ProdutoController.getAllProducts);
//indexRoutes.get('/produtos2/:id', ProdutoController.getProductById);
//indexRoutes.post('/produtos', upload.single('imagem'), ProdutoController.createProduct);
//indexRoutes.put('/produtos2/:id', upload.single('imagem'), ProdutoController.updateProduct);
//indexRoutes.delete('/produtos2/:id', ProdutoController.deleteProduct);



module.exports = indexRoutes;

