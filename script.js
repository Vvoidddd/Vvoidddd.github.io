document.addEventListener("DOMContentLoaded", function () {
    const themeButtons = document.querySelectorAll(".theme-btn");

    themeButtons.forEach(button => {
        button.addEventListener("click", function () {
            const selectedTheme = button.getAttribute("data-theme");
            setTheme(selectedTheme);
            saveThemePreference(selectedTheme);
        });
    });

    function setTheme(theme) {
        document.body.classList.remove(
            "dark", "light", "blue", "red", "green", "purple",
            "ocean", "sunset", "forest", "cyberpunk", "space", "vintage"
        );
        document.body.classList.add(theme);
    }

    function saveThemePreference(theme) {
        localStorage.setItem("theme", theme);
    }

    function loadSavedTheme() {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            setTheme("dark");
        }
    }

    loadSavedTheme(); // Load the saved theme on page load

    // Changelog toggle functionality
    const changelogToggle = document.getElementById('changelog-toggle');
    const changelogList = document.getElementById('changelog-list');

    changelogToggle.addEventListener('click', () => {
        if (changelogList.style.maxHeight) {
            changelogList.style.maxHeight = null;
            changelogToggle.innerHTML = "&#8595;"; // Change arrow to down
        } else {
            changelogList.style.maxHeight = changelogList.scrollHeight + "px"; // Set max-height to the scroll height
            changelogToggle.innerHTML = "&#8593;"; // Change arrow to up
        }
    });

    // Banner close functionality
    const bannerCloseBtn = document.getElementById('banner-close-btn');
    const banner = document.getElementById('announcement-banner');

    bannerCloseBtn.addEventListener('click', () => {
        banner.style.display = 'none';
    });
});
