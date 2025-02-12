// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();
// const session = require('express-session');

// // Exibe a página inicial
// exports.home = async (req, res) => {
//   try {
//       console.log('Sessão:', req.session); // Verifique se req.session existe
//       if (!req.session || !req.session.userId) {
//           return res.redirect('/login');
//       }

//       res.render('home', { layout: '', userName: req.session.userName });
//   } catch (error) {
//       console.error(error);
//       res.status(500).send('Erro interno no servidor');
//   }
// };

// // Exibe a página de cadastro
// exports.cadastro = async (req, res) => {
//     try {
//         res.render('cadastro');
//     } catch (error) {
//         console.log(error);
//     }
// };

// // Processa o cadastro de um novo usuário
// exports.create = async (req, res) => {
//     try {
//         const { nome, email, senha } = req.body;

//         // Cria o novo usuário no banco de dados
//         await prisma.user.create({
//             data: { nome, email, senha },
//         });

//         res.redirect('/login'); // Redireciona para a página de login
//     } catch (error) {
//         console.log("Erro ao criar usuário:", error);
//     }
// };


// // // Exibe a página de login
// // exports.login = async (req, res) => {
// //   try {
// //       // Limpa mensagem de erro antes de renderizar a página
// //       const message = req.session.error || null;
// //       req.session.error = null; // Limpa mensagem de erro

// //       // Renderiza a página de login
// //       res.render('login', { message });
// //   } catch (error) {
// //       console.log(error);
// //       res.status(500).send('Erro ao exibir a página de login');
// //   }
// // };

// exports.validateLogin = async (email, senha) => {
//   try {
//     // Busca o usuário pelo email
//     const user = await prisma.user.findUnique({
//       where: { email }
//     });

//     // Verifica se o usuário existe e se a senha está correta
//     if (!user || user.senha !== senha) {
//       return null; // Credenciais inválidas
//     }

//     return user; // Retorna o usuário autenticado
//   } catch (error) {
//     console.error('Erro ao validar login:', error);
//     return null;
//   }
// };

// exports.authenticate = async (req, res) => {
//     const { email, senha } = req.body;

//     const result = await validateLogin(email, senha);

//     if (result.success) {
//         // Gerar o JWT com as informações do usuário
//         const token = jwt.sign(
//             { id: result.data.id, nome: result.data.nome }, // Payload
//             'seuSegredoAqui',  // Segredo usado para assinar o token
//             { expiresIn: '1h' }  // Definindo tempo de expiração do token
//         );

//         // Envia o token de volta para o cliente
//         res.json({ token });
//     } else {
//         res.status(401).json({ message: result.message });
//     }
// };

// // Exibe a página de perfil (rota protegida)
// exports.perfil = async (req, res) => {
//     try {
//         if (!req.session.userId) {
//             return res.redirect('/login'); // Redireciona para login se não autenticado
//         }

//         // Busca os dados do usuário
//         const user = await prisma.user.findUnique({
//             where: { id: req.session.userId },
//         });

//         if (!user) {
//             return res.status(404).send('Usuário não encontrado');
//         }

//         res.render('perfil', { user });
//     } catch (error) {
//         console.error("Erro ao carregar o perfil:", error);
//         res.status(500).send('Erro ao carregar o perfil');
//     }
// };



// //    Função para obter perfil de um usuário
// //    controllers/PerfilController.js
// //   exports.getPerfil = async (req, res) => {
// //       try {
// //         if (!req.user) {
// //           return res.status(401).send('Usuário não autenticado');
// //         }
  
// //         const user = await prisma.user.findUnique({
// //           where: { id: req.user.id },
// //         });
  
// //         if (!user) {
// //           return res.status(404).send('Usuário não encontrado');
// //         }
  
// //         res.json(user);
// //       } catch (error) {
// //         console.error('Erro ao obter perfil:', error);
// //         res.status(500).send('Erro ao obter perfil');
// //       }
// //     };
  
  
  

// // // // Função para atualizar o perfil do usuário
// // // exports.updatePerfil = async (req, res) => {
// // //     try {
// // //       const userId = req.user.id; // Aqui você acessa o ID do usuário autenticado via token
// // //       const { nome, email } = req.body; // Supondo que você tenha esses dados no corpo da requisição
  
// // //       // Atualizando o perfil do usuário no banco de dados
// // //       const updatedUser = await prisma.user.update({
// // //         where: { id: userId },
// // //         data: { nome, email },
// // //       });
  
// // //       res.status(200).json({ message: 'Perfil atualizado com sucesso', updatedUser });
// // //     } catch (error) {
// // //       console.error('Erro ao atualizar perfil:', error);
// // //       res.status(500).send('Erro ao atualizar perfil');
// // //     }
// // //   };
  
  







// exports.resumocompras = async(req, res)=>{
//     try {
//         res.render('resumocompras')
//     } catch (error) {
//         console.log(error)
//     }
// }

// exports.listaUsers = async(req, res)=>{
//     try {
//         res.render('listaUsers')
//     } catch (error) {
//         console.log(error)
//     }
// }

// exports.atualizarUser = async(req, res)=>{
//     try {
//         res.render('atualizarUser')
//     } catch (error) {
//         console.log(error)
//     }
// }

// exports.viewAllUsers = async (req, res) => {
//     try {
//       const users = await prisma.user.findMany();
//       res.render("listaUsers", { users }); // Renderiza a lista de utilizadores
//     } catch (error) {
//       console.error("Erro ao buscar todos os utilizadores:", error);
//       res.status(500).send("Erro ao carregar a lista de utilizadores");
//     }
//   }
  

// // Visualiza um único usuário
// exports.viewUserById = async (req, res) => {
//     try {
//       const { id } = req.params;
//       const user = await getUserById(id);
//       if (!user) return res.status(404).send("Usuário não encontrado.");
//       res.render('listaUserbyId', { user });
//     } catch (error) {
//       console.error("Erro ao buscar usuário por ID:", error);
//       res.status(500).send("Erro ao buscar usuário.");
//     }
//   };

//   exports.editUserForm = async (req, res) => {
//     try {
//         const userId = req.params.id;

//         // Buscar o usuário pelo ID
//         const user = await prisma.user.findUnique({
//             where: { id: parseInt(userId) },
//         });

//         if (!user) {
//             return res.status(404).send("Usuário não encontrado.");
//         }

//         // Renderizar a página com os dados do usuário
//         res.render("atualizarUser", { user });
//     } catch (error) {
//         console.error("Erro ao buscar o usuário:", error);
//         res.status(500).send("Erro ao carregar o formulário de edição.");
//     }
// }


//   exports.updateUser = async (req, res) => {
//     try {
  
//       const { id } = req.params;
//       const { name, email, senha } = req.body; // Dados recebidos do formulário

//       await updateUser(id, {
//           name,
//           senha,
//           email 
//       });
//       res.redirect('/listaUsers');
//     } catch (error) {
//       console.error("Erro ao atualizar produto:", error);
//       res.status(500).send("Erro ao atualizar produto.");
//     }
//   };
  
  
  
  
    



// exports.deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;

//     await prisma.user.delete({
//       where: { id: parseInt(id) },
//     });

//     res.redirect("/listaUsers");
//   } catch (error) {
//     console.error("Erro ao deletar o utilizador:", error);
//     res.status(500).send("Erro ao deletar o utilizador.");
//   }
// };


// // Controlador de login
// // loginController.js
// const jwt = require('jsonwebtoken');

// exports.login = async (req, res) => {
//     try {
//       const { email, senha } = req.body;
  
//       // Verificar se o email e senha foram fornecidos
//       if (!email || !senha) {
//         return res.render('login', { errorMessage: 'Email e senha são obrigatórios.' });
//       }
  
//       const user = await prisma.user.findUnique({
//         where: { email: email },
//       });
  
//       if (!user) {
//         return res.render('login', { errorMessage: 'Usuário não encontrado' });
//       }
  
//       // Se a senha for correta, gera o token
//       if (user.senha !== senha) {
//         return res.render('login', { errorMessage: 'Senha incorreta' });
//       }
  
//       const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
//       res.cookie('token', token, { httpOnly: true });
  
//       // Redireciona para o perfil
//       res.redirect('/');
//     } catch (error) {
//       console.error('Erro ao realizar login:', error);
//       res.status(500).send('Erro ao realizar login');
//     }
//   };
  


// // Controlador de logout
// exports.logout = async (req, res) => {
//     const result = logout();

//   // Limpa o cookie do usuário
//   res.clearCookie('userId', { path: '/' });

//   // Redireciona para a página inicial ou de login
//   res.redirect('/login');
// }


// // Controlador para visualizar o resumo de compras
// exports.getSummary = async (req, res) => {
//     const userId = req.cookies.userId;

//   try {
//     const result = await getSummary(userId);

//     if (!result.success) {
//       return res.render('resumocompras', { message: result.message });
//     }

//     return res.render('resumocompras', { purchases: result.data });
//   } catch (error) {
//     return res.render('resumocompras', { message: 'Erro ao carregar o resumo: ' + error.message });
//   }
// }





// exports.finalizarCompra = async (req, res) => {
//     const { id_usuario } = req.session;  // Supondo que o ID do usuário está na sessão

//   try {
//     const result = await finalizarCompra(id_usuario);

//     if (result.success) {
//       return res.render('resumocompras', { compras: result.data });
//     } else {
//       return res.status(400).json(result);
//     }
//   } catch (error) {
//     return res.status(500).json({ success: false, message: 'Erro ao finalizar compra' });
//   }
// }





// const{finalizarCompra, getSummary} = require ("../services/resumocompras");
// const { createUser, findAllUsers,getUserById, deleteUser, viewAllUsers, updateUser, getPerfilByUserId, updatePerfil,validateLogin } = require("../services/User")
// const {login, logout} = require ("../services/autenticacao")


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




// Exibe a página home
exports.home = async (req, res) => {
    try {
        if (!req.user || !req.user.id) {
            return res.redirect('/login');
        }

        const user = await prisma.user.findUnique({
            where: { id: req.user.id }
        });

        if (!user) {
            return res.redirect('/login');
        }

        res.render('/', { layout: '', userName: user.nome });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
};

exports.view = async(req, res) =>{
  try {
      
    const tipo_usuario = await findAllUserTypes()
      res.render('cadastro', {tipo_usuario })        
  } catch (error) {
      console.log("error:::", error)
  }
}

// Exibe a página de cadastro
exports.cadastro = async (req, res) => {
    try {
      const tipo_usuario = await findAllUserTypes()
        res.render('cadastro', {tipo_usuario });
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
   



// // Valida o login do usuário e gera o token
// exports.validateLogin = async (email, senha) => {
//     try {
//         const user = await prisma.user.findUnique({
//             where: { email }
//         });

//         if (!user || user.senha !== senha) {
//             return null; // Credenciais inválidas
//         }

//         return user; // Retorna o usuário autenticado
//     } catch (error) {
//         console.error('Erro ao validar login:', error);
//         return null;
//     }
// };

// Exibe a página de perfil (rota protegida)
exports.perfil = async (req, res) => {
  try {
      if (!req.session.user) {
          return res.status(401).send("Utilizador não autenticado");
      }
      const users = req.user; // Supondo que `req.user` tem os dados do usuário
      const perfil = req.perfil; // Supondo que `req.perfil` tem os dados do perfil do usuário


      const user = await prisma.user.findUnique({
        where: {
          email: req.session.user.email,
          tipo_usuario: req.session.user.tipo_usuario
        }
      });

      if (!user) {
          return res.status(404).send("Usuário não encontrado");
      }

      res.render("perfil", {
          user,
          perfil: user.perfilId, paises: ["Portugal", "Angola", "Brazil", "Congo"], // Lista de países
        });
  } catch (error) {
      console.error("Erro ao carregar o perfil:", error);
      res.status(500).send("Erro ao carregar o perfil");
  }
};



// Exibe o resumo das compras (rota protegida)
exports.resumocompras = async (req, res) => {
    try {
        res.render('resumocompras');
    } catch (error) {
        console.log(error);
    }
};

exports.listaUsers = async (req, res) => {
    try {
        res.render('listaUsers');
    } catch (error) {
        console.log(error);
    }
};

exports.atualizarUser = async (req, res) => {
    try {
        res.render('atualizarUser');
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

// // Controlador de logout
// exports.logout = async (req, res) => {
//     // Limpa o cookie do token
//     res.clearCookie('token', { path: '/' });

//     // Redireciona para a página inicial ou de login
//     res.redirect('/login');
// };

// Controlador para visualizar o resumo de compras
exports.getSummary = async (req, res) => {
    const userId = req.user.id;

    try {
        const result = await getSummary(userId);

        if (!result.success) {
            return res.render('resumocompras', { message: result.message });
        }

        return res.render('resumocompras', { purchases: result.data });
    } catch (error) {
        return res.render('resumocompras', { message: 'Erro ao carregar o resumo: ' + error.message });
    }
};

exports.finalizarCompra = async (req, res) => {
    const { id_usuario } = req.user.id;

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
};
