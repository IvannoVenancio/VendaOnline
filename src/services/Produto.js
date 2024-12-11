const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

const Produto = prisma.produto;

/* Rota para cadastrar o novo produto
router.post('/cadastroproduto', async (req, res) => {
    const { name, description, price, category } = req.body;
  
    try {
      // Cria um novo produto no banco de dados usando Prisma
      const newProduct = await prisma.product.create({
        data: {
          name,
          description,
          price: parseFloat(price),
          category,  // Salva a categoria do produto
        },
      });
  
      // Redireciona para a página da categoria específica após o cadastro
      res.redirect(`/products/${category}`);
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao cadastrar o produto.');
    }
  });
  
  // Rota para listar produtos de uma categoria específica
  router.get('/products/:category', async (req, res) => {
    const { category } = req.params;
    try {
      // Filtra os produtos pela categoria
      const products = await prisma.product.findMany({
        where: { category },
      });
  
      res.render('products', { products, category });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar os produtos.');
    }
  });

  const createProduct = async (data) => {
    const result = await Produto.create({
        data: {
            nome_produto: data.nome_produto,
            descricao: data.descricao,
            preco: parseFloat(data.preco), // Garantir que seja um número
            quantidade: parseInt(data.quantidade), // Garantir que seja um inteiro
            id_categoria: parseInt(data.id_categoria), // Garantir que seja um inteiro
    } });
    return result};


const getAllProducts = async () => {
    const result = await Produto.findMany();
    return result;
};

const getProductById = async (id) => {
    const result = await Produto.findUnique({ where: { id } });
    return result;
};

const updateProduct = async (id, data) => {
    const result = await Produto.update({
        where: { id },
        data,
    });
    return result;
};

const deleteProduct = async (id) => {
    const result = await Produto.delete({ where: { id } });
    return result;
};

// Exportando as funções
module.exports = {
    // Funções de Produto
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};*/

//const {PrismaClient} = require('@prisma/client')

//const Produto = prisma.produto

const createProduct = async(data) =>{
    const result = await Produto.create({data: {...data,  
      preco: parseFloat(data.preco),
      quantidade: parseInt(data.quantidade)}})
    return result
}

const getAllProducts = async() =>{
    const result = await Produto.findMany()    
    return result
}

module.exports = { createProduct, getAllProducts }