exports.welcome = async(req, res)=>{
    try {
        res.render('welcome')
    } catch (error) {
        console.log(error)
    }
}
