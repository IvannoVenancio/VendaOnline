const express = require ('express');
const bodyParser = require ('body-parser')
const {engine} = require ('express-handlebars')

const indexRoutes = require('./src/routes/index')
const app = express();


//Config
    //Template Engine
    app.engine('handlebars',engine({
    defaultLayout:'main',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault:true
    }
}))
    app.set('view engine', 'handlebars')

    app.use(bodyParser.urlencoded({ extended: true}))

    app.use(indexRoutes)

//app.get("/", function(req, res){
//    res.render('home', { title: 'Bem-vindo ao nosso site!' });
//});




//O Nosso Servidor
const PORT = 8081
app.listen(8081, function() {
    console.log("servidor rodando na url http://localhost:8081");
});