const { findAllCategoryTypes } = require("../services/Categoria")
const { createProduct, getAllProducts, getProdByCategory, getProductsByIdCategoria, VerDetalhes, editarProductForm , deletarProduto,atualizarProduto, deleteProduct, getProductById, updateProduct, VerDetalhesEdit, getProdByIdCategory} = require("../services/Produto")

exports.cadastroproduto = async(req, res)=>{
    try {
      
        res.render('cadastroproduto', {layout:"main3"})
    } catch (error) {
        console.log(error)
    }
}

exports.view = async(req, res) =>{
    try {
        const produto = await getAllProducts()
        const tipoCategoria = await findAllCategoryTypes()
       // Converte a imagem para base64 para exibir no front-end
      // Converte as imagens em binário para Base64 para exibição
    const produtosComImagemBase64 = produto.map((produto) => ({
        ...produto,
        imagemBase64: produto.imagem ? produto.imagem.toString('base64') : null,
      }));
        res.render('cadastroproduto', {produto, tipoCategoria, produto:produtosComImagemBase64 })        
    } catch (error) {
        console.log("error:::", error)
    }
}

exports.create = async (req, res) => {
  try {
    const { nome_produto, descricao, preco, quantidade, detalhes, tipoCategoriaId } = req.body;
    const imagem = req.file ? `/img/${req.file.filename}` : null; // Caminho da imagem

    const data = {
      nome_produto,
      descricao,
      preco,
      quantidade,
      detalhes,
      tipoCategoriaId,
      imagem,
    };

    await createProduct(data);
    res.redirect('/cadastroproduto');
  } catch (error) {
    console.error("Erro ao cadastrar produto:", error);
    res.status(500).send("Erro ao cadastrar produto.");
  }
};

exports.prodByCategoria = async(req, res) =>{
    try {
        const idCategoria = Number(req.params.id_categoria)
        console.log("idCategoria>>>", idCategoria)
        const produtos = await getProductsByIdCategoria(idCategoria)
        console.log("produtos>>>>", produtos)
        res.render('prodByCategoria', {layout:'main2', produtos})
        
    } catch (error) {
        console.log("error:::", error)
    }
}

exports.getProdByCategory = async(req, res) =>{
    try {
        const idCategoria = Number(req.params.id_categoria)
        const produtos = await getProdByCategory(idCategoria)
        console.log("Produtos::::i", produtos )
       
        res.render('produtos', {layout:'produtos', produtos})
        
    } catch (error) {
        console.log("error:::", error)
    }
}

exports.VerDetalhes = async(req, res) =>{
    try {
        const Detalhes = Number(req.params.detalhes)
        const produtos = await VerDetalhes(Detalhes)
        console.log("Detalhes::::", produtos )
       
        res.render('detalhes', {layout:'main', produtos, Detalhes})
        
    } catch (error) {
        console.log("error:::", error)
    }
}

exports.VerDetalhesEdit = async (req, res) => {
  try {
      const detalhesId = req.params.detalhes; // Aqui é onde o parâmetro 'detalhes' é capturado
      if (!detalhesId) {
          return res.status(400).send('ID do produto não fornecido');
      }

      const produto = await produto.findUnique({
          where: {
              id: Number(detalhesId) // Certifique-se de que detalhesId é um número
          }
      });

      if (!produto) {
          return res.status(404).send('Produto não encontrado');
      }

      console.log("Detalhes:::1", produto); // Verifique no console
      res.render('detalhes', { layout: 'main', produto });

  } catch (error) {
      console.log("error:::", error); // Log do erro para depuração
      res.status(500).send('Erro interno do servidor');
  }
};


exports.detalhesEditar = async(req, res)=>{
  try {
      res.render('detalhesEditar')
  } catch (error) {
      console.log(error)
  }
}





// // Mostrar formulário de edição
// exports.showEditForm = async (req, res) => {
//   try {
//       const { id } = req.params;
//       const produto = await getProductById(id); // Busca o produto pelo ID

//       if (!produto) {
//           return res.status(404).send("Produto não encontrado.");
//       }

//       res.render('atualizarProduto', { produto });
//   } catch (error) {
//       console.error("Erro ao carregar formulário de edição:", error);
//       res.status(500).send("Erro ao carregar formulário de edição.");
//   }
// };

exports.showEditForm = async (req, res) => {
  try {
      const { id } = req.params;
      const produto = await editarProductForm(id); // Corrigido

      if (!produto) {
          return res.status(404).send("Produto não encontrado.");
      }

      res.render('atualizarProduto', { produto, layout:"cadastroLogin" });
  } catch (error) {
      console.error("Erro ao carregar formulário de edição:", error);
      res.status(500).send("Erro ao carregar formulário de edição.");
  }
};




// Atualizar produto
exports.updateProduct = async (req, res) => {
  try {
      const { id } = req.params;
      console.log("ID recebido:", id); // 🔍 Verifica se o ID está correto

    const { nome_produto, preco, descricao, quantidade, detalhes, tipoCategoriaId } = req.body;
    //const imagePath = req.file ? `/img/${req.file.filename}` : null;

      const precoFloat = parseFloat(preco);
      const quantidadeInt = parseInt(quantidade, 10);

      if (isNaN(precoFloat) || isNaN(quantidadeInt)) {
          return res.status(400).send("Preço ou quantidade inválidos.");
      }

      await updateProduct(id, {
          nome_produto,
          preco: precoFloat,
          descricao,
          quantidade: quantidadeInt,
          detalhes,
          tipoCategoriaId,
      });

      res.redirect('/categoria');

    await updateProduct(id, {
        nome_produto,
        preco: precoFloat,
        descricao,
        quantidade: quantidadeInt,
        detalhes,
        tipoCategoriaId,
        //imagem: imagePath,
    });
    res.redirect('/produtos');
  } catch (error) {
      console.error("Erro ao atualizar produto:", error);
      res.status(500).send("Erro ao atualizar produto.");
  }
};




// Deletar produto
exports.deleteProduct = async (req, res) => {
  try {
      const { id } = req.params;
      await deleteProduct(id); // Deleta o produto pelo ID
      res.redirect('/categoria');
  } catch (error) {
      console.error("Erro ao deletar produto:", error);
      res.status(500).send("Erro ao deletar produto.");
  }
};

 
exports.getProdByCategory = async(req, res) =>{
    try {
        const idCategoria = Number(req.params.id_categoria)
        const produtos = await getProdByCategory(idCategoria)
        console.log("Produtos2::::io", produtos )
       
        res.render('produtos', {layout:'main', produtos})
        
    } catch (error) {
        console.log("error:::", error)
    }
}
  

exports.detalhes = async(req, res)=>{
    try {
        res.render('detalhes')
    } catch (error) {
        console.log(error)
    }
}

exports.getProdByIdCategory = async (req, res) => {
  try {
    // Extrai e valida o parâmetro da rota
    const idCategoria = Number(req.params.tipoCategoriaId);
    if (isNaN(idCategoria)) {
      return res.status(400).send('O ID da categoria deve ser um número válido.');
    }

    // Chama o serviço para obter os produtos
    const produtos = await getProdByIdCategory(idCategoria);

    // Verifica se há produtos retornados
    if (!produtos || produtos.length === 0) {
      return res.status(404).send('Nenhum produto encontrado para a categoria especificada.');
    }

    console.log('Produtos encontrados:', produtos);

    // Renderiza a página com os produtos encontrados
    res.render('produtoAndCard', { layout: 'produtos', produtos });
  } catch (error) {
    console.error('Erro ao obter produtos por categoria:', error);

    // Retorna uma resposta adequada em caso de erro
    res.status(500).send('Erro ao obter produtos. Tente novamente mais tarde.');
  }
};



exports.produtoAndCard = async(req, res)=>{
  try {
      const produto = await getAllProducts()

      res.render('produtoAndCard', {layout:'produtos', produto})
  } catch (error) {
      console.log(error)
  }
}



exports.produtoAndCard = async(req, res)=>{
  try {
      const produto = await getAllProducts()

      res.render('produtoAndCard', {layout:'produtos', produto})
  } catch (error) {
      console.log(error)
  }
}


exports.categoria = async(req, res)=>{
    try {
        const tipoCategoria = await findAllCategoryTypes()

        res.render('categoria', {layout:'',tipoCategoria })
    } catch (error) {
        console.log(error)
    }
}

exports.produtos = async(req, res)=>{
    try {
        const produto = await getAllProducts()

        res.render('produtos', {layout:'', produto})
    } catch (error) {
        console.log(error)
    }
}

exports.computer = async(req, res)=>{
    try {
        res.render('computer', {layout:''})
    } catch (error) {
        console.log(error)
    }
}



const mostrarFormularioEdicao = async (req, res) => {
    const { id } = req.params;
    try {
      const produto = await produto.findUnique({
        where: { id: parseInt(id) },
      });
  
      if (!produto) {
        return res.status(404).send('Produto não encontrado.');
      }
  
      res.render('atualizarProduto', { produto });
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao carregar o produto.');
    }
  };
  
  exports.atualizarProduto = async (req, res) => {
    const produtos = await getAllProducts(); // Busca todos os produtos atualizados
    const produto = await atualizarProduto(); // Busca todos os produtos atualizados


    const { id } = req.params;
    const { nome_produto, preco, quantidade, descricao, detalhes  } = req.body;
  
    try {
      await produtos.update({
        where: { id: parseInt(id) },
        data: { nome_produto, preco: parseFloat(preco), quantidade, descricao,detalhes ,

         },
      });
  
      res.redirect('/categoria', {produto, produtos}); // Redireciona para a lista de produtos
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao atualizar o produto.');
    }
  };

 
  exports.deletarProduto = async (req, res) => {

    const produto = await getAllProducts(); // Busca todos os produtos atualizados
    const produtos = await deletarProduto(); // Busca todos os produtos atualizados


    const { id } = req.params;
  
    try {
      await produto.delete({
        where: { id: parseInt(id) },
      });
  
      res.redirect('/produtos' ,{produto, produtos}); // Redireciona para a lista de produtos
    } catch (error) {
      console.error(error);
      res.status(500).send('Erro ao deletar o produto.');
    }
  };

  // Função para buscar todos os produtos e renderizar a página
 exports.getAllProducts = async (req, res) => {
  try {
    const produtos = await produtos.findMany(); // Supondo que a tabela seja "produto"
    res.render('/produtos2', { produtos }); // Renderiza a view 'produtos2' com os produtos
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    res.status(500).send('Erro ao buscar produtos');
  }
};

// Função para buscar um produto pelo ID e renderizar a página
 exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const produtos = await produtos.findUnique({
      where: { id: Number(id) }, // Ajuste o tipo de ID caso necessário
    });

    if (!product) {
      return res.status(404).send('Produto não encontrado');
    }

    res.render('produtos2/detalhes', { produtos }); // Renderiza a view 'produto2 com o produto
  } catch (error) {
    console.error('Erro ao buscar produto por ID:', error);
    res.status(500).send('Erro ao buscar produto');
  }
};

exports.getMenu = async (req, res) => {
  try {
    // Supondo que o 'id' da categoria seja obtido via parâmetros ou outra fonte
    const idCategoria = parseInt(req.params.id, 10); // Exemplo de como obter o ID de categoria

    const todascategorias = await getProductById(idCategoria); // Agora passando o id corretamente

    // Obtendo as categorias do banco de dados
    const categorias = await prisma.tipoCategoria.findMany({
      select: {
        id: true,
        tipo_categoria: true,
      },
    });

    // Renderizando a página com as categorias e os produtos
    res.render('produtoAndCard', { todascategorias, categorias });
  } catch (error) {
    console.error('Erro ao buscar menu:', error);
    res.status(500).send('Erro interno no servidor');
  }
};



exports.categoria = async(req, res) => {
  try {
      const tipoCategoria = await findAllCategoryTypes();
      console.log(tipoCategoria);  // Verifique o conteúdo aqui
      res.render('categoria', {layout: '', tipoCategoria});
  } catch (error) {
      console.log(error);
  }
}
