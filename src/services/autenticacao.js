const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Lógica de autenticação
const login = async(email, senha)=>{
    const user = await prisma.user.findUnique({ where: { email, senha } });
  
    if (!user || user.senha !== senha) {
      return { success: false, data: null, message: 'Credenciais inválidas' };
    }
  
    return { success: true, data: { userId: user.id }, message: 'Login bem-sucedido' };
  }
  
  // Lógica de logout (simplificada)
  const logout = async() =>{
    return { success: true, message: 'Logout bem-sucedido' };
  }
  
  // Exportação das funções
 
  module.exports = { login,logout };