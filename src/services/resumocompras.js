// services/comprasService.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const finalizarCompra = async(id_usuario)=>{
  try {
    // Primeiro, pegar todos os produtos no carrinho do usuário
    const carrinho = await prisma.carrinho.findMany({
      where: { id_usuario, status: 'em andamento' },
      include: { produto: true }, // Incluindo os dados dos produtos
    });

    if (carrinho.length === 0) {
      return { success: false, message: 'Carrinho vazio, adicione produtos antes de finalizar a compra.' };
    }

    // Processando a compra de cada item no carrinho
    const comprasFinalizadas = [];
    for (let item of carrinho) {
      const compra = await prisma.resumoCompra.create({
        data: {
          id_usuario,
          id_produto: item.produto,
          quantidade: quantidade,  // Supondo que estamos comprando 1 unidade de cada item
          preco_total: item.produto.preco, // Preço total do produto (considerando uma unidade)
          status: 'concluída', // Definindo como "concluída"
        },
      });

      // Remover item do carrinho após a compra
      await prisma.carrinho.delete({
        where: { id: item.id },
      });

      comprasFinalizadas.push(compra);
    }

    return { success: true, data: comprasFinalizadas };
  } catch (error) {
    console.error('Erro ao finalizar compra:', error);
    return { success: false, message: 'Erro ao finalizar compra' };
  }
}

module.exports = {
  finalizarCompra,
};
