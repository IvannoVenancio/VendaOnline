exports.login = async(req, res)=>{
    try {
        res.render('login')
    } catch (error) {
        console.log(error)
    }
}
