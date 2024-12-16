const { createUserType, findAllUserTypes } = require("../services/TipoUsuario")

exports.view = async(req, res) =>{
    try {
        const tipoUsuario = await findAllUserTypes()
        res.render('tipoUsuario', {tipoUsuario})        
    } catch (error) {
        
    }
}
exports.create = async(req, res) =>{
    try {
        const data = req.body
        await createUserType(data)
        res.redirect('/tipoUsuario')
        
    } catch (error) {
        console.log("error:::", error)
    }
}