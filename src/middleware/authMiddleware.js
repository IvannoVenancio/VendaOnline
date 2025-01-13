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
