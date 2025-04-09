document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll('.add-to-cart');
    
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        alert("🔥 Added to cart! Time to get lit.");
      });
    });
  });
  