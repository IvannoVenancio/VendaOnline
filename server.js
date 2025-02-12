const express = require ('express');
const bodyParser = require ('body-parser')
const {engine} = require ('express-handlebars')

const jwt = require('jsonwebtoken');
const session = require('express-session')
//const sessionConfig = require('./authMiddleware/session');
// const passport = require('passport');
// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
require("dotenv").config();

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





// // Middleware para acessar a sessão na resposta
// app.use((req, res, next) => {
// console.log('Sessão atual:', req.session);
// next();
// });



// Middleware para processar formulários
 app.use(express.urlencoded({ extended: true }));
 app.use(express.json());

 app.use(indexRoutes)


//O Nosso Servidor
const PORT = 8081
app.listen(8081, function() {
    console.log("servidor rodando na url http://localhost:8081");
});