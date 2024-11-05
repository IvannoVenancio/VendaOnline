const express = require ("express");

const app = express();

const handlebars = require ('express-handlebars')

//Config
    //Template Engine
    app.engine('handlebars',handlebars({defaultLayout:'main'}))
    app.set('view engine', 'handlebars')


//Rota1

app.get("/", function(req, res){
    res.render("home")

});



app.listen(8081, function(){
    console.log("servidor rodando na url http://localhost:8081");
});