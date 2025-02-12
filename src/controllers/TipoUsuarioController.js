const { createUserType, findAllUserTypes } = require("../services/TipoUsuario")

exports.view = async(req, res) =>{
    try {
        const tipoUsuario = await findAllUserTypes()
        console.log ('apareceee::: ', tipoUsuario)
        res.render('tipoUsuario', {tipoUsuario})        
    } catch (error) {
        
    }
}
exports.create = async(req, res) =>{
    try {
        const data = req.body
        const type = req.body

        await createUserType(data, type)
        res.redirect('/tipoUsuario')
        
    } catch (error) {
        console.log("error:::", error)
    }
}