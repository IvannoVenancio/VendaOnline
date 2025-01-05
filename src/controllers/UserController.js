const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


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

exports.listaUsers = async(req, res)=>{
    try {
        res.render('listaUsers')
    } catch (error) {
        console.log(error)
    }
}

exports.atualizarUser = async(req, res)=>{
    try {
        res.render('atualizarUser')
    } catch (error) {
        console.log(error)
    }
}

exports.viewAllUsers = async (req, res) => {
    try {
      const users = await prisma.user.findMany();
      res.render("listaUsers", { users }); // Renderiza a lista de utilizadores
    } catch (error) {
      console.error("Erro ao buscar todos os utilizadores:", error);
      res.status(500).send("Erro ao carregar a lista de utilizadores");
    }
  }
  

// Visualiza um único usuário
exports.viewUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await getUserById(id);
      if (!user) return res.status(404).send("Usuário não encontrado.");
      res.render('listaUserbyId', { user });
    } catch (error) {
      console.error("Erro ao buscar usuário por ID:", error);
      res.status(500).send("Erro ao buscar usuário.");
    }
  };

  exports.editUserForm = async (req, res) => {
    try {
        const userId = req.params.id;

        // Buscar o usuário pelo ID
        const user = await prisma.user.findUnique({
            where: { id: parseInt(userId) },
        });

        if (!user) {
            return res.status(404).send("Usuário não encontrado.");
        }

        // Renderizar a página com os dados do usuário
        res.render("atualizarUser", { user });
    } catch (error) {
        console.error("Erro ao buscar o usuário:", error);
        res.status(500).send("Erro ao carregar o formulário de edição.");
    }
}


  exports.updateUser = async (req, res) => {
    try {
  
      const { id } = req.params;
      const { name, email, senha } = req.body; // Dados recebidos do formulário

      await updateUser(id, {
          name,
          senha,
          email 
      });
      res.redirect('/listaUsers');
    } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      res.status(500).send("Erro ao atualizar produto.");
    }
  };
  
  
  
  
    



exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.user.delete({
      where: { id: parseInt(id) },
    });

    res.redirect("/listaUsers");
  } catch (error) {
    console.error("Erro ao deletar o utilizador:", error);
    res.status(500).send("Erro ao deletar o utilizador.");
  }
};




const { createUser, findAllUsers,getUserById, deleteUser, validateLogin, viewAllUsers, updateUser } = require("../services/User")
