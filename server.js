const express = require ('express');
const bodyParser = require ('body-parser')
const {engine} = require ('express-handlebars')
process.env.JWT_SECRET = 'VendaOnline';
const jwt = require('jsonwebtoken');

<<<<<<< HEAD

const jwt = require('jsonwebtoken');
const session = require('express-session')
const adminRoutes = require("./src/routes/admin"); 
=======
>>>>>>> f5a12c7229336d6eb36c3fc41bb25ac6d67b49b7

const indexRoutes = require('./src/routes/index');
const path = require('path');
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
    app.use(bodyParser.json());

    app.use(express.static(path.join(__dirname,"public")))

    



     //Config do expression-session

app.use(session({
  secret: process.env.SESSION_SECRET || 'VendaOnline',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 } // 1 hora
}));



// Middleware para processar formulários
 app.use(express.urlencoded({ extended: true }));
 app.use(express.json());

 app.use(indexRoutes)

app.use(adminRoutes);


//O Nosso Servidor
const PORT = 8081
app.listen(8081, function() {
    console.log("servidor rodando na url http://localhost:8081");
});