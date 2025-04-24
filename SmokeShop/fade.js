document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('page-transition-overlay');
  const overlayImage = overlay ? overlay.querySelector('img') : null;
  const links = document.querySelectorAll('a[href]:not([target="_blank"]):not([href^="#"])');

  // Add fade-in class on page load
  document.body.classList.add('fade-in');

  function fadeOutAndNavigate(event) {
    event.preventDefault();
    const href = this.getAttribute('href');

    if (!overlay || !overlayImage) {
      window.location.href = href;
      return;
    }

    // Show overlay and fade to black
    overlay.classList.add('visible');
    document.body.classList.remove('fade-in');
    document.body.classList.add('fade-out');

    // After body fade out, fade in overlay image
    setTimeout(() => {
      overlayImage.classList.add('visible');
    }, 800);

    // After overlay image fade in, navigate
    setTimeout(() => {
      window.location.href = href;
    }, 1600);
  }

  links.forEach(link => {
    link.addEventListener('click', fadeOutAndNavigate);
  });
});

// On page load, fade out overlay image then fade in page content
window.addEventListener('load', () => {
  const overlay = document.getElementById('page-transition-overlay');
  const overlayImage = overlay ? overlay.querySelector('img') : null;

  if (overlay && overlayImage) {
    overlayImage.classList.remove('visible');
    setTimeout(() => {
      overlay.classList.remove('visible');
      document.body.classList.add('fade-in');
      document.body.classList.remove('fade-out');
    }, 800);
  } else {
    document.body.classList.add('fade-in');
    document.body.classList.remove('fade-out');
  }
});
