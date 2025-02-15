const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const fs = require('fs');
const { validateLogin } = require('../controllers/UserController');

const Produto = prisma.produto;
const Categoria = prisma.tipoCategoria;
const detalhes = prisma.detalhes;


// // Função para exibir o formulário de edição
// const editarProductForm = async (req, res) => {
  
//     const result = await Produto.getProductById(req.params.id,{
//       where: { id: parseInt(id) },
//       data: {
//         nome_produto,
//         descricao,
//         preco: parseFloat(preco),
//         quantidade: parseInt(quantidade),
//         categoriaId: parseInt(Categoria),
//       },
//       data,

//     })
//     return result;
// };

const editarProductForm = async (id) => {
  const result = await Produto.findUnique({
      where: { id: parseInt(id) } // Corrigido
  });
  return result;
};


//  const updateProduct = async (id, data) => {
//      const result = await Produto.update({
//          where: { id: parseInt(id)  },
//          data,
//      });
//      return result;
//  };

const updateProduct = async (id, data) => {
  const result = await Produto.update({
      where: { id: parseInt(id) },
      data,
  });
  return result;
};


//  const deleteProduct = async (id) => {
//      const result = await Produto.delete({ where: { id: parseInt(id)  } });
//      return result;
     
//  };

const deleteProduct = async (id) => {
  const result = await Produto.delete({
      where: { id: parseInt(id) }
  });
  return result;
};


const createProduct = async (data) => {
  try {
    const result = await Produto.create({
      data: {
        nome_produto: data.nome_produto,
        descricao: data.descricao,
        preco: parseFloat(data.preco),
        quantidade: parseInt(data.quantidade, 10),
        detalhes: data.detalhes,
        tipoCategoriaId: parseInt(data.tipoCategoriaId, 10),
        imagem: data.imagem, // Caminho da imagem
      },
    });
    return result;
  } catch (error) {
    console.error("Erro ao criar produto:", error);
    throw error;
  }
};

const getAllProducts = async() =>{
    const result = await Produto.findMany()    
    return result
}
const getProductByIdCategoria = async(tipoCategoriaId) =>{
    const result = await Produto.findMany({where:{tipoCategoriaId: tipoCategoriaId}})    
    return result
}

const getProductsByIdCategoria = async(tipoCategoriaId) =>{
    const result = await Produto.findMany({where:{tipoCategoriaId: tipoCategoriaId}})    
    return result
}

const getProdByCategory = async (tipoCategoriaId) => {
  if (!tipoCategoriaId) {
    throw new Error('tipoCategoriaId is required');
  }

  const result = await Produto.findMany({
    where: {
      tipoCategoriaId: {
        equals: tipoCategoriaId  // Aqui, use o valor de tipoCategoriaId
      }
    }
  });

  return result;
};


const getProdByIdCategory = async (tipoCategoriaId) => {
  // Valida o argumento antes de prosseguir
  if (!tipoCategoriaId) {
    throw new Error('O tipoCategoriaId é obrigatório.');
  }

  // Garante que o tipoCategoriaId é um número, caso necessário
  const idCategoria = Number(tipoCategoriaId);
  if (isNaN(idCategoria)) {
    throw new Error('O tipoCategoriaId deve ser um número válido.');
  }

  // Executa a busca no banco de dados
  const result = await Produto.findMany({
    where: { tipoCategoriaId: idCategoria },
  });

  return result;
};




const VerDetalhes = async(detalhes) =>{
    const result = await detalhes.findFirst({where:{detalhes: detalhes}})    
    return result
  }

  const VerDetalhesEdit = async(detalhes) =>{
    const result = await detalhes.findFirst({where:{detalhes: detalhes}})    
    return result
  }

  const atualizarProduto = async (id, dadosAtualizados) => {
    const result = await Produto.update({
      where: { id: parseInt(id) },
      data: dadosAtualizados,
    });
    return result;
  };


  const getProductById = async (id) => {
    const result = await Produto.findUnique({
      where: {
        id: parseInt(id) // Certifique-se de passar um número inteiro
      }
    });
    return result;
  };
  
  


module.exports = { createProduct,deleteProduct,updateProduct, getAllProducts, getProductByIdCategoria,getProductsByIdCategoria, getProdByCategory, getProdByIdCategory, VerDetalhes,editarProductForm,atualizarProduto, getProductById,getProdByCategory, VerDetalhesEdit, validateLogin }