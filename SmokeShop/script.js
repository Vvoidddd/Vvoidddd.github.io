let cart = [];

const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = document.getElementById('cart-count');
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');

addToCartButtons.forEach(button => {
  button.addEventListener('click', (e) => {
    const productCard = e.target.closest('.product-card');
    const productName = productCard.querySelector('h3').textContent;
    const productPrice = parseFloat(productCard.querySelector('p').textContent.replace('$', '').replace(' per edible', ''));
    
    cart.push({ name: productName, price: productPrice });
    updateCart();
  });
});

function updateCart() {
  // Update cart count
  cartCount.textContent = cart.length;

  // Update cart items display
  cartItemsContainer.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.className = 'flex justify-between items-center bg-gray-800 p-4 rounded-lg mb-4';
    cartItem.innerHTML = `<span>${item.name}</span><span>$${item.price}</span>`;
    cartItemsContainer.appendChild(cartItem);
    total += item.price;
  });

  // Update total price
  totalPriceElement.textContent = total.toFixed(2);
}
