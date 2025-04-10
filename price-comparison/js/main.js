// price-comparison/js/main.js

// Function to fetch product data from both e-commerce websites
async function fetchProductData() {
    try {
        // In a real application, you would fetch data from actual APIs
        // For demo purposes, we'll simulate fetching from our dummy sites
        
        // Simulating fetch from Amazon clone
        const amazonResponse = await fetch('http://localhost:5000/amazon-clone/js/products.js');
        const amazonData = window.amazonProducts || [];
        
        // Simulating fetch from Flipkart clone
        const flipkartResponse = await fetch('http://localhost:5000/flipkart-clone/js/products.js');
        const flipkartData = window.flipkartProducts || [];
        
        return {
            amazon: amazonData,
            flipkart: flipkartData
        };
    } catch (error) {
        console.error('Error fetching product data:', error);
        // Return mock data in case fetching fails
        return getMockData();
    }
}

// Mock data in case fetch fails during development
function getMockData() {
    const amazonProducts = [
        {
            id: 1,
            name: "Smartphone X Pro",
            description: "6.5-inch display, 128GB storage, 8GB RAM, 48MP camera",
            price: 799.99,
            originalPrice: 899.99,
            rating: 4.5,
            isPrime: true,
            image: "../amazon-clone/images/products/product1.jpg",
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
            image: "../amazon-clone/products/product2.jpg",
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
            image: "../amazon-clone/images/products/product3.jpg",
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
            image: "../amazon-clone/images/products/product4.jpg",
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
            image: "../amazon-clone/images/products/product5.jpg",
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

    const flipkartProducts = [
        {
            id: 1,
            name: "Smartphone X Pro",
            description: "6.5-inch display, 128GB storage, 8GB RAM",
            price: 759.99,
            originalPrice: 899.99,
            rating: 4.6,
            fAssured: true,
            image: "../flipkart-clone/images/products/product1.jpg",
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
            description: "15.6-inch display, 512GB SSD, 16GB RAM",
            price: 1249.99,
            originalPrice: 1499.99,
            rating: 4.8,
            fAssured: true,
            image: "../flipkart-clone/images/products/product2.jpg",
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
            description: "Noise cancelling, 30-hour battery life",
            price: 189.99,
            originalPrice: 249.99,
            rating: 4.4,
            fAssured: true,
            image: "../flipkart-clone/images/products/product3.jpg",
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
            description: "Fitness tracker, heart rate monitor, GPS",
            price: 289.99,
            originalPrice: 349.99,
            rating: 4.5,
            fAssured: false,
            image: "../flipkart-clone/images/products/product4.jpg",
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
            description: "Active noise cancellation, 24-hour battery",
            price: 139.99,
            originalPrice: 179.99,
            rating: 4.3,
            fAssured: true,
            image: "../flipkart-clone/images/products/product5.jpg",
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

    return {
        amazon: amazonProducts,
        flipkart: flipkartProducts
    };
}

// Function to search products
function searchProducts(term, products) {
    if (!term.trim()) return products;
    
    term = term.toLowerCase();
    const filteredProducts = {};
    
    // Filter Amazon products
    filteredProducts.amazon = products.amazon.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term)
    );
    
    // Filter Flipkart products
    filteredProducts.flipkart = products.flipkart.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.description.toLowerCase().includes(term)
    );
    
    return filteredProducts;
}

// Function to sort products
function sortProducts(products, sortBy) {
    const amazonProducts = [...products.amazon];
    const flipkartProducts = [...products.flipkart];
    
    switch (sortBy) {
        case 'price-low':
            amazonProducts.sort((a, b) => a.price - b.price);
            flipkartProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            amazonProducts.sort((a, b) => b.price - a.price);
            flipkartProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            amazonProducts.sort((a, b) => b.rating - a.rating);
            flipkartProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'discount':
            amazonProducts.sort((a, b) => {
                const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100;
                const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100;
                return discountB - discountA;
            });
            flipkartProducts.sort((a, b) => {
                const discountA = ((a.originalPrice - a.price) / a.originalPrice) * 100;
                const discountB = ((b.originalPrice - b.price) / b.originalPrice) * 100;
                return discountB - discountA;
            });
            break;
    }
    
    return {
        amazon: amazonProducts,
        flipkart: flipkartProducts
    };
}

// Expose these functions to be used by comparison.js
window.fetchProductData = fetchProductData;
window.searchProducts = searchProducts;
window.sortProducts = sortProducts;
