const {  getCart, adicionarProdutoAoCarrinho,listCartItems, visualizarCarrinho, atualizarProdutoNoCarrinho, removerProdutoDoCarrinho, finalizarCompra,
} = require ("../services/carrinho.js"); 




// // Visualizar carrinho
// exports.visualizarCarrinho = async (req, res) => {
//     try {
//         const { id_usuario } = req.params; // Obtém o id do usuário da URL
//         const result = await visualizarCarrinho(id_usuario); // Chama o serviço para pegar os itens do carrinho

//         if (!result.success || result.data.length === 0) {
//             // Se o carrinho estiver vazio ou houve um erro, renderiza com mensagem de carrinho vazio
//             return res.render('carrinho', { mensagem: 'Carrinho vazio' });
//         }

//         // Renderiza a página do carrinho com os itens
//         return res.render('carrinho', { carrinho: result.data });
//     } catch (error) {
//         console.error('Erro no controlador ao visualizar carrinho:', error);
//         return res.status(500).json({ message: 'Erro interno no servidor' });
//     }
// };

// // Adicionar produto ao carrinho
// exports.adicionarProdutoAoCarrinho = async (req, res) => {
//     try {
//         const { id_usuario, id_produto, quantidade } = req.body;
//         const result = await adicionarProdutoAoCarrinho(id_usuario, id_produto, quantidade);

//         if (!result.success) {
//             return res.status(400).json({ message: result.message });
//         }

//         return res.status(201).json({ message: result.message });
//     } catch (error) {
//         console.error('Erro no controlador ao adicionar produto ao carrinho:', error);
//         return res.status(500).json({ message: 'Erro interno no servidor' });
//     }
// };

// Atualizar produto no carrinho
exports.atualizarProdutoNoCarrinho = async (req, res) => {
    try {
        const { id_usuario, id_produto, novaQuantidade } = req.body;
        const result = await atualizarProdutoNoCarrinho(id_usuario, id_produto, novaQuantidade);

        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }

        return res.status(200).json({ message: result.message });
    } catch (error) {
        console.error('Erro no controlador ao atualizar produto no carrinho:', error);
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }
};

// Remover produto do carrinho
exports.removerProdutoDoCarrinho = async (req, res) => {
    try {
        const { id_usuario, id_produto } = req.body;
        const result = await removerProdutoDoCarrinho(id_usuario, id_produto);

        if (!result.success) {
            return res.status(404).json({ message: result.message });
        }

        return res.status(200).json({ message: result.message });
    } catch (error) {
        console.error('Erro no controlador ao remover produto do carrinho:', error);
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }
};

// Finalizar compra
exports.finalizarCompra = async (req, res) => {
    try {
        const { id_usuario } = req.body;
        const result = await finalizarCompra(id_usuario);

        if (!result.success) {
            return res.status(400).json({ message: result.message });
        }

        return res.status(200).json({ message: result.message });
    } catch (error) {
        console.error('Erro no controlador ao finalizar compra:', error);
        return res.status(500).json({ message: 'Erro interno no servidor' });
    }
};


const CarrinhoService = require('../services/carrinho.js');

// Visualizar o carrinho do usuário
exports.visualizarCarrinho = async (req, res) => {
    try {
        const { id_usuario } = req.session;  // Assumindo que o ID do usuário está na sessão

        const result = await CarrinhoService.getCart(id_usuario);

        if (result.success) {
            // Renderizando o carrinho com os itens e o total
            res.render('carrinho', {
                carrinho: result.data,
                total: result.data.reduce((sum, item) => sum + item.total, 0), // Calculando o total do carrinho
            });
        } else {
            res.render('carrinho', { mensagem: 'Carrinho vazio' });
        }
    } catch (error) {
        console.error('Erro ao visualizar carrinho:', error);
        res.status(500).json({ success: false, message: 'Erro ao visualizar carrinho' });
    }
};

// Adicionar produto ao carrinho
exports.adicionarProdutoAoCarrinho = async (req, res) => {
    const { id_usuario } = req.session;  // Assumindo que o ID do usuário está armazenado na sessão
    const { id_produto, quantidade } = req.body;

    try {
        const result = await CarrinhoService.addToCart(id_usuario, id_produto, quantidade);

        if (result.success) {
            return res.redirect('/carrinho');  // Redireciona para a página do carrinho
        } else {
            return res.status(400).json({ message: result.message });
        }
    } catch (error) {
        console.error('Erro ao adicionar ao carrinho:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
};


