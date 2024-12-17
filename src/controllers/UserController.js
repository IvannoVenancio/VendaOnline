exports.home = async(req, res)=>{
    try {
        
        res.render('home',{layout:''})
    } catch (error) {
        console.log(error)
    }
}

exports.cadastro = async(req, res)=>{
    try {
        res.render('cadastro')
    } catch (error) {
        console.log(error)
    }
}

const { createUser, findAllUsers,getUserById, deleteUser } = require("../services/User")


exports.view = async(req, res) =>{
    try {
        
        res.render('cadastro', {layout:'cadastroLogin'})     
    } catch (error) {
        console.log("error:::", error)
    }
}
exports.create = async(req, res) =>{
    try {
        const data = req.body
        await createUser(data)
        res.redirect('/login')
        
    } catch (error) {
        console.log("error:::", error)
    }
}




exports.login = async(req, res)=>{
    try {
        res.render('login')
    } catch (error) {
        console.log(error)
    }
}


exports.perfil = async(req, res)=>{
    try {
        res.render('perfil')
    } catch (error) {
        console.log(error)
    }
}

exports.resumocompras = async(req, res)=>{
    try {
        res.render('resumocompras')
    } catch (error) {
        console.log(error)
    }
}

