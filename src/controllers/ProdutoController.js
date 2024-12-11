const { createProduct, updateProduct, getAllProducts, getProductById, deleteProduct } = require("../services/Produto")

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


//const { createProduct, getAllProducts} = require("../services/Produto")



exports.telefone = async(req, res)=>{
    try {
        res.render('telefone', {layout:''})
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

