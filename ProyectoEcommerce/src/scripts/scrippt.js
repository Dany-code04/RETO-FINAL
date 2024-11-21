const cartItemsContainer = document.querySelector(".cart-items"); 
const productCards = document.querySelectorAll(".product-card"); 
const subtotalElement = document.querySelector("#subtotal-amount");
const taxElement = document.querySelector("#tax-amount");
const totalElement = document.querySelector("#total-amount");

let cart = [];

function updateCart() {
    cartItemsContainer.innerHTML = "";

    let subtotal = 0;

    cart.forEach((item, index) => {
        const cartItem = document.createElement("li");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <span>${item.name}</span>
            <span>${item.price}</span>
            <input type="number" value="${item.quantity}" min="1" data-index="${index}">
            <button class="remove-item" data-index="${index}">Eliminar</button>
        `;

        subtotal += item.price * item.quantity;

        cartItemsContainer.appendChild(cartItem);
    });

    const tax = subtotal * 0.1; 
    const total = subtotal + tax;

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    taxElement.textContent = `$${tax.toFixed(2)}`;
    totalElement.textContent = `$${total.toFixed(2)}`;
}

function addToCart(product) {
    const existingProduct = cart.find(item => item.name === product.name);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push(product);
    }

    updateCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}

productCards.forEach(card => {
    const name = card.querySelector("h3").textContent;
    const priceText = card.querySelector(".price").textContent;
    const price = parseFloat(priceText.replace("$", "").replace(".", ""));

    card.querySelector("button").addEventListener("click", () => {
        addToCart({ name, price, quantity: 1 });
    });
});

cartItemsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
        const index = e.target.dataset.index;
        removeFromCart(index);
    }

    if (e.target.type === "number") {
        const index = e.target.dataset.index;
        const newQuantity = parseInt(e.target.value);
        cart[index].quantity = newQuantity > 0 ? newQuantity : 1;
        updateCart();
    }
});
