const multer = require('multer');
const path = require('path');


// Configuração do armazenamento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Define o diretório onde os arquivos serão armazenados
    cb(null, 'public/img/');
  },
  filename: (req, file, cb) => {
    // Define o nome do arquivo (exemplo: timestamp-nomeoriginal.extensão)
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

// Filtros para tipos de arquivos permitidos
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não permitido!'), false);
  }
};

// Configuração do multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // Limite de 5MB
  }
});

module.exports = {upload}