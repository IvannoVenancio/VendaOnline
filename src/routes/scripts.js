document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".remover").forEach(botao => {
        botao.addEventListener("click", () => {
            fetch(`/carrinho/remover/${botao.dataset.id}`, { method: "DELETE" })
                .then(() => location.reload());
        });
    });
});
