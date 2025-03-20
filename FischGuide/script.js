document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch("emotes.json");
        const data = await response.json();

        const freeEmotesContainer = document.getElementById("free-emotes");
        const gamepassEmotesContainer = document.getElementById("gamepass-emotes");

        function createEmoteCards(emotes, container) {
            emotes.forEach(emote => {
                const div = document.createElement("div");
                div.classList.add("card");
                div.innerHTML = `<h3>/e ${emote}</h3>`;
                container.appendChild(div);
            });
        }

        createEmoteCards(data.free, freeEmotesContainer);
        createEmoteCards(data.gamepass, gamepassEmotesContainer);

        const darkModeToggle = document.getElementById("darkModeToggle");
        darkModeToggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
        });

    } catch (error) {
        console.error("Error loading emotes:", error);
    }
});
