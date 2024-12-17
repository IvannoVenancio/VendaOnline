const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const Produto = prisma.produto;
const Categoria = prisma.tipoCategoria;


// const getAllProducts = async () => {
//     const result = await Produto.findMany();
//     return result;
// };

// const getProductById = async (id) => {
//     const result = await Produto.findUnique({ where: { id } });
//     return result;
// };

// const updateProduct = async (id, data) => {
//     const result = await Produto.update({
//         where: { id },
//         data,
//     });
//     return result;
// };

// const deleteProduct = async (id) => {
//     const result = await Produto.delete({ where: { id } });
//     return result;
// };

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

const createProduct = async(data) =>{
    const result = await Produto.create({data: {...data,  
      preco: parseFloat(data.preco),
      quantidade: parseInt(data.quantidade),
      tipoCategoriaId: parseInt(data.tipoCategoriaId)
},
});
    return result
}

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


const VerDetalhes = async(Detalhes) =>{
    const result = await Detalhes.findFirst({where:{Detalhes: Detalhes}})    
    return result
  }




module.exports = { createProduct, getAllProducts, getProductByIdCategoria, getProdByCategory, getProductsByIdCategoria, VerDetalhes }