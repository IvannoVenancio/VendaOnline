const {login} = require("../services/autenticacao");

exports.mostrarLogin = (req, res) => {
  res.render("login"); // Certifica-te de que tens um ficheiro login.handlebars
};


const { getUserByEmail } = require("../services/User");
exports.login = async (req, res) => {
    console.log("🚀 Rota /login foi chamada!");

    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.render('login', { error: 'Email e senha são obrigatórios.' });
        }

        const user = await getUserByEmail(email);
        console.log("👤 Usuário encontrado no banco:", user);
        
        if (!user || senha !== user.senha) { // Sem bcrypt
            return res.render('login', { error: "Usuário ou senha inválidos." });
        }

        console.log("Usuário antes de definir a sessão:", user);

        // ✅ Armazena o usuário na sessão
        req.session.user = { id: user.id, email: user.email, tipo_usuario: user.tipo_usuario.type };

        console.log("Sessão antes de salvar:", req.session);

        req.session.save(err => { 
            if (err) {
                console.error("Erro ao salvar sessão:", err);
                return res.render('login', { error: "Erro ao salvar sessão." });
            }
            console.log("Sessão Criada:", req.session);
            
            if (user.tipo_usuario === 1) {
                return res.redirect('/Paginainicial');
            } else if (user.tipo_usuario === 2) {
                return res.redirect('/PaginaInicialAdm');
            } else {
                return res.redirect('/home');
            }
        });
    } catch (error) {
        console.error("Erro ao fazer login:", error);
        return res.render('login', { error: 'Erro ao fazer login', layout: "cadastroLogin" });
    }
};





exports.logout = (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Erro ao fazer logout:", err);
        return res.redirect("/login"); // Se der erro, volta para a dashboard
      }
      res.redirect("/login"); // Redireciona para a página de login
    });
  };
  


