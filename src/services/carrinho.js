
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()


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
}





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


