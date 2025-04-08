// price-comparison/js/comparison.js

document.addEventListener('DOMContentLoaded', async () => {
    // Elements
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const sortBySelect = document.getElementById('sort-by');
    const comparisonResults = document.getElementById('comparison-results');
    
    // Initialize - load all products
    let allProducts = await window.fetchProductData();
    displayComparisons(allProducts);
    
    // Event listeners
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', event => {
        if (event.key === 'Enter') {
            performSearch();
        }
    });
    
    sortBySelect.addEventListener('change', () => {
        const sortedProducts = window.sortProducts(allProducts, sortBySelect.value);
        displayComparisons(sortedProducts);
    });
    
    // Search function
    function performSearch() {
        const searchTerm = searchInput.value;
        const filteredProducts = window.searchProducts(searchTerm, allProducts);
        allProducts = filteredProducts; // Update current products
        displayComparisons(filteredProducts);
    }
    
    // Display product comparisons
    function displayComparisons(products) {
        comparisonResults.innerHTML = '';
        
        // Create a map of comparable products based on name
        const productMap = new Map();
        
        // Group Amazon products by name
        products.amazon.forEach(product => {
            if (!productMap.has(product.name)) {
                productMap.set(product.name, {
                    name: product.name,
                    description: product.description,
                    specs: product.specs,
                    amazonPrice: product.price,
                    amazonOriginalPrice: product.originalPrice,
                    amazonRating: product.rating,
                    amazonImage: product.image,
                    amazonPrime: product.isPrime
                });
            }
        });
        
        // Add Flipkart info to existing products or create new entries
        products.flipkart.forEach(product => {
            if (productMap.has(product.name)) {
                const existingProduct = productMap.get(product.name);
                existingProduct.flipkartPrice = product.price;
                existingProduct.flipkartOriginalPrice = product.originalPrice;
                existingProduct.flipkartRating = product.rating;
                existingProduct.flipkartImage = product.image;
                existingProduct.flipkartAssured = product.fAssured;
            } else {
                productMap.set(product.name, {
                    name: product.name,
                    description: product.description,
                    specs: product.specs,
                    flipkartPrice: product.price,
                    flipkartOriginalPrice: product.originalPrice,
                    flipkartRating: product.rating,
                    flipkartImage: product.image,
                    flipkartAssured: product.fAssured
                });
            }
        });
        
        // Convert map to array and sort according to current sort selection
        const comparableProducts = Array.from(productMap.values());
        
        // Display each product comparison
        comparableProducts.forEach(product => {
            // Create comparison card
            const comparisonCard = document.createElement('div');
            comparisonCard.className = 'product-comparison';
            
            // Image source - prefer Amazon's image if available
            const imageSource = product.amazonImage || product.flipkartImage;
            
            // Calculate discounts
            let amazonDiscount = 0;
            let flipkartDiscount = 0;
            
            if (product.amazonPrice && product.amazonOriginalPrice) {
                amazonDiscount = Math.round(((product.amazonOriginalPrice - product.amazonPrice) / product.amazonOriginalPrice) * 100);
            }
            
            if (product.flipkartPrice && product.flipkartOriginalPrice) {
                flipkartDiscount = Math.round(((product.flipkartOriginalPrice - product.flipkartPrice) / product.flipkartOriginalPrice) * 100);
            }
            
            // Determine which store has the better price
            let bestPrice = null;
            if (product.amazonPrice && product.flipkartPrice) {
                bestPrice = product.amazonPrice < product.flipkartPrice ? 'amazon' : 'flipkart';
            } else if (product.amazonPrice) {
                bestPrice = 'amazon';
            } else if (product.flipkartPrice) {
                bestPrice = 'flipkart';
            }
            
            // Build the comparison card HTML
            comparisonCard.innerHTML = `
                <div class="product-header">
                    <img class="product-image" src="${imageSource}" alt="${product.name}">
                    <div class="product-title">
                        <h3>${product.name}</h3>
                        <p>${product.description}</p>
                    </div>
                </div>
                
                <table class="price-comparison-table">
                    <thead>
                        <tr>
                            <th>Store</th>
                            <th>Price</th>
                            <th>Rating</th>
                            <th>Features</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${product.amazonPrice ? `
                        <tr class="${bestPrice === 'amazon' ? 'best-price' : ''}">
                            <td class="store-logo">
                                <i class="fab fa-amazon" style="color: #FF9900;"></i> Amazon
                            </td>
                            <td>
                                <span class="price">$${product.amazonPrice.toFixed(2)}</span>
                                <span class="original-price">$${product.amazonOriginalPrice.toFixed(2)}</span>
                                <span class="discount">${amazonDiscount}% off</span>
                            </td>
                            <td>
                                <div class="rating">${product.amazonRating} ★</div>
                            </td>
                            <td>
                                ${product.amazonPrime ? '<span class="prime"><i class="fas fa-check"></i> Prime</span>' : ''}
                            </td>
                            <td>
                                <button class="go-to-store" onclick="window.open('../amazon-clone/index.html', '_blank')">View Deal</button>
                            </td>
                        </tr>
                        ` : ''}
                        
                        ${product.flipkartPrice ? `
                        <tr class="${bestPrice === 'flipkart' ? 'best-price' : ''}">
                            <td class="store-logo">
                                <i class="fas fa-shopping-cart" style="color: #2874f0;"></i> Flipkart
                            </td>
                            <td>
                                <span class="price">$${product.flipkartPrice.toFixed(2)}</span>
                                <span class="original-price">$${product.flipkartOriginalPrice.toFixed(2)}</span>
                                <span class="discount">${flipkartDiscount}% off</span>
                            </td>
                            <td>
                                <div class="rating">${product.flipkartRating} ★</div>
                            </td>
                            <td>
                                ${product.flipkartAssured ? '<span class="fassured"><i class="fas fa-check-circle" style="color: #2874f0;"></i> F-Assured</span>' : ''}
                            </td>
                            <td>
                                <button class="go-to-store" onclick="window.open('../flipkart-clone/index.html', '_blank')">View Deal</button>
                            </td>
                        </tr>
                        ` : ''}
                    </tbody>
                </table>
                
                <div class="specs-section">
                    <h4>Specifications</h4>
                    <table class="specs-table">
                        <tbody>
                            ${Object.entries(product.specs || {}).map(([key, value]) => `
                                <tr>
                                    <th>${key.charAt(0).toUpperCase() + key.slice(1)}</th>
                                    <td>${value}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            
            comparisonResults.appendChild(comparisonCard);
        });
        
        // Show message if no products found
        if (comparableProducts.length === 0) {
            comparisonResults.innerHTML = '<p style="text-align: center; padding: 20px;">No products found matching your search.</p>';
        }
    }
});