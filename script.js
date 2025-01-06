document.addEventListener("DOMContentLoaded", () => {
    const cartButton = document.getElementById("view-cart");
    const cartModal = document.getElementById("cart-modal");
    const closeCartButton = document.getElementById("close-cart");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalContainer = document.getElementById("cart-total");
    const notification = document.getElementById("notification");


    cartButton.addEventListener("click", () => {
        cartModal.style.display = "flex";
        renderCart();
    });

    closeCartButton.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    function renderCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        cart = cart.filter(item => item && item.id && item.name && item.price && item.quantity > 0);

        if (cart.length === 0) {
            localStorage.removeItem("cart");
        }

        cartItemsContainer.innerHTML = ""; 

        let total = 0;

        cart.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `
                <p>${item.name} - $${item.price} x 
                    <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
                </p>
                <button class="btn-remove" data-id="${item.id}">Eliminar</button>
            `;
            cartItemsContainer.appendChild(div);
            total += item.price * item.quantity;
        });

        cartTotalContainer.innerHTML = `Total: $${total}`;

        const removeButtons = document.querySelectorAll(".btn-remove");
        removeButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                const id = event.target.getAttribute("data-id");
                removeFromCart(id);
            });
        });

        const quantityInputs = document.querySelectorAll(".quantity-input");
        quantityInputs.forEach(input => {
            input.addEventListener("change", (event) => {
                const id = event.target.getAttribute("data-id");
                const quantity = parseInt(event.target.value);
                updateQuantity(id, quantity);
            });
        });
    }

    function removeFromCart(id) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart = cart.filter(item => item.id !== parseInt(id));
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }

    function updateQuantity(id, quantity) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const item = cart.find(item => item.id === parseInt(id)); 
        if (item) {
            item.quantity = quantity;
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        }
    }

    renderCart();
});

    document.getElementById("contact-form").addEventListener("submit", function(event) {
        event.preventDefault(); 
        
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;

        if (name && email) {
            console.log("Todos los campos están completos.");
            this.submit(); 
        } else {
            console.log("Faltan campos por completar.");
        }
    });

document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: 1, name: "Halo Reach", price: 500 },
        { id: 2, name: "Free Fire", price: 500 },
        { id: 3, name: "Clash Royale", price: 500 },
        { id: 4, name: "Cyberpunk", price: 500 },
        { id: 5, name: "Fortnite", price: 500 },
        { id: 6, name: "Gear of war", price: 500 }
    ];

    console.log("Lista de productos disponibles:");
    products.forEach(product => {
        console.log(`ID: ${product.id}, Nombre: ${product.name}, Precio: $${product.price}`);
    });

     productList.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") {
            const productId = parseInt(event.target.getAttribute("data-id"));
            const product = products.find(p => p.id === productId);

            if (product) {
                cart.push(product);
                totalPrice += product.price;

                const cartItem = document.createElement("li");
                cartItem.textContent = `${product.name} - $${product.price}`;
                cartList.appendChild(cartItem);

                totalPriceEl.textContent = `Total: $${totalPrice}`;
            }
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const products = [
        { id: 1, name: "Halo Reach", price: 500, description: "Un juego épico de la saga Halo." },
        { id: 2, name: "Free Fire", price: 500, description: "Battle Royale con acción intensa." },
        { id: 3, name: "Clash Royale", price: 500, description: "Estrategia en tiempo real." },
        { id: 4, name: "Cyberpunk", price: 500, description: "Un mundo abierto futurista." },
        { id: 5, name: "Fortnite", price: 500, description: "El popular juego de Battle Royale." },
        { id: 6, name: "Gear of War", price: 500, description: "Acción y estrategia combinadas." }
    ];

    const productContent = document.querySelector(".product-content");
const cart = JSON.parse(localStorage.getItem("cart")) || []; // Carrito almacenado en localStorage

products.forEach(product => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("product-1");
    productDiv.setAttribute("data-id", product.id);

    productDiv.innerHTML = `
        <div class="card product-1">
        <img src="img/l${product.id}.jpg" alt="${product.name}">
        <div class="product-txt">
            <h3>${product.name}</h3>
            <p class="description" style="display: none;">${product.description}</p>
            <div class="price">
                <p>$${product.price}</p>
                <button class="btn-2 add-to-cart" data-id="${product.id}">Comprar</button>
            </div>
        </div>
    `;
    const addToCartButton = productDiv.querySelector(".add-to-cart");
    addToCartButton.addEventListener("click", () => {
        addToCart(product);
    });

    productDiv.addEventListener("click", (event) => {
        if (!event.target.classList.contains("add-to-cart")) {
            const description = productDiv.querySelector(".description");
            description.style.display = description.style.display === "none" ? "block" : "none";
        }
    });

    productContent.appendChild(productDiv);
});
function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);

    if (existingProduct) {
        existingProduct.quantity += 1; 
    } else {
        cart.push({ ...product, quantity: 1 }); 
    }
    localStorage.setItem("cart", JSON.stringify(cart)); 
    alert(`"${product.name}" se ha agregado al carrito.`);
}
});