const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const {
    adicionarProdutoAoCarrinho,
    atualizarProdutoNoCarrinho,
    removerProdutoDoCarrinho,
    eliminarCarrinho,
    finalizarCompra,
    obterCarrinhoPorUsuario,
    obterTodosOsCarrinhos,
    obterTodosOsResumos,
    obterProdutos
} = require('../services/carrinho');

const { getAllProducts } = require('../services/Produto');

const carrinho = require('../services/carrinho'); // Importa corretamente os serviços
const { produtos } = require('./ProdutoController');

exports.adicionarProdutoAoCarrinho = async (req, res) => {
    try {
        console.log("Sessão ativa:", req.session); // Testa se a sessão está ativa
        if (!req.session.user) {
            return res.status(401).json({ success: false, message: "Utilizador não autenticado" });
        }

        const { id_produto, quantidade } = req.body;
        const id_usuario = req.session.user.id; // Obtém o ID da sessão

        const result = await adicionarProdutoAoCarrinho(id_usuario, id_produto, quantidade);
        return res.json(result);
    } catch (error) {
        console.error("Erro ao adicionar produto ao carrinho:", error);
        return res.status(500).json({ success: false, message: "Erro interno do servidor" });
    }
};


exports.atualizarProdutoNoCarrinho = async (req, res) => {
    try {
        const { id, quantidade } = req.body;

        if (quantidade < 1) {
            return res.redirect('/carrinho'); // Redireciona sem atualizar
        }

        await atualizarProdutoNoCarrinho(id, quantidade);

        return res.redirect('/carrinho'); 
    } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        return res.status(500).send("Erro interno ao atualizar produto.");
    }
};



exports.removerProdutoDoCarrinho = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.redirect('/carrinho'); // Garante que não remove tudo se o ID for inválido
        }

        await removerProdutoDoCarrinho(Number(id));

        return res.redirect('/carrinho'); // Redireciona de volta ao carrinho após remover
    } catch (error) {
        console.error("Erro ao remover produto:", error);
        return res.status(500).send("Erro interno ao remover produto.");
    }
};




exports.eliminarCarrinho = async (req, res) => {
    try {
        const id_usuario = req.session.user.id; // ID do usuário logado

        const result = await eliminarCarrinho(id_usuario);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Erro interno do servidor 4" });
    }
};


exports.finalizarCompra = async (req, res, next) => {
    if (!req.session.user || !req.session.user.id) {
        return res.redirect("/login"); // 🔄 Redireciona para login se não estiver autenticado
    }

    try {
        const id_usuario = req.session.user.id;
        const resultado = await finalizarCompra(id_usuario);

        if (resultado.success) {
            return res.redirect("/pagamento");
        } else {
            return res.render("carrinho", { mensagem: "Erro ao finalizar a compra." });
        }
    } catch (error) {
        console.error("Erro ao finalizar compra:", error);
        next(error);
    }
};


exports.resumoCompras = async (req, res) => {
    if (!req.session.user || !req.session.user.id) {
        return res.redirect('/login');
    }

    const id_usuario = req.session.user.id;

    // 🔥 Simula compras finalizadas (deves armazená-las na base de dados mais tarde)
    const comprasFinalizadas = await prisma.compra.findMany({ where: { id_usuario } });

    const comprasFormatadas = comprasFinalizadas.map(item => ({
        nome_produto: item.produto?.nome_produto || "Produto não encontrado",
        preco: item.produto?.preco || 0,
        quantidade: item.quantidade,
        subtotal: item.quantidade * (item.produto?.preco || 0)
    }));

    res.render('resumocompras', {
        compras: comprasFormatadas,
        total: comprasFormatadas.reduce((acc, item) => acc + item.subtotal, 0)
    });
};


exports.obterCarrinhoPorUsuario = async (req, res) => {
    try {
        const id_usuario = req.session.userId;

        const result = await obterCarrinhoPorUsuario(id_usuario);
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Erro interno do servidor 6" });
    }
};




exports.obterTodosOsCarrinhos = async (req, res) => {
    try {
        const result = await obterTodosOsCarrinhos();
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Erro interno do servidor 8" });
    }
};

exports.obterTodosOsResumos = async (req, res) => {
    try {
        const result = await obterTodosOsResumos();
        return res.json(result);
    } catch (error) {
        return res.status(500).json({ success: false, message: "Erro interno do servidor 9" });
    }
};

exports.renderizarCarrinho = async (req, res) => {
    try {
        const id_usuario = req.user.id;
        const result = await obterCarrinhoPorUsuario(id_usuario);

        if (!result || result.length === 0) {
            return res.render("carrinho", { produtos: [], mensagem: "O carrinho está vazio." });
        }

        res.render("carrinho", { produtos: result });
    } catch (error) {
        res.status(500).json({ success: false, message: "Erro interno do servidor 10" });
    }
};

exports.carrinho = async (req, res, next) => {
    console.log('Rota acedida');

    if (!req.session.user || !req.session.user.id) {
        return res.status(401).json({ success: false, message: "Usuário não autenticado" });
    }

    try {
        const id_usuario = req.session.user.id;
        const resultado = await obterCarrinhoPorUsuario(id_usuario);

        if (!resultado.success) {
            return res.render('carrinho', { carrinho: [], mensagem: "O carrinho está vazio." });
        }

        // Formatar os produtos corretamente
        const carrinhoFormatado = resultado.data.map(item => ({
            id: item.id,
            nome_produto: item.produto?.nome_produto || 'Produto não encontrado',
            preco: item.produto?.preco || 0,
            quantidade: item.quantidade,
            subtotal: item.quantidade * (item.produto?.preco || 0), // Corrige o subtotal
            imagem: item.produto?.imagem || "default.png" // Corrige a imagem
        }));

        console.log('Carrinho carregado formatado:', carrinhoFormatado);

        res.render('carrinho', {
            carrinho: carrinhoFormatado,
            total: carrinhoFormatado.reduce((acc, item) => acc + item.subtotal, 0) // Corrige o total
        });        
    } catch (err) {
        console.error('Erro ao carregar carrinho:', err);
        next(err);
    }
};


exports.atualizarQuantidadeProduto = async (req, res) => {
    const { id, acao } = req.body;

    try {
        const itemCarrinho = await prisma.carrinho.findUnique({ where: { id } });

        if (!itemCarrinho) {
            return res.json({ success: false, message: "Produto não encontrado no carrinho." });
        }

        let novaQuantidade = acao === 'aumentar' ? itemCarrinho.quantidade + 1 : itemCarrinho.quantidade - 1;

        if (novaQuantidade < 1) {
            return res.json({ success: false, message: "Quantidade inválida." });
        }

        const produto = await prisma.produto.findUnique({ where: { id: itemCarrinho.produto_id } });
        const novoSubtotal = novaQuantidade * (produto?.preco || 0);

        await prisma.carrinho.update({
            where: { id },
            data: { quantidade: novaQuantidade }
        });

        // Recalcular total do carrinho
        const carrinho = await prisma.carrinho.findMany({ where: { id_usuario: itemCarrinho.id_usuario } });
        const total = carrinho.reduce((acc, item) => acc + (item.quantidade * produto?.preco), 0);

        res.json({ success: true, novaQuantidade, novoSubtotal, total });
    } catch (error) {
        console.error("Erro ao atualizar quantidade:", error);
        res.json({ success: false, message: "Erro interno do servidor." });
    }
};

exports.pagamento = async(req, res)=>{
    try {
        res.render('pagamento')
    } catch (error) {
        console.log(error)
    }
}

exports.pagamentoEfetuado = async (req, res) => {
    try {
        if (!req.session.user || !req.session.user.id) {
            return res.redirect('/login');
        }

        res.render('pagamentoEfetuado', { layout: 'main3', userName: req.session.user.name });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro interno no servidor');
    }
};
