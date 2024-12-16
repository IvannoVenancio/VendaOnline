const { findAllCategoryTypes } = require("../services/Categoria")
const { createProduct, updateProduct, getAllProducts, getProductById, deleteProduct, getProductsByCategory, getProdByCategory } = require("../services/Produto")

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
        const produtos = await getProductByIdCategoria(idCategoria)
        console.log("produtos>>>>", produtos)
        res.render('prodByCategoria', {layout:'main2', produtos})
        
    } catch (error) {
        console.log("error:::", error)
    }
}

exports.getProdByCategory = async(req, res) =>{
    try {
        const idCategoria = Number(req.params.id_categoria)
        const produtos = await getProductsByCategory(idCategoria)
       
        res.render('categoria', {layout:'main', produtos})
        
    } catch (error) {
        console.log("error:::", error)
    }
}





//const { createProduct, getAllProducts} = require("../services/Produto")



exports.telephone = async(req, res)=>{
    try {
        res.render('telephone', {layout:''})
    } catch (error) {
        console.log(error)
    }
}

exports.game = async(req, res)=>{
    try {
        res.render('game', {layout:''})
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

