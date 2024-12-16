const { createCategoryType, findAllCategoryTypes } = require("../services/Categoria")

exports.view = async(req, res) =>{
    try {
        const tipoCategoria = await findAllCategoryTypes()
        res.render('tipoCategoria', {tipoCategoria})        
    } catch (error) {
        
    }
}
exports.create = async(req, res) =>{
    try {
        const data = req.body
        await createCategoryType(data)
        res.redirect('/cadastroproduto')
        
    } catch (error) {
        console.log("error:::", error)
    }
}

exports.tipoCategoria = async(req, res)=>{
    try {
        res.render('tipoCategoria', {layout:''})
    } catch (error) {
        console.log(error)
    }
}

exports.produtos = async(req,res)=>{

    try{
        res.render('produtos')
    }
    catch(error){
console.log(error)
    }
}
