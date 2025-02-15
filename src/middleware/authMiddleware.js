const session = require('express-session');

const Authenticate = (req, res, next) => {
  console.log("Verificando sessão:", req.session);

  // Verifica se req.session está definido antes de acessar req.session.user
  if (!req.session || !req.session.user) {
      return res.redirect('/login'); // Se não estiver logado, redireciona para login
  }
  
  next(); // Se estiver logado, continua
};

const isAdmin = (req, res, next) => {
  if (!req.session || !req.session.user) {
      return res.redirect('/login'); // Redireciona se não estiver autenticado
  }

  if (req.session.user.tipo_usuario !== "Administrador") {
      return res.status(403).send("Acesso negado. Apenas administradores podem acessar esta página.");
  }

  next(); // Se for admin, continua
};



module.exports = { Authenticate, isAdmin };

