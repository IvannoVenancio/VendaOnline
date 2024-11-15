// Exemplo de itens do carrinho de compras
const products = [
    { id: 1, name: "Smartphone XYZ", price: 1500.00 },
    { id: 2, name: "Notebook ABC", price: 3500.00 },
    { id: 3, name: "Fone de ouvido XYZ", price: 250.00 }
];

// Função para calcular o total do carrinho
function calculateTotal(cart) {
    let total = 0;
    cart.forEach(item => total += item.price);
    return total;
}

// Função para renderizar os itens no carrinho
function renderCartItems(cart) {
    const cartItemsDiv = document.getElementById("cartItems");
    cartItemsDiv.innerHTML = ""; // Limpa os itens antigos

    cart.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <span>${item.name}</span>
            <span>R$ ${item.price.toFixed(2)}</span>
        `;
        cartItemsDiv.appendChild(div);
    });

    const totalPrice = calculateTotal(cart);
    document.getElementById("totalPrice").textContent = totalPrice.toFixed(2);
}

// Função para inicializar o carrinho
function initializeCart() {
    renderCartItems(products);
}

// Finalizar compra
document.getElementById("checkoutBtn").addEventListener("click", function() {
    alert("Compra finalizada com sucesso!");
});

// Inicializar carrinho quando a página carregar
window.onload = initializeCart;
