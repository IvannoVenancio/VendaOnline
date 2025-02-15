const fetchAllCarts = async () => {
    return await prisma.carrinho.findMany({
      include: { user: true, itens: true },
    });
  };
  
  const fetchAllSummaries = async () => {
    return await prisma.resumoCompras.findMany({
      include: { user: true, produtos: true },
    });
  };
  
  const fetchAllProfiles = async () => {
    return await prisma.user.findMany({
      include: { perfil: true },
    });
  };