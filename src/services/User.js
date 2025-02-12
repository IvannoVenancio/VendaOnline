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

      if (!user) {
          result.message = "Usuário ou senha inválidos.";
          return result;
      }

      // Comparação direta da senha (NÃO SEGURO para produção)
      if (user.senha !== senha) {
          result.message = "Usuário ou senha inválidos.";
          return result;
      }

      result.success = true;
      result.data = user;
      result.message = "Login bem-sucedido.";
      return result;

  } catch (error) {
      console.error("Erro ao validar login:", error);
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

// Função para buscar o usuário pelo ID
const getUserByEmail = async (email) => {
  try {
    const result = await prisma.user.findUnique({
      where: { email: email },
    });
    return result;
  } catch (error) {
    console.error('Erro ao buscar usuário por email:', error);
    throw error;
  }
};

module.exports = {
  createUser,
  findAllUsers,
  validateLogin,
  getUserById,
  updateUser,
  deleteUser,
  viewAllUsers,
  getUserByEmail
};
