const session = require('express-session');

// const sessionConfig = session({
//   secret: process.env.SESSION_SECRET || 'chave-secreta-padrao', // Usa variável de ambiente ou chave padrão
//   resave: false, // Não salva a sessão se não houver mudanças
//   saveUninitialized: false, // Não salva sessões vazias
//   cookie: {
//     secure: false, // true apenas em produção com HTTPS
//     maxAge: 1000 * 60 * 60, // Sessão expira em 1 hora
//   }
// });

// module.exports = sessionConfig;

// const jwt = require("jsonwebtoken");

// const verifyToken = (req, res, next) => {

//   const authHeader = req.header("Authorization");

//   if (!authHeader) {
//     console.log("Cabeçalho de autorização ausente!");
//     return res.status(401).json({ message: "Acesso negado! Token ausente." });
//   }
  
//   const token = authHeader.split(" ")[1];

//   try {
//     const verified = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = verified;
//     next();
//   } catch (error) {
//     return res.status(403).json({ message: "Token inválido!" });
//   }
// };

// module.exports = verifyToken;

const Authenticate = (req, res, next) => {
  console.log("Verificando sessão:", req.session);

  // Verifica se req.session está definido antes de acessar req.session.user
  if (!req.session || !req.session.user) {
      return res.redirect('/login'); // Se não estiver logado, redireciona para login
  }
  
  next(); // Se estiver logado, continua
};

module.exports = Authenticate;

