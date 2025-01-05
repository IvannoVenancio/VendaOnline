const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const fs = require('fs')

const Produto = prisma.produto;
const Categoria = prisma.tipoCategoria;
const detalhes = prisma.detalhes;


// const getAllProducts = async () => {
//     const result = await Produto.findMany();
//     return result;
// };

// const getProductById = async (id) => {
//     const result = await Produto.findUnique({ where: { id } });
//     return result;
// };


// Função para exibir o formulário de edição
const editarProductForm = async (req, res) => {
  
    const result = await Produto.findById(req.params.id,{
      where: { id: parseInt(id) },
      data: {
        nome_produto,
        descricao,
        preco: parseFloat(preco),
        quantidade: parseInt(quantidade),
        categoriaId: parseInt(Categoria),
      },
      data,

    })
    return result;
};


 const updateProduct = async (id, data) => {
     const result = await Produto.update({
         where: { id: parseInt(id)  },
         data,
     });
     return result;
 };

 const deleteProduct = async (id) => {
     const result = await Produto.delete({ where: { id: parseInt(id)  } });
     return result;
     
 };

// // Exportando as funções
// module.exports = {
//     // Funções de Produto
//     createProduct,
//     getAllProducts,
//     getProductById,
//     updateProduct,
//     deleteProduct,
// };*/

// //const {PrismaClient} = require('@prisma/client')

// //const Produto = prisma.produto

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

const getProdByCategory = async(tipoCategoriaId) =>{
  const result = await Produto.findMany({where:{tipoCategoriaId: tipoCategoriaId}})    
  return result
}


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
        id: parseInt(id) // Certifica-se de que o ID seja tratado como número
      }
    });
    return result; // Retorna o resultado da consulta
  };


module.exports = { createProduct,deleteProduct,updateProduct, getAllProducts, getProductByIdCategoria, getProdByCategory, getProductsByIdCategoria, VerDetalhes,editarProductForm,atualizarProduto, getProductById, VerDetalhesEdit }