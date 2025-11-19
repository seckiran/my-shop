// Our product data (this acts like a tiny database)
const products = [
    { id: 1, name: "Cool T-Shirt", price: 19.99, image: "https://source.unsplash.com/random/300x300/?tshirt" },
    { id: 2, name: "Awesome Hoodie", price: 49.99, image: "https://source.unsplash.com/random/300x300/?hoodie" },
    { id: 3, name: "Funny Cap", price: 14.99, image: "https://source.unsplash.com/random/300x300/?cap" },
    { id: 4, name: "Cozy Socks", price: 9.99, image: "https://source.unsplash.com/random/300x300/?socks" },
    { id: 5, name: "Stylish Jacket", price: 89.99, image: "https://source.unsplash.com/random/300x300/?jacket" },
    { id: 6, name: "Classic Jeans", price: 59.99, image: "https://source.unsplash.com/random/300x300/?jeans" }
];

// Cart array (starts empty)
let cart = [];

// DOM elements
const productList = document.getElementById('product-list');
const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const cartModal = document.getElementById('cart-modal');
const closeBtn = document.querySelector('.close');
const checkoutBtn = document.getElementById('checkout-btn');

// Display products
function displayProducts() {
    products.forEach(product => {
        const div = document.createElement('div');
        div.classList.add('product');
        div.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>$${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(div);
    });
}

displayProducts();
// Add to cart function
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartDisplay();
}

// Update cart count and total
function updateCartDisplay() {
    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update cart modal content
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        const div = document.createElement('div');
        div.classList.add('cart-item');
        div.innerHTML = `
            <span>${item.name} × ${item.quantity}</span>
            <span>$${(item.price * item.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart(${item.id})">Remove</button>
        `;
        cartItems.appendChild(div);
    });

    cartTotal.textContent = total.toFixed(2);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
}

// Open cart when clicking the cart icon
document.querySelector('.cart-icon').addEventListener('click', () => {
    cartModal.classList.remove('hidden');
    updateCartDisplay();
});

// Close modal
closeBtn.addEventListener('click', () => {
    cartModal.classList.add('hidden');
});

// Close when clicking outside
cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) cartModal.classList.add('hidden');
});

// Fake checkout
checkoutBtn.addEventListener('click', () => {
    alert(`Thank you! Total: $${cartTotal.textContent} (This is just a demo!)`);
    cart = [];
    updateCartDisplay();
    cartModal.classList.add('hidden');
});