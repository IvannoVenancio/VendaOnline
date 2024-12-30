exports.home = async(req, res)=>{
    try {
        
        res.render('home',{layout:''})
    } catch (error) {
        console.log(error)
    }
}

exports.cadastro = async(req, res)=>{
    try {
        res.render('cadastro')
    } catch (error) {
        console.log(error)
    }
}



exports.view = async(req, res) =>{
    try {
        
        res.render('cadastro', {layout:'cadastroLogin'})     
    } catch (error) {
        console.log("error:::", error)
    }
}
exports.create = async(req, res) =>{
    try {
        const data = req.body
        await createUser(data)
        res.redirect('/login')
        
    } catch (error) {
        console.log("error:::", error)
    }
}




  exports.login = async(req, res)=>{
      try {
          res.render('login')
      } catch (error) {
          console.log(error)
      }
  }


// exports.validateLogin = async (req, res) => {
//     const { email, senha } = req.body // Os dados enviados pelo formulário
//     await validateLogin({
//       where: { email: email,   // Busca pelo email
//         senha: senha },
//     });
  
//     if (!User || User.senha !== senha) {
//       // Se a senha for incorreta, redireciona de volta com um erro
//       return res.render('login', { error: 'Usuário ou senha incorretos' });
//     }
  
//     // Se o login for bem-sucedido, redireciona para a página inicial
//     res.redirect('/home');
//   };


exports.validateLogin = async (req, res) => {
    try {
        const { email, senha } = req.body;

        const user = await validateLogin(email, senha);

        if (!user) {
            res.send("Login falhou: Usuário ou senha inválidos.");
        } else {
            res.send("Login realizado com sucesso!");
        }
    } catch (error) {
        console.error("Erro ao validar login:", error);
        res.send("Ocorreu um erro ao tentar realizar o login.");
    }
};

exports.perfil = async(req, res)=>{
    try {
        res.render('perfil')
    } catch (error) {
        console.log(error)
    }
}



exports.resumocompras = async(req, res)=>{
    try {
        res.render('resumocompras')
    } catch (error) {
        console.log(error)
    }
}

const { createUser, findAllUsers,getUserById, deleteUser, validateLogin } = require("../services/User")
