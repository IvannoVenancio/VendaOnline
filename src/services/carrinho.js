<<<<<<< HEAD
<<<<<<< HEAD
=======
// const { carrinho } = require("../controllers/CarrinhoController");
// const { produtos } = require("../controllers/ProdutoController");
>>>>>>> f5a12c7229336d6eb36c3fc41bb25ac6d67b49b7
=======
// const { carrinho } = require("../controllers/CarrinhoController");
// const { produtos } = require("../controllers/ProdutoController");
>>>>>>> f5a12c7229336d6eb36c3fc41bb25ac6d67b49b7

const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()


<<<<<<< HEAD
<<<<<<< HEAD
const adicionarProdutoAoCarrinho = async (id_usuario, id_produto) => {
    const produtoId = Number(id_produto);

    if (isNaN(produtoId)) {
        return { success: false, message: "ID do produto inválido" };
    }

    const produto = await prisma.produto.findUnique({
        where: { id: produtoId }
    });

    if (!produto) {
        return { success: false, message: "Produto não encontrado" };
    }

    // Verifica se o produto já existe no carrinho
    const itemExistente = await prisma.carrinho.findFirst({
        where: { id_usuario, id_produto: produtoId }
    });

    if (itemExistente) {
        // Se já existe, apenas aumenta a quantidade
        await prisma.carrinho.update({
            where: { id: itemExistente.id },
            data: {
                quantidade: itemExistente.quantidade + 1,
                subtotal: produto.preco * (itemExistente.quantidade + 1)
            }
        });
    } else {
        // Se não existe, cria um novo item no carrinho
        await prisma.carrinho.create({
            data: {
                id_usuario,
                id_produto: produtoId,
                quantidade: 1, // Começa com 1
                valor_unitario: produto.preco,
                subtotal: produto.preco
            }
        });
    }

    return { success: true, message: "Produto adicionado ao carrinho" };
};


const atualizarProdutoNoCarrinho = async (id, quantidade) => {
    return await prisma.carrinho.update({
        where: {
            id: Number(id)
        },
        data: {
            quantidade: Number(quantidade) // ✅ Garante que é um número válido
        }
    });
};



const removerProdutoDoCarrinho = async (id) => {
    return await prisma.carrinho.delete({
        where: { id: Number(id) }
    });
=======
=======
>>>>>>> f5a12c7229336d6eb36c3fc41bb25ac6d67b49b7



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
<<<<<<< HEAD
>>>>>>> f5a12c7229336d6eb36c3fc41bb25ac6d67b49b7
=======
>>>>>>> f5a12c7229336d6eb36c3fc41bb25ac6d67b49b7
}



<<<<<<< HEAD
<<<<<<< HEAD


const eliminarCarrinho = async (id_usuario) => {
    const eliminado = await prisma.carrinho.deleteMany({ where: { id_usuario } });
    return eliminado.count > 0
        ? { success: true, message: "Carrinho eliminado" }
        : { success: false, message: "Erro ao eliminar ou carrinho já vazio" };
};


const finalizarCompra = async (id_usuario) => {
    return await prisma.$transaction(async (prisma) => {
        const carrinho = await prisma.carrinho.findMany({
            where: { id_usuario },
            include: { produto: true },
        });

        if (!carrinho.length) {
            return { success: false, message: "Carrinho vazio" };
        }

        for (const item of carrinho) {
            await prisma.resumoCompra.create({
                data: {
                    id_usuario,
                    id_produto: item.id_produto,
                    quantidade: item.quantidade,
                    valor_unitario: item.produto.preco,
                    total: item.quantidade * item.produto.preco,
                    status_entrega: "Pedido recebido",
                },
            });
        }

        await prisma.carrinho.deleteMany({ where: { id_usuario } });

        return { success: true };
    });
};


const obterResumoPorUsuario = async (id_usuario) => {
    return await prisma.resumoCompra.findMany({
        where: { id_usuario },
        include: { produto: true },
        orderBy: { data_compra: 'desc' }
    });
};




const obterCarrinhoPorUsuario = (id_usuario) => 
    prisma.carrinho.findMany({
        where: { id_usuario },
        include: { 
            produto: {   
                select: {
                    nome_produto: true,
                    preco: true,
                    imagem: true
                }
            } 
        }
    }).then((carrinho) => ({
        success: true,
        data: carrinho
    })).catch((error) => {
        console.error("Erro ao obter carrinho:", error);
        return { success: false, message: "Erro ao carregar carrinho." };
    });



const obterTodosOsCarrinhos = async () => {
    return await prisma.carrinho.findMany({ include: { produto: true, user: true } });
};

const obterTodosOsResumos = async () => {
    return await prisma.resumoCompra.findMany({ include: { produto: true, user: true } });
};

const obterProdutos = async () => {
    const produtos = await prisma.produto.findMany();
    return { success: true, data: produtos };
};

const salvarResumoCompra = async (userId, carrinho) => {
    const compras = carrinho.map(item => ({
        id_usuario: Number(userId),
        id_produto: Number(item.produtoId),
        quantidade: Number(item.quantidade),
        valor_unitario: Number(item.preco),
        total: Number(item.preco * item.quantidade),
        status_entrega: "Pedido recebido"
    }));

    return await prisma.resumoCompra.create({
        data: compras
    });
};

module.exports = {
    adicionarProdutoAoCarrinho,
    atualizarProdutoNoCarrinho,
    removerProdutoDoCarrinho,
    eliminarCarrinho,
    finalizarCompra,
    obterCarrinhoPorUsuario,
    obterResumoPorUsuario,
    obterTodosOsCarrinhos,
    obterTodosOsResumos,
    salvarResumoCompra,
    obterProdutos
};


=======
=======
>>>>>>> f5a12c7229336d6eb36c3fc41bb25ac6d67b49b7
// Exportação das funções
module.exports = {
    getCart,
    addToCart,  visualizarCarrinho,
    adicionarProdutoAoCarrinho,
    atualizarProdutoNoCarrinho,
    removerProdutoDoCarrinho,
    finalizarCompra,
};
<<<<<<< HEAD
>>>>>>> f5a12c7229336d6eb36c3fc41bb25ac6d67b49b7
=======
>>>>>>> f5a12c7229336d6eb36c3fc41bb25ac6d67b49b7
