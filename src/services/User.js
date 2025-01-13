const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

// Função para verificar se o tipo de usuário é válido
const isTipoUsuarioValid = async (tipo_usuario) => {
  const tipo = await prisma.tipoUsuario.findUnique({
    where: { id: tipo_usuario },
  });
  return !!tipo;
};

// Função para criar um novo usuário
const createUser = async (data) => {
  const result = await prisma.user.create({ data });
  return result;
};

// Função para buscar todos os usuários
const findAllUsers = async () => {
  const result = await prisma.user.findMany();
  return result;
};

// Função para validar o login do usuário
const validateLogin = async (email, senha) => {
  const result = { success: false, data: null, message: "" };

  try {
      if (!email || !senha) {
          result.message = "Email e senha são obrigatórios.";
          return result;
      }

      // Consulta com o Prisma
      const user = await prisma.user.findUnique({
          where: { email },
      });

      if (!user || user.senha !== senha) {
          result.message = "Usuário ou senha inválidos.";
          return result;
      }

      result.success = true;
      result.data = user;
      result.message = "Login bem-sucedido.";
      return result;
  } catch (error) {
      result.message = `Erro ao validar login: ${error.message}`;
      return result;
  }
};



// Função para buscar o usuário pelo ID
const getUserById = async (id) => {
  try {
    const result = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    return result;
  } catch (error) {
    console.error('Erro ao buscar usuário por ID:', error);
    throw error;
  }
};

// Função para atualizar o usuário
const updateUser = async (id, data) => {
  try {
    const result = await prisma.user.update({
      where: { id: parseInt(id) },
      data,
    });
    return result;
  } catch (error) {
    console.error('Erro ao atualizar o usuário:', error);
    throw error;
  }
};

// Função para excluir um usuário
const deleteUser = async (id) => {
  try {
    const result = await prisma.user.delete({
      where: { id: parseInt(id) },
    });
    return result;
  } catch (error) {
    console.error('Erro ao deletar usuário:', error);
    throw error;
  }
};

// Função para buscar todos os perfis dos usuários
const viewAllUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error('Erro ao buscar todos os usuários:', error);
    throw error;
  }
};

// // Função para obter o perfil de um usuário
// const getPerfilByUserId = async (userId) => {
//   try {
//       // Buscando o usuário no banco de dados com base no userId
//       const perfil = await prisma.user.findUnique({
//         where: { id: userId },
//         include: { perfil: true },
//       });
  
//       if (!perfil) {
//         return { success: false, message: 'Perfil não encontrado' };
//       }
  
//       return { success: true, data: perfil };
//     } catch (error) {
//       console.error('Erro ao buscar perfil:', error);
//       return { success: false, message: 'Erro ao buscar perfil' };
//     }
//   }


// // Função para atualizar o perfil de um usuário
// const updatePerfil = async (userId, perfilData) => {
//   try {
//     const perfilExistente = await prisma.perfil.findUnique({
//       where: { id: userId },
//     });

//     if (!perfilExistente) {
//       return { success: false, message: 'Perfil não encontrado para atualização.' };
//     }

//     const perfilAtualizado = await prisma.perfil.update({
//       where: { id: userId },
//       data: {
//         nome_utilizador: perfilData.nome_utilizador || perfilExistente.nome_utilizador,
//         descricao: perfilData.descricao || perfilExistente.descricao,
//         updated_at: new Date(),
//       },
//     });

//     return { success: true, data: perfilAtualizado };
//   } catch (error) {
//     console.error('Erro ao atualizar o perfil:', error);
//     return { success: false, message: 'Erro ao atualizar o perfil.' };
//   }
// };


// // Serviço para obter o perfil de um usuário
// async function getPerfilByUserId(userId) {
//   try {
//     const perfil = await prisma.perfil.findUnique({
//       where: {
//         id: userId,
//       },
//       include: {
//         perfil_usuario: true, // Relacionamento com o modelo User
//       },
//     });

//     if (!perfil) {
//       return { success: false, message: 'Perfil não encontrado.' };
//     }

//     return { success: true, data: perfil };
//   } catch (error) {
//     console.error('Erro ao buscar o perfil:', error);
//     return { success: false, message: 'Erro ao buscar o perfil.' };
//   }
// }

// // Serviço para atualizar o perfil de um usuário
//  const updatePerfil = async(userId, perfilData)=> {
//   try {
//     const perfilExistente = await prisma.perfil.findUnique({
//       where: {
//         id: userId,
//       },
//     });

//     if (!perfilExistente) {
//       return { success: false, message: 'Perfil não encontrado para atualização.' };
//     }

//     const perfilAtualizado = await prisma.perfil.update({
//       where: {
//         id: userId,
//       },
//       data: {
//         nome_utilizador: perfilData.nome_utilizador || perfilExistente.nome_utilizador,
//         descricao: perfilData.descricao || perfilExistente.descricao,
//         updated_at: new Date(),
//       },
//     });

//     return { success: true, data: perfilAtualizado };
//   } catch (error) {
//     console.error('Erro ao atualizar o perfil:', error);
//     return { success: false, message: 'Erro ao atualizar o perfil.' };
//   }
// }




module.exports = {
  createUser,
  findAllUsers,
  validateLogin,
  getUserById,
  updateUser,
  deleteUser,
  viewAllUsers,
};
