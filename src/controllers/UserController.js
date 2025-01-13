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






//   exports.login = async(req, res)=>{
//       try {
//           res.render('login')
//       } catch (error) {
//           console.log(error)
//       }
//   }


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
        const { email, senha } = req.body; // Dados do formulário

        // Chama a função validateLogin do serviço
        const result = await validateLogin(email, senha);

        if (!result.success) {
            // Caso falhe, envia a mensagem de erro para a página de login
            res.render('login', { message: result.message || 'Login falhou' });
        } else {
            // Caso seja bem-sucedido, redireciona para a página principal ou de usuário autenticado
            res.cookie('userId', result.data.id, { httpOnly: true, path: '/' });
            res.redirect('/'); // Redirecionamento após login bem-sucedido
        }
    } catch (error) {
        console.error("Erro ao validar login:", error);
        res.render('login', { message: 'Erro ao validar login' });
    }
};



exports.perfil = async (req, res) => {
    try {
        res.render('perfil');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao carregar o perfil');
    }
};


//    Função para obter perfil de um usuário
//    controllers/PerfilController.js
//   exports.getPerfil = async (req, res) => {
//       try {
//         if (!req.user) {
//           return res.status(401).send('Usuário não autenticado');
//         }
  
//         const user = await prisma.user.findUnique({
//           where: { id: req.user.id },
//         });
  
//         if (!user) {
//           return res.status(404).send('Usuário não encontrado');
//         }
  
//         res.json(user);
//       } catch (error) {
//         console.error('Erro ao obter perfil:', error);
//         res.status(500).send('Erro ao obter perfil');
//       }
//     };
  
  
  

// // // Função para atualizar o perfil do usuário
// // exports.updatePerfil = async (req, res) => {
// //     try {
// //       const userId = req.user.id; // Aqui você acessa o ID do usuário autenticado via token
// //       const { nome, email } = req.body; // Supondo que você tenha esses dados no corpo da requisição
  
// //       // Atualizando o perfil do usuário no banco de dados
// //       const updatedUser = await prisma.user.update({
// //         where: { id: userId },
// //         data: { nome, email },
// //       });
  
// //       res.status(200).json({ message: 'Perfil atualizado com sucesso', updatedUser });
// //     } catch (error) {
// //       console.error('Erro ao atualizar perfil:', error);
// //       res.status(500).send('Erro ao atualizar perfil');
// //     }
// //   };
  
  







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


// Controlador de login
// loginController.js
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
    try {
      const { email, senha } = req.body;
  
      // Verificar se o email e senha foram fornecidos
      if (!email || !senha) {
        return res.render('login', { errorMessage: 'Email e senha são obrigatórios.' });
      }
  
      const user = await prisma.user.findUnique({
        where: { email: email },
      });
  
      if (!user) {
        return res.render('login', { errorMessage: 'Usuário não encontrado' });
      }
  
      // Se a senha for correta, gera o token
      if (user.senha !== senha) {
        return res.render('login', { errorMessage: 'Senha incorreta' });
      }
  
      const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.cookie('token', token, { httpOnly: true });
  
      // Redireciona para o perfil
      res.redirect('/');
    } catch (error) {
      console.error('Erro ao realizar login:', error);
      res.status(500).send('Erro ao realizar login');
    }
  };
  


// Controlador de logout
exports.logout = async (req, res) => {
    const result = logout();

  // Limpa o cookie do usuário
  res.clearCookie('userId', { path: '/' });

  // Redireciona para a página inicial ou de login
  res.redirect('/login');
}


// Controlador para visualizar o resumo de compras
exports.getSummary = async (req, res) => {
    const userId = req.cookies.userId;

  try {
    const result = await getSummary(userId);

    if (!result.success) {
      return res.render('resumocompras', { message: result.message });
    }

    return res.render('resumocompras', { purchases: result.data });
  } catch (error) {
    return res.render('resumocompras', { message: 'Erro ao carregar o resumo: ' + error.message });
  }
}





exports.finalizarCompra = async (req, res) => {
    const { id_usuario } = req.session;  // Supondo que o ID do usuário está na sessão

  try {
    const result = await finalizarCompra(id_usuario);

    if (result.success) {
      return res.render('resumocompras', { compras: result.data });
    } else {
      return res.status(400).json(result);
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Erro ao finalizar compra' });
  }
}





const{finalizarCompra, getSummary} = require ("../services/resumocompras");
const { createUser, findAllUsers,getUserById, deleteUser, viewAllUsers, updateUser, getPerfilByUserId, updatePerfil,validateLogin } = require("../services/User")
const {login, logout} = require ("../services/autenticacao")

