document.addEventListener("DOMContentLoaded", () => {
    const cheatSheetContainer = document.getElementById("cheatSheet");
    const searchInput = document.getElementById("search");
    const darkModeToggle = document.getElementById("darkModeToggle");

    let darkMode = localStorage.getItem("darkMode") === "enabled";
    if (darkMode) document.body.classList.add("dark-mode");

    darkModeToggle.addEventListener("click", () => {
        darkMode = !darkMode;
        document.body.classList.toggle("dark-mode", darkMode);
        localStorage.setItem("darkMode", darkMode ? "enabled" : "disabled");
    });

    // Spice icon mapping based on spice name
    const spiceIcons = {
        "Rosemary": "Icons/Rosemary.jpg",
        "Basil": "Icons/Basil.jpg",
        "Honey": "Icons/Honey.jpg",
        "Cinnamon": "Icons/Cinnamon.jpg",
        "Orange peel": "Icons/OrangePeel.jpg",
        "Jam": "Icons/Jam.jpg",
        "Garlic powder": "Icons/GarlicPowder.jpg",
        "Garlic": "Icons/Garlic.jpg",
        "Cloves": "Icons/Cloves.jpg",
        "Chili": "Icons/Chili.jpg",
        "Mascarpone cheese": "Icons/MascarponeCheese.jpg",
        "Dried cranberry": "Icons/DriedCranberry.jpg",
        "Cardamom": "Icons/Cardamom.jpg",
        "Vanilla": "Icons/Vanilla.jpg",
        "Ginger": "Icons/Ginger.jpg",
        "Caramel": "Icons/Caramel.jpg",
        "Chocolate": "Icons/Chocolate.jpg",
    };

    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            Object.keys(data).forEach(category => {
                const categorySection = document.createElement("section");
                categorySection.classList.add("category");

                const categoryTitle = document.createElement("h2");
                categoryTitle.textContent = category;
                categorySection.appendChild(categoryTitle);

                const categoryItems = document.createElement("div");
                categoryItems.classList.add("category-items");

                data[category].forEach(item => {
                    const card = document.createElement("div");
                    card.classList.add("card");

                    // Create a div for the bread name and spice icon
                    const breadName = document.createElement("h3");
                    breadName.textContent = item.name;

                    const spiceIcon = document.createElement("img");
                    spiceIcon.src = spiceIcons[item.spice];
                    spiceIcon.alt = item.spice;
                    spiceIcon.classList.add("spice-icon");

                    // Create a div for the spice name below the icon
                    const spiceName = document.createElement("p");
                    spiceName.textContent = item.spice;
                    spiceName.classList.add("spice-name");

                    // Append the bread name, spice icon, and spice name together
                    const spiceDiv = document.createElement("div");
                    spiceDiv.classList.add("spice-container");
                    spiceDiv.appendChild(spiceIcon);
                    spiceDiv.appendChild(spiceName);
                    spiceDiv.appendChild(breadName);

                    card.appendChild(spiceDiv);
                    categoryItems.appendChild(card);
                });

                categorySection.appendChild(categoryItems);
                cheatSheetContainer.appendChild(categorySection);
            });
        });

    searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase();
        document.querySelectorAll(".card").forEach(card => {
            const name = card.querySelector("h3").textContent.toLowerCase();
            card.style.display = name.includes(query) ? "block" : "none";
        });
    });
});
