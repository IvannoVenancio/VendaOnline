const AdminService = require("../services/admin");


exports.getAllCarts = async (req, res) => {
    try {
      const carrinhos = await AdminService.fetchAllCarts();
      res.render("admin/carrinhoAdm", { carrinhos });
    } catch (error) {
      console.error("Erro ao buscar carrinhos:", error);
      res.status(500).send("Erro ao buscar carrinhos.");
    }
  };
  
  exports.getAllSummaries = async (req, res) => {
    try {
      const resumos = await AdminService.fetchAllSummaries();
      res.render("admin/resumosComprasAdm", { resumos });
    } catch (error) {
      console.error("Erro ao buscar resumos de compras:", error);
      res.status(500).send("Erro ao buscar resumos.");
    }
  };
  
  exports.getAllProfiles = async (req, res) => {
    try {
      const perfis = await AdminService.fetchAllProfiles();
      res.render("admin/perfisTodos", { perfis });
    } catch (error) {
      console.error("Erro ao buscar perfis:", error);
      res.status(500).send("Erro ao buscar perfis.");
    }
  };