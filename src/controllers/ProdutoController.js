const { findAllCategoryTypes } = require("../services/Categoria")
const { createProduct, updateProduct, getAllProducts, getProductById, deleteProduct, getProdByCategory, getProductsByIdCategoria, VerDetalhes } = require("../services/Produto")

exports.cadastroproduto = async(req, res)=>{
    try {
        res.render('cadastroproduto', {layout:'cadastroLogin'})
    } catch (error) {
        console.log(error)
    }
}


/*
exports.view = async(req, res) =>{
    try {
        const produto = await getAllProducts()
        res.render('cadastroproduto', {produto})        
    } catch (error) {
        console.log("error:::", error)
    }
}
exports.create = async(req, res) =>{
    try {
        const data = req.body
        await createProduct(data)
        res.redirect('/cadastroproduto')
        
    } catch (error) {
        console.log("error:::", error)
    }
}

const { createUser, findAllUsers,getUserById, deleteUser } = require("../services/User")*/


exports.view = async(req, res) =>{
    try {
        const produto = await getAllProducts()
        const tipoCategoria = await findAllCategoryTypes()
        res.render('cadastroproduto', {produto, tipoCategoria})        
    } catch (error) {
        console.log("error:::", error)
    }
}
exports.create = async(req, res) =>{
    try {
        const data = req.body
        await createProduct(data)
        res.redirect('/cadastroproduto')
        
    } catch (error) {
        console.log("error:::", error)
    }
}
exports.prodByCategoria = async(req, res) =>{
    try {
        const idCategoria = Number(req.params.id_categoria)
        console.log("idCategoria>>>", idCategoria)
        const produtos = await getProductsByIdCategoria(idCategoria)
        console.log("produtos>>>>", produtos)
        res.render('prodByCategoria', {layout:'main2', produtos})
        
    } catch (error) {
        console.log("error:::", error)
    }
}

exports.getProdByCategory = async(req, res) =>{
    try {
        const idCategoria = Number(req.params.id_categoria)
        const produtos = await getProdByCategory(idCategoria)
        console.log("Produtos::::", produtos )
       
        res.render('produtos', {layout:'main', produtos})
        
    } catch (error) {
        console.log("error:::", error)
    }
}

exports.VerDetalhes = async(req, res) =>{
    try {
        const Detalhes = Number(req.params.detalhes)
        const produtos = await VerDetalhes(Detalhes)
        console.log("Detalhes::::", produtos )
       
        res.render('detalhes', {layout:'main', produtos, Detalhes})
        
    } catch (error) {
        console.log("error:::", error)
    }
}


// Atualização de Produto
exports.updateProduct = async (req, res) => {
    try {
      const { id } = req.params; // ID recebido dos parâmetros
      const { nome, preco } = req.body; // Dados recebidos do frontend
      await updateProduct(id, { nome, preco }); // Atualiza no banco de dados
      const produtos = await getAllProducts(); // Busca todos os produtos atualizados
      res.render('produtos', { produtos }); // Renderiza a página com os produtos
    } catch (error) {
      console.error("Erro ao atualizar o produto:", error);
      res.status(500).send("Erro interno ao atualizar o produto.");
    }
  };
  
  // Exclusão de Produto
  exports.deleteProduct = async (req, res) => {
    try {
      const { id } = req.params; // ID recebido dos parâmetros
      await deleteProduct(id); // Exclui do banco de dados
      const produtos = await getAllProducts(); // Busca todos os produtos atualizados
      res.render('produtos', { produtos }); // Renderiza a página com os produtos
    } catch (error) {
      console.error("Erro ao excluir o produto:", error);
      res.status(500).send("Erro interno ao excluir o produto.");
    }
  };















exports.detalhes = async(req, res)=>{
    try {
        res.render('detalhes')
    } catch (error) {
        console.log(error)
    }
}






//const { createProduct, getAllProducts} = require("../services/Produto")



exports.categoria = async(req, res)=>{
    try {
        const tipoCategoria = await findAllCategoryTypes()

        res.render('categoria', {layout:'',tipoCategoria })
    } catch (error) {
        console.log(error)
    }
}

exports.produtos = async(req, res)=>{
    try {
        const produto = await getAllProducts()

        res.render('produtos', {layout:'', produto})
    } catch (error) {
        console.log(error)
    }
}

exports.computer = async(req, res)=>{
    try {
        res.render('computer', {layout:''})
    } catch (error) {
        console.log(error)
    }
}

