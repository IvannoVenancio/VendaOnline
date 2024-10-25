const express = require ("express");

const app = express();

//Rota1

app.get("/", function(req, res){
    res.send("")

});



app.listen(8081, function(){
    console.log("servidor rodando na url http://localhost:8081");
});