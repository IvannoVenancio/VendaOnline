

document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".alterar-quantidade").forEach((button) => {
        button.addEventListener("click", async function () {
            const id = this.dataset.id;
            const acao = this.dataset.acao;

            try {
                const resposta = await fetch("/carrinho/atualizar", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ id, acao }),
                });

                const resultado = await resposta.json();
                if (resultado.success) {
                    location.reload(); // 🔄 Atualiza a página para refletir mudanças
                } else {
                    alert("Erro ao atualizar a quantidade.");
                }
            } catch (error) {
                console.error("Erro ao atualizar o carrinho:", error);
            }
        });
    });
});
