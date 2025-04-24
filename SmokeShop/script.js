// Cart management script

let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items-container');
const totalPriceElement = document.getElementById('total-price');
const cartSummaryElement = document.getElementById('cart-summary');
const orderTotalElement = document.getElementById('order-total');

// Update the cart count badge
function updateCartCount() {
  if (cartCount) {
    cartCount.textContent = cart.length;
  }
}

// Render cart items in the cart display container
function updateCartDisplay() {
  if (cartItemsContainer) {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.className = 'flex justify-between items-center bg-gray-800 p-4 rounded-lg mb-4';
      cartItem.innerHTML = `
        <div class="flex">
          <img src="${item.image}" alt="${item.name}" class="w-12 h-12 object-cover mr-4 rounded-md" />
          <div class="flex flex-col">
            <span>${item.name}</span>
            <span class="text-sm text-gray-400">${item.description}</span>
          </div>
        </div>
        <span>$${item.price.toFixed(2)}</span>`;
      cartItemsContainer.appendChild(cartItem);
      total += item.price;
    });

    if (totalPriceElement) {
      totalPriceElement.textContent = total.toFixed(2);
    }
  }

  // Update cart summary on checkout page
  if (cartSummaryElement) {
    cartSummaryElement.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
      const summaryItem = document.createElement('div');
      summaryItem.className = 'flex justify-between items-center py-2';
      summaryItem.innerHTML = `
        <span>${item.name}</span>
        <span>$${item.price.toFixed(2)}</span>`;
      cartSummaryElement.appendChild(summaryItem);
      total += item.price;
    });

    if (orderTotalElement) {
      orderTotalElement.textContent = total.toFixed(2);
    }
  }
}

// Save cart to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

// Add an item to the cart
function addToCart(item) {
  cart.push(item);
  saveCartToLocalStorage();
  updateCartCount();
  updateCartDisplay();
}

// Remove an item from the cart by index
function removeFromCart(index) {
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    saveCartToLocalStorage();
    updateCartCount();
    updateCartDisplay();
  }
}

// Initialize cart display on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();
  updateCartDisplay();
});
