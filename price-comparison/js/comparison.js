// Updated comparison.js for Tailwind UI Product Cards

document.addEventListener('DOMContentLoaded', async () => {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    const sortBySelect = document.getElementById('sort-by');
    const comparisonResults = document.getElementById('comparison-results');
    const bestDealMsg = document.getElementById('best-deal-msg');
  
    let allProducts = await window.fetchProductData();
    displayComparisons(allProducts);
  
    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', event => {
      if (event.key === 'Enter') performSearch();
    });
  
    sortBySelect.addEventListener('change', () => {
      const sorted = window.sortProducts(allProducts, sortBySelect.value);
      displayComparisons(sorted);
    });
  
    function performSearch() {
      const term = searchInput.value;
      const filtered = window.searchProducts(term, allProducts);
      allProducts = filtered;
      displayComparisons(filtered);
    }
  
    function displayComparisons(products) {
      comparisonResults.innerHTML = '';
      bestDealMsg.textContent = 'Our suggestion will appear here after analysis.';
  
      const productMap = new Map();
  
      products.amazon.forEach(p => {
        productMap.set(p.name, {
          name: p.name,
          image: p.image,
          priceAmazon: p.price,
          ratingAmazon: p.rating,
          originalAmazon: p.originalPrice,
          linkAmazon: p.link
        });
      });
  
      products.flipkart.forEach(p => {
        if (productMap.has(p.name)) {
          const existing = productMap.get(p.name);
          Object.assign(existing, {
            priceFlipkart: p.price,
            ratingFlipkart: p.rating,
            originalFlipkart: p.originalPrice,
            image: existing.image || p.image,
            linkFlipkart: p.link
          });
        } else {
          productMap.set(p.name, {
            name: p.name,
            image: p.image,
            priceFlipkart: p.price,
            ratingFlipkart: p.rating,
            originalFlipkart: p.originalPrice,
            linkFlipkart: p.link
          });
        }
      });
  
      const all = Array.from(productMap.values());
  
      let bestDeal = null;
      let lowestPrice = Infinity;
  
      all.forEach(product => {
        const card = document.createElement('div');
        card.className = 'bg-white shadow-lg rounded-2xl p-6 border-t-4 border-purple-500';
  
        const priceAmazon = product.priceAmazon || null;
        const priceFlipkart = product.priceFlipkart || null;
  
        if (priceAmazon && priceAmazon < lowestPrice) {
          bestDeal = `${product.name} on Amazon`;
          lowestPrice = priceAmazon;
        }
  
        if (priceFlipkart && priceFlipkart < lowestPrice) {
          bestDeal = `${product.name} on Flipkart`;
          lowestPrice = priceFlipkart;
        }
  
        card.innerHTML = `
          <img src="${product.image || 'https://via.placeholder.com/300'}" class="w-full h-48 object-contain mb-4" alt="${product.name}">
          <h3 class="text-xl font-semibold text-gray-800">${product.name}</h3>
  
          ${priceAmazon ? `
          <p class="text-purple-600 font-bold mt-2">Amazon: ₹${priceAmazon}</p>
          <a href="${product.linkAmazon}" target="_blank" class="text-blue-600 underline text-sm">View on Amazon</a>
          ` : ''}
  
          ${priceFlipkart ? `
          <p class="text-blue-600 font-bold mt-2">Flipkart: ₹${priceFlipkart}</p>
          <a href="${product.linkFlipkart}" target="_blank" class="text-blue-600 underline text-sm">View on Flipkart</a>
          ` : ''}
        `;
  
        comparisonResults.appendChild(card);
      });
  
      if (all.length === 0) {
        comparisonResults.innerHTML = '<p class="text-center text-gray-500">No products found.</p>';
      } else {
        bestDealMsg.textContent = bestDeal ? `Best deal: ${bestDeal}` : 'Compare the prices above.';
      }
    }
  });
<<<<<<< HEAD
  
=======
  
>>>>>>> 88ba503b677116a4362e48bd0563f7f130ad9b68
