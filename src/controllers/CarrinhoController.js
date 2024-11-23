exports.carrinho = async(req, res)=>{
    try {
        res.render('carrinho')
    } catch (error) {
        console.log(error)
    }
}
