/*const {PrismaClient} = require('@prisma/client')

const prisma = new PrismaClient()
const User = prisma.user

// Funções para Usuário (User)
const createUser = async (data) => {
    const result = await User.create({ data:{...data} });
    return result;
};
const findAllUsers = async() =>{
    const result = await User.findMany()    
    return result
}
const getUserById = async (id) => {
    const result = await User.findUnique({ where: { id } });
    return result;
};
const deleteUser = async (id) => {
    const result = await prisma.user.delete({ where: { id } });
    return result;
};

module.exports = { createUser, findAllUsers, getUserById, deleteUser }*/


const {PrismaClient} = require('@prisma/client')
//const bcrypt = require('bcrypt'); // Para senhas criptografadas


const prisma = new PrismaClient()
const User = prisma.user

const isTipoUsuarioValid = async (tipo_usuario) => {
    const tipo = await prisma.tipoUsuario.findUnique({
      where: { id: tipo_usuario },
    });
    return !!tipo;
  };
  
  const createUser = async(data) =>{
    const result = await User.create({data: {...data}})
    return result
}
  


const findAllUsers = async() =>{
    const result = await User.findMany()    
    return result
}
const validateLogin = async(email,senha) =>{
    const result = await User.findUnique({where:{email:email, senha: senha}})    
    return result
}


  // Busca usuário pelo ID
  const getUserById = async (id) => {
    try {
      const result = await User.findUnique({ where: { id: parseInt(id) } });
      return result;
    } catch (error) {
      console.error("Erro ao buscar usuário por ID:", error);
      throw error;
    }
  };
  
 
  
  // Atualiza o usuário
  const updateUser = async (id, data) => {
    try {
      const result = await User.update({
        where: { id: parseInt(id) },
        data: data,
      });
      return result;
    } catch (error) {
      console.error("Erro ao atualizar o usuário:", error);
      throw error;
    }
  };
  

  // Exclui um usuário
  const deleteUser = async (id) => {
    try {
      const result = await User.delete({ where: { id: parseInt(id) } });
      return result;
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      throw error;
    }
  };

  const viewAllUsers = async () => {
    try {
      const users = await User.findMany();
      return users;
    } catch (error) {
      console.error("Erro ao buscar todos os usuários:", error);
      throw error;
    }
  };




module.exports = { createUser, findAllUsers, validateLogin, getUserById, updateUser, deleteUser, viewAllUsers }
