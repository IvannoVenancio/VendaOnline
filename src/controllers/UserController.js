exports.home = async(req, res)=>{
    try {
        res.render('home')
    } catch (error) {
        console.log(error)
    }
}

exports.login = async(req, res)=>{
    try {
        res.render('login')
    } catch (error) {
        console.log(error)
    }
}

exports.carrinho = async(req, res)=>{
    try {
        res.render('carrinho')
    } catch (error) {
        console.log(error)
    }
}

exports.signup = async(req, res)=>{
    try {
        res.render('signup')
    } catch (error) {
        console.log(error)
    }
}