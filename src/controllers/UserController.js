

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





