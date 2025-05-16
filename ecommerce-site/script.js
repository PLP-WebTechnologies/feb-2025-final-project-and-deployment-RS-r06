// Sample product data
const products = [
    {
        id: 1,
        name: "Wireless Headphones",
        price: 99.99,
        image: "images/headphones.jpg",
        description: "High-quality wireless headphones with noise cancellation."
    },
    {
        id: 2,
        name: "Smart Watch",
        price: 199.99,
        image: "images/smartwatch.jpg",
        description: "Feature-packed smartwatch with health monitoring."
    },
    {
        id: 3,
        name: "Bluetooth Speaker",
        price: 79.99,
        image: "images/speaker.jpg",
        description: "Portable Bluetooth speaker with 20-hour battery life."
    },
    {
        id: 4,
        name: "Laptop Backpack",
        price: 49.99,
        image: "images/backpack.jpg",
        description: "Durable backpack with USB charging port."
    }
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM elements
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const featuredProductsContainer = document.getElementById('featured-products');
const cartCount = document.getElementById('cart-count');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Load featured products on home page
    if (featuredProductsContainer) {
        loadFeaturedProducts();
    }

    // Update cart count
    updateCartCount();
});

// Load featured products
function loadFeaturedProducts() {
    featuredProductsContainer.innerHTML = '';
    
    products.slice(0, 4).forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        featuredProductsContainer.appendChild(productCard);
    });

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Add product to cart
function addToCart(e) {
    const productId = parseInt(e.target.getAttribute('data-id'));
    const product = products.find(p => p.id === productId);
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Show confirmation
    alert(`${product.name} added to cart!`);
}

// Update cart count in header
function updateCartCount() {
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
    }
}