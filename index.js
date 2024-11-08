const express = require ('express');

const bodyParser = require ('body-parser')
const {engine} = require ('express-handlebars')

const indexRoutes = require('./routes/index')
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