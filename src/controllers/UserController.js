exports.home = async(req, res)=>{
    try {
        res.render('home')
    } catch (error) {
        console.log(error)
    }
}