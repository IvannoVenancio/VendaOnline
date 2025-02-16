

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');
const { findAllUserTypes } = require('../services/TipoUsuario');

exports.paginainicial = async (req, res) => {
  try {
      res.render('paginainicial');
  } catch (error) {
      console.log(error);
  }
};

exports.paginainicialadm = async (req, res) => {
  try {
      res.render("paginaInicialAdm", { layout: "mainAdm" });
  } catch (error) {
      console.log(error);
  }
};

exports.home = async (req, res) => {
  try {
    res.render("home", { layout: '' });
  } catch (error) {
      console.log(error);
  }
};


// // Exibe a página home
// exports.home = async (req, res) => {

//     try {
//         if (!req.session.user.id || !req.session.user.id) {
//             return res.redirect('/login');
//         }

//         const user = await prisma.user.findUnique({
//             where: { id: req.session.user.id }
//         });

//         if (!user) {
//             return res.redirect('/login');
//         }

//         res.render("/", { layout: '', userName: user.name });
//     } catch (error) {
//         console.error(error);
//         res.status(500).send('Erro interno no servidor');
//     }
// };

exports.view = async(req, res) =>{
<<<<<<< HEAD
  try {
      
    const tipo_usuario = await findAllUserTypes()
      res.render('cadastro', {tipo_usuario })        
  } catch (error) {
      console.log("error:::", error)
  }
}
=======
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
<<<<<<< HEAD
>>>>>>> f5a12c7229336d6eb36c3fc41bb25ac6d67b49b7
=======
>>>>>>> f5a12c7229336d6eb36c3fc41bb25ac6d67b49b7

// Exibe a página de cadastro
exports.cadastro = async (req, res) => {
    try {
<<<<<<< HEAD
<<<<<<< HEAD
      const tipo_usuario = await findAllUserTypes()
        res.render('cadastro', {tipo_usuario, layout:"cadastroLogin" });
    } catch (error) {
        console.log(error);
    }
};

// Processa o cadastro de um novo usuário
exports.create = async (req, res) => {
       try {
           const data = req.body;
  
           // Cria o novo usuário no banco de dados
           await prisma.user.create({
               data: { ...data, tipo_usuario: Number(data.tipo_usuario) },
           });
  
          res.redirect('/login'); // Redireciona para a página de login
          return { user};
        } catch (error) {
          console.error('Erro ao registrar usuário:', error);
          return { error: 'Erro ao registrar usuário' };
        }
      };
   



// Exibe a página de perfil (rota protegida)
exports.perfil = async (req, res) => {
    try {
        if (!req.session.user) {
            return res.status(401).send("Utilizador não autenticado");
        }
  
        // Buscar usuário e incluir os dados do perfil
        const user = await prisma.user.findUnique({
          where: {
            email: req.session.user.email,
            tipo_usuario: req.session.user.tipo_usuario
          },
          include: {
            perfil: true, // Certifica-te de que há uma relação definida no Prisma Schema
          }
        });
  
        if (!user) {
            return res.status(404).send("Usuário não encontrado");
        }
  
        const paises = ["Portugal", "Angola", "Brazil", "Congo"];

        // No perfil
        const paisesFormatados = paises.map((pais) => ({
          nome: pais,
          selecionado: pais === user.perfil?.pais, // Verifica se o país do utilizador corresponde
        }));
        
        res.render("perfil", {
          user,
          perfil: user.perfil,
          paises: paisesFormatados, // Enviar lista formatada
        });
        
  
    } catch (error) {
        console.error("Erro ao carregar o perfil:", error);
        res.status(500).send("Erro ao carregar o perfil");
    }
  };
  
=======
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
=======
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
  
  




>>>>>>> f5a12c7229336d6eb36c3fc41bb25ac6d67b49b7



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
  
  




>>>>>>> f5a12c7229336d6eb36c3fc41bb25ac6d67b49b7


  exports.updateUserProfile = async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const { nome_utilizador, name, email, telefone, pais, data_nascimento, senha_atual, nova_senha, confirmar_senha } = req.body;
  
      console.log("🔍 Dados recebidos:", req.body); // Depuração
  
      if (!req.session.user || req.session.user.id !== userId) {
        console.log("❌ Acesso negado!");
        return res.status(403).send("Acesso negado!");
      }
  
      let imagem = null;
      if (req.file) {
        imagem = `/img/perfil/${req.file.filename}`;
      }
  
      // Busca o usuário e inclui o perfil
      const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { perfil: true },
      });
  
      if (!user) {
        console.log("❌ Usuário não encontrado!");
        return res.status(404).send("Usuário não encontrado");
      }
  
      console.log("🔍 Usuário encontrado:", user);
  
      // Inicia a atualização dentro de uma transação
      await prisma.$transaction(async (tx) => {
        // Atualiza ou cria o perfil do usuário
        if (!user.perfil) {
          console.log("⚡ Criando novo perfil...");
          await tx.perfil.create({
            data: {
              nome_utilizador,
              telefone,
              pais,
              data_nascimento: data_nascimento ? new Date(data_nascimento) : null,
              imagem: imagem || null,
              perfil_usuario: { connect: { id: userId } },
            },
          });
        } else {
          console.log("⚡ Atualizando perfil existente...");
          await tx.perfil.update({
            where: { id: user.perfil.id },
            data: {
              nome_utilizador,
              telefone,
              pais,
              data_nascimento: data_nascimento ? new Date(data_nascimento) : null,
              imagem: imagem || user.perfil.imagem, // Mantém a imagem existente se nenhuma for enviada
            },
          });
        }
  
        // Atualiza os dados do usuário
        console.log("⚡ Atualizando usuário...");
        await tx.user.update({
          where: { id: userId },
          data: { name, email },
        });
  
        // Atualiza a senha se foi fornecida
        if (nova_senha) {
          if (nova_senha !== confirmar_senha) {
            console.log("❌ Senhas não coincidem!");
            throw new Error("As senhas não coincidem!");
          }
  
          console.log("⚡ Atualizando senha...");
          await tx.user.update({
            where: { id: userId },
            data: { senha: nova_senha },
          });
        }
      });
  
      console.log("✅ Atualização concluída com sucesso!");
      req.session.user.name = name;
      res.redirect("/perfil");
  
    } catch (error) {
      console.error("❌ Erro ao atualizar perfil:", error);
      res.status(500).send("Erro ao atualizar perfil");
    }
  };
  

  





exports.listaUsers = async (req, res) => {
  req.session.user.id = id_usuario;
    try {
        res.render('listaUsers');
    } catch (error) {
        console.log(error);
    }
};

exports.atualizarUser = async (req, res) => {
  req.session.user.id = id_usuario;

    try {
        res.render('atualizarUser', {layout:"none"});
    } catch (error) {
        console.log(error);
    }
};

exports.viewAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.render("listaUsers", { users });
    } catch (error) {
        console.error("Erro ao buscar todos os utilizadores:", error);
        res.status(500).send("Erro ao carregar a lista de utilizadores");
    }
};

// Visualiza um único usuário
exports.viewUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
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
};

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, email, senha } = req.body; // Dados recebidos do formulário

        await prisma.user.update({
            where: { id: parseInt(id) },
            data: { nome, email, senha },
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
  


<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
>>>>>>> f5a12c7229336d6eb36c3fc41bb25ac6d67b49b7
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
<<<<<<< HEAD
>>>>>>> f5a12c7229336d6eb36c3fc41bb25ac6d67b49b7
=======
>>>>>>> f5a12c7229336d6eb36c3fc41bb25ac6d67b49b7

