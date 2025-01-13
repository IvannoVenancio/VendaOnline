// const { carrinho } = require("../controllers/CarrinhoController");
// const { produtos } = require("../controllers/ProdutoController");

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()





const getCart = async (id_usuario) => {
    const result = { success: false, data: null, message: '' };

    const cartItems = await prisma.carrinho.findMany({
        where: { id_usuario },
        include: { produto: true },
    });

    if (cartItems.length === 0) {
        result.message = 'Carrinho vazio';
        return result;
    }

    result.success = true;
    result.data = cartItems;
    return result;
};

const addToCart = async (id_usuario, id_produto, quantidade) => {
    const result = { success: false, message: '' };

    const produto = await prisma.produto.findUnique({ where: { id: id_produto } });
    if (!produto) {
        result.message = 'Produto não encontrado';
        return result;
    }

    const existingItem = await prisma.carrinho.findFirst({
        where: { id_usuario, id_produto },
    });

    if (existingItem) {
        await prisma.carrinho.update({
            where: { id: existingItem.id },
            data: {
                quantidade: existingItem.quantidade + quantidade,
                total: (existingItem.quantidade + quantidade) * produto.preco,
            },
        });
    } else {
        await prisma.carrinho.create({
            data: {
                id_usuario,
                id_produto,
                quantidade,
                valor_unitario: produto.preco,
                total: quantidade * produto.preco,
            },
        });
    }

    result.success = true;
    return result;
};


// const visualizarCarrinho = async (id_usuario) => {
//   try {
//       // Consulta no banco para pegar os carrinhos do usuário
//       const carrinhos = await prisma.carrinho.findMany({
//           where: {
//               id_usuario: id_usuario, // Filtra pelo id_usuario
//           },
//           include: {
//               produtos: true, // Inclui os produtos do carrinho
//           }
//       });

//       if (carrinhos.length === 0) {
//           // Retorna carrinho vazio caso não haja
//           return { success: false, message: 'Carrinho vazio', data: [] };
//       }

//       return { success: true, message: 'Carrinho encontrado', data: carrinhos[0].produtos }; // Exemplo de retornar o primeiro carrinho
//   } catch (error) {
//       console.error('Erro ao buscar carrinho:', error);
//       return { success: false, message: 'Erro ao buscar carrinho', data: [] };
//   }
// };



// // Função para adicionar um produto ao carrinho
// const adicionarProdutoAoCarrinho = async (id_usuario, id_produto, quantidade) => {
//   const result = { success: false, message: '' };

//   try {
//       const produto = await prisma.produto.findUnique({
//           where: { id: id_produto },
//       });

//       if (!produto) {
//           result.message = 'Produto não encontrado';
//           return result;
//       }

//       const itemExistente = await prisma.carrinho.findFirst({
//           where: { id_usuario, id_produto },
//       });

//       if (itemExistente) {
//           // Atualiza a quantidade
//           await prisma.carrinho.update({
//               where: { id: itemExistente.id },
//               data: { quantidade: itemExistente.quantidade + quantidade },
//           });
//       } else {
//           // Adiciona novo item ao carrinho
//           await prisma.carrinho.create({
//               data: {
//                   id_usuario,
//                   id_produto,
//                   quantidade,
//                   valor_unitario: produto.preco,
//                   total: produto.preco * quantidade,
//               },
//           });
//       }

//       result.success = true;
//       result.message = 'Produto adicionado ao carrinho com sucesso!';
//       return result;
//   } catch (error) {
//       console.error('Erro ao adicionar produto ao carrinho:', error);
//       result.message = 'Erro ao adicionar produto ao carrinho';
//       return result;
//   }
// };

// Função para atualizar a quantidade de um produto no carrinho
const atualizarProdutoNoCarrinho = async (id_usuario, id_produto, novaQuantidade) => {
  const result = { success: false, message: '' };

  try {
      const item = await prisma.carrinho.findFirst({
          where: { id_usuario, id_produto },
      });

      if (!item) {
          result.message = 'Produto não encontrado no carrinho';
          return result;
      }

      await prisma.carrinho.update({
          where: { id: item.id },
          data: {
              quantidade: novaQuantidade,
              total: item.valor_unitario * novaQuantidade,
          },
      });

      result.success = true;
      result.message = 'Quantidade atualizada com sucesso';
      return result;
  } catch (error) {
      console.error('Erro ao atualizar produto no carrinho:', error);
      result.message = 'Erro ao atualizar produto no carrinho';
      return result;
  }
};

// Função para remover um produto do carrinho
const removerProdutoDoCarrinho = async (id_usuario, id_produto) => {
  const result = { success: false, message: '' };

  try {
      const item = await prisma.carrinho.findFirst({
          where: { id_usuario, id_produto },
      });

      if (!item) {
          result.message = 'Produto não encontrado no carrinho';
          return result;
      }

      await prisma.carrinho.delete({
          where: { id: item.id },
      });

      result.success = true;
      result.message = 'Produto removido do carrinho com sucesso';
      return result;
  } catch (error) {
      console.error('Erro ao remover produto do carrinho:', error);
      result.message = 'Erro ao remover produto do carrinho';
      return result;
  }
};

// Função para finalizar a compra
const finalizarCompra = async (id_usuario) => {
  const result = { success: false, message: '' };

  try {
      const carrinho = await prisma.carrinho.findMany({
          where: { id_usuario },
      });

      if (carrinho.length === 0) {
          result.message = 'Carrinho vazio';
          return result;
      }

      // Processa a compra (exemplo simplificado)
      for (const item of carrinho) {
          await prisma.resumoCompra.create({
              data: {
                  id_usuario,
                  id_produto: item.id_produto,
                  quantidade: item.quantidade,
                  preco_total: item.total,
              },
          });
      }

      // Limpa o carrinho após finalizar a compra
      await prisma.carrinho.deleteMany({ where: { id_usuario } });

      result.success = true;
      result.message = 'Compra finalizada com sucesso';
      return result;
  } catch (error) {
      console.error('Erro ao finalizar compra:', error);
      result.message = 'Erro ao finalizar compra';
      return result;
  }
};

const visualizarCarrinho = async (id_usuario) => {
  // Exemplo de lógica para visualizar o carrinho do usuário
  const carrinho = await db.carrinho.findMany({
      where: { id_usuario },
  });
  return carrinho;
}

async function adicionarProdutoAoCarrinho(userId, id_produto, quantidade) {
  const result = { success: false, data: null, message: '' };

  try {
      // Verifica se o produto já está no carrinho
      const existingItem = await prisma.carrinho.findFirst({
          where: { id_usuario, productId },
      });

      if (existingItem) {
          // Atualiza a quantidade do produto no carrinho
          const updatedItem = await prisma.carrinho.update({
              where: { id: existingItem.id },
              data: { quantidade: existingItem.quantidade + quantidade },
          });

          result.success = true;
          result.data = updatedItem;
          result.message = 'Produto atualizado no carrinho com sucesso.';
      } else {
          // Adiciona um novo produto ao carrinho
          const newItem = await prisma.carrinho.create({
              data: { id_usuario, id_produto, quantidade },
          });

          result.success = true;
          result.data = newItem;
          result.message = 'Produto adicionado ao carrinho com sucesso.';
      }
  } catch (error) {
      console.error(error);
      result.message = 'Erro ao adicionar produto ao carrinho.';
  }

  return result;
}



// Exportação das funções
module.exports = {
    getCart,
    addToCart,  visualizarCarrinho,
    adicionarProdutoAoCarrinho,
    atualizarProdutoNoCarrinho,
    removerProdutoDoCarrinho,
    finalizarCompra,
};
