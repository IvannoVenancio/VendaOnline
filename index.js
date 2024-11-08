const express = require ('express');

const app = express();

const handlebars = require ('express-handlebars')

//Config
    //Template Engine
    app.engine('handlebars',handlebars({defaultLayout:'main'}))
    app.set('view engine', 'handlebars')

    //app.engine('handlebars', exphbs());
    //app.set('view engine', 'handlebars');
    //app.set('views', './views');

    // Definir a pasta onde os templates estarão localizados (opcional, padrão é `views`)
//app.set('views', './views');

//Rota1

app.get("/", function(req, res){
    res.render('home', { title: 'Bem-vindo ao nosso site!' });
});

//Rota2
app.get("/aboutus", function(req, res){
    res.render('aboutus', { title: 'Bem-vindo a página que fala sobre nós!' });
});

//Rota para teste
app.get('/test', (req, res) => {
    res.render('test', { title: 'Página de Teste', message: 'O Handlebars está a funcionar!' });
});



//O Nosso Servidor
const PORT = 8081
app.listen(8081, function() {
    console.log("servidor rodando na url http://localhost:8081");
});