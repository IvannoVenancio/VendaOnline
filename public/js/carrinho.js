document.addEventListener('DOMContentLoaded', () => {
    const decreaseButtons = document.querySelectorAll('.qty button:first-child');
    const increaseButtons = document.querySelectorAll('.qty button:last-child');
    const quantityDisplays = document.querySelectorAll('.qty span');
    const totalPrices = document.querySelectorAll('.content tbody tr td:nth-child(4)'); // Preços totais

    decreaseButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            let quantity = parseInt(quantityDisplays[index].textContent);
            if (quantity > 1) {  // Impede a quantidade de ser menor que 1
                quantity--;
                quantityDisplays[index].textContent = quantity;
                updateTotalPrice(index, quantity);
            }
        });
    });

    increaseButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            let quantity = parseInt(quantityDisplays[index].textContent);
            quantity++;
            quantityDisplays[index].textContent = quantity;
            updateTotalPrice(index, quantity);
        });
    });

    function updateTotalPrice(index, quantity) {
        const price = parseInt(totalPrices[index].previousElementSibling.textContent.replace('kzs', '').trim());
        const newTotal = price * quantity;
        totalPrices[index].textContent = `${newTotal}kzs`;
        updateCartSummary();
    }

    function updateCartSummary() {
        let subtotal = 0;
        totalPrices.forEach((totalPrice) => {
            subtotal += parseInt(totalPrice.textContent.replace('kzs', '').trim());
        });
        document.querySelector('.box .info div span:nth-child(2)').textContent = `${subtotal}kzs`;
        document.querySelector('.box footer span:nth-child(2)').textContent = `${subtotal}kzs`;
        
    }
});
