const express = require ("express");

const app = express();

const handlebars = require ('express-handlebars')

//Config
    //Template Engine
    app.engine('handlebars',handlebars({defaultLayout:'main'}))
    app.set('view engine', 'handlebars')

    // Definir a pasta onde os templates estarão localizados (opcional, padrão é `views`)
//app.set('views', './views');

//Rota1

app.get("/", function(req, res){
    res.render('home', { title: 'Bem-vindo ao nosso site!' });
});



const PORT = 8081
app.listen(8081, function() {
    console.log("servidor rodando na url http://localhost:8081");
});