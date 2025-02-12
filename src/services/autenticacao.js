const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const login = async (email, senha) => {
  try {
    console.log("Email recebido:", email);  
    console.log("Senha recebida:", senha);

    if (!email || !senha) {
      return { error: "Email e senha são obrigatórios!" };
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return { error: "Usuário não encontrado!" };
    }

    console.log("Usuário encontrado:", user); 

    // Comparação sem bcrypt (ATENÇÃO: só funciona se as senhas não estiverem criptografadas!)
    if (senha !== user.senha) {
      return { error: "Credenciais inválidas" };
    }

    return { user }; // 🔥 Retorna o usuário SEM token para usar sessões
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return { error: "Erro ao fazer login" };
  }
};

module.exports = { login };

