const express = require ('express');
const bodyParser = require ('body-parser')
const {engine} = require ('express-handlebars')

const indexRoutes = require('./src/routes/index');
const path = require('path');
const app = express();
// const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })

// app.post('/profile', upload.single('avatar'), function (req, res, next) {
//     // req.file é um arquivo `avatar`
//     // req.body conterá os campos de texto, se houver
//   })
  
//   app.post('/photos/upload', upload.array('photos', 12), function (req, res, next) {
//     // req.files é um array de arquivos `photos`
//     // req.body conterá os campos de texto, se houver
//   })
  
//   const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
//   app.post('/cool-profile', cpUpload, function (req, res, next) {
//     // req.files é um objeto (String -> Array) onde fieldname é a chave e o valor é array de arquivos
//     //
//     // e.g.
//     //  req.files['avatar'][0] -> File
//     //  req.files['gallery'] -> Array
//     //
//     // req.body conterá os campos de texto, se houver
//   })

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

    


    app.use(indexRoutes)


 


//O Nosso Servidor
const PORT = 8081
app.listen(8081, function() {
    console.log("servidor rodando na url http://localhost:8081");
});