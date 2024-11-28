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




exports.login = async(req, res)=>{
    try {
        res.render('login')
    } catch (error) {
        console.log(error)
    }
}

