<<<<<<< HEAD
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

=======
const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.cookies.token;  // ou req.header('Authorization')

  if (!token) {
    return res.status(401).send('Acesso não autorizado');
  }

  try {
    const decoded = jwt.verify(token, 'VendaOnline');  // Verifique se a chave secreta está correta
    req.user = decoded;  // Atribui o usuário decodificado ao req.user
    next();
  } catch (error) {
    return res.status(401).send('Token inválido');
  }
};
>>>>>>> f5a12c7229336d6eb36c3fc41bb25ac6d67b49b7
