// amazon-clone/js/products.js
const products = [
    {
        id: 1,
        name: "Smartphone X Pro",
        description: "6.5-inch display, 128GB storage, 8GB RAM, 48MP camera",
        price: 799.99,
        originalPrice: 899.99,
        rating: 4.5,
        isPrime: true,
        image: "images/products/product1.jpg",
        specs: {
            display: "6.5-inch AMOLED",
            processor: "Octa-core 2.5GHz",
            storage: "128GB",
            ram: "8GB",
            camera: "48MP + 12MP + 5MP triple camera",
            battery: "4500mAh"
        }
    },
    {
        id: 2,
        name: "Laptop Ultra Slim",
        description: "15.6-inch display, 512GB SSD, 16GB RAM, Intel i7",
        price: 1299.99,
        originalPrice: 1499.99,
        rating: 4.7,
        isPrime: true,
        image: "images/products/product2.jpg",
        specs: {
            display: "15.6-inch FHD IPS",
            processor: "Intel Core i7-11th Gen",
            storage: "512GB NVMe SSD",
            ram: "16GB DDR4",
            graphics: "NVIDIA GeForce RTX 3050",
            battery: "10 hours"
        }
    },
    {
        id: 3,
        name: "Wireless Headphones",
        description: "Noise cancelling, 30-hour battery, Bluetooth 5.0",
        price: 199.99,
        originalPrice: 249.99,
        rating: 4.3,
        isPrime: true,
        image: "images/products/product3.jpg",
        specs: {
            type: "Over-ear",
            connectivity: "Bluetooth 5.0",
            battery: "30 hours",
            features: "Active Noise Cancellation",
            microphone: "Built-in with voice assistant",
            controls: "Touch controls"
        }
    },
    {
        id: 4,
        name: "Smart Watch Series 5",
        description: "Fitness tracker, heart rate monitor, GPS, waterproof",
        price: 299.99,
        originalPrice: 349.99,
        rating: 4.6,
        isPrime: false,
        image: "images/products/product4.jpg",
        specs: {
            display: "1.4-inch AMOLED",
            battery: "14 days",
            waterproof: "5ATM",
            sensors: "Heart rate, SpO2, accelerometer",
            connectivity: "Bluetooth 5.0, GPS",
            compatibility: "iOS and Android"
        }
    },
    {
        id: 5,
        name: "Wireless Earbuds Pro",
        description: "Active noise cancellation, 24-hour battery with case",
        price: 149.99,
        originalPrice: 179.99,
        rating: 4.4,
        isPrime: true,
        image: "images/products/product5.jpg",
        specs: {
            type: "In-ear",
            connectivity: "Bluetooth 5.2",
            battery: "6 hours + 18 hours with case",
            features: "Active Noise Cancellation, Transparency mode",
            waterproof: "IPX4",
            controls: "Touch controls"
        }
    }
];

function displayProducts() {
    const productsContainer = document.getElementById('products-list');
    
    products.forEach(product => {
        const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
        
        const productElement = document.createElement('div');
        productElement.className = 'product';
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="rating">${stars} ${product.rating}</div>
            <div class="price">$${product.price.toFixed(2)} 
                <span style="text-decoration: line-through; color: #666; font-size: 0.8rem;">$${product.originalPrice.toFixed(2)}</span>
            </div>
            <p>${product.description}</p>
            ${product.isPrime ? '<p class="prime"><i class="fas fa-check"></i> Prime</p>' : ''}
            <button>Add to Cart</button>
        `;
        
        productsContainer.appendChild(productElement);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', displayProducts);

// Exposing products data for the comparison website to access
window.amazonProducts = products;