document.addEventListener("DOMContentLoaded", () => {
    const cartButton = document.getElementById("view-cart");
    const cartModal = document.getElementById("cart-modal");
    const closeCartButton = document.getElementById("close-cart");
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotalContainer = document.getElementById("cart-total");
    const addToCartButtons = document.querySelectorAll(".btn-2");
    const notification = document.getElementById("notification");


    cartButton.addEventListener("click", () => {
        cartModal.style.display = "flex";
        renderCart();
    });


    closeCartButton.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

   
    addToCartButtons.forEach(button => {
        button.addEventListener("click", (event) => {
            const productElement = event.target.closest(".product-1");
            const name = productElement.querySelector("h3").textContent;
            const price = parseFloat(productElement.querySelector(".price p").textContent.replace("$", ""));
            const id = productElement.dataset.id; 

            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {

                existingItem.quantity += 1;
            } else {

                cart.push({ id, name, price, quantity: 1 });
            }


            localStorage.setItem("cart", JSON.stringify(cart));


            showNotification(`${name} agregado al carrito`);

            renderCart(); 
        });
    });

    function renderCart() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartItemsContainer.innerHTML = ""; 

        let total = 0;

        cart.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML = `
                <p>${item.name} - $${item.price} x 
                    <input type="number" value="${item.quantity || 1}" min="1" class="quantity-input" data-id="${item.id}">

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
        cart = cart.filter(item => item.id !== id);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart(); // Actualizar carrito
    }

    function updateQuantity(id, quantity) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const item = cart.find(item => item.id === id);
        if (item) {
            item.quantity = quantity;
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart(); 
        }
    }
    function showNotification(message) {
        notification.textContent = message;
        notification.style.display = "block";
        setTimeout(() => {
            notification.style.display = "none";
        }, 3000); 
    }

    renderCart();
});

document.addEventListener("DOMContentLoaded", function() {
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

    
    const productListContainer = document.getElementById("product-list");
    const ul = document.createElement("ul");

    products.forEach(product => {
        const li = document.createElement("li");
        li.textContent = `${product.name} - $${product.price}`;
        ul.appendChild(li);
    });

    productListContainer.appendChild(ul);
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
                    <button class="btn-2 add-to-cart">Comprar</button>
                </div>
            </div>
        `;
        productDiv.addEventListener("click", (event) => {
            if (!event.target.classList.contains("add-to-cart")) {
                const description = productDiv.querySelector(".description");
                description.style.display = description.style.display === "none" ? "block" : "none";
            }
        });

        productContent.appendChild(productDiv);
    });
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItemsContainer = document.getElementById("cart-items");
    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", (event) => {
            event.stopPropagation(); 
            const productElement = event.target.closest(".product-1");
            const id = productElement.getAttribute("data-id");
            const name = productElement.querySelector("h3").textContent;
            const price = parseFloat(productElement.querySelector(".price p").textContent.replace("$", ""));
            const existingItem = cart.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({ id, name, price, quantity: 1 });
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            renderCart();
        });
    });


    function renderCart() {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartItemsContainer.innerHTML = "";
        cart.forEach(item => {
            const div = document.createElement("div");
            div.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
            cartItemsContainer.appendChild(div);
        });
    }
    renderCart(); 
});
