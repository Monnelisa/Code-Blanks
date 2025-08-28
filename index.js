let selectedMode = null;

// Intro → Mode Menu
document.addEventListener("keydown", showModeMenu);
document.addEventListener("click", showModeMenu);

function showModeMenu() {
    document.getElementById("intro-screen").classList.add("hidden");
    document.getElementById("mode-menu").classList.remove("hidden");
    document.getElementById("mode-menu").style.animation = "fadeIn 1.5s ease-in-out";
    document.removeEventListener("keydown", showModeMenu);
    document.removeEventListener("click", showModeMenu);
}

// Mode selection
const modeButtons = document.querySelectorAll(".mode-btn");
modeButtons.forEach(button => {
    button.addEventListener("click", function() {
        if (this.disabled) {
            alert("🚀 Debug This will be available in the premium version soon!");
            return;
        }

        // Highlight selected mode
        modeButtons.forEach(btn => btn.classList.remove("selected"));
        this.classList.add("selected");
        selectedMode = this.getAttribute("data-mode");

        setTimeout(() => {
            document.getElementById("mode-menu").classList.add("hidden");
            document.getElementById("main-menu").classList.remove("hidden");
        }, 200);
    });
});

// Language selection → gameplay
const languageIcons = document.querySelectorAll('.language-icons img');
languageIcons.forEach(icon => {
    icon.addEventListener('click', function() {
        const language = this.getAttribute('data-language');
        const file = `json_files/${language}.json`;
        window.location.href = `gameplay.html?file=${file}&difficulty=easy&mode=${selectedMode}`;
    });
});

// Back button → Mode Menu
document.getElementById("back-to-mode").addEventListener("click", () => {
    document.getElementById("main-menu").classList.add("hidden");
    document.getElementById("mode-menu").classList.remove("hidden");
});

// Hover animation for language icons
document.addEventListener("DOMContentLoaded", () => {
    const iconsContainer = document.querySelector(".language-icons");
    const items = document.querySelectorAll(".language-icons .item");

    items.forEach(item => {
        item.addEventListener("mouseenter", () => iconsContainer.classList.add("hovered"));
        item.addEventListener("mouseleave", () => iconsContainer.classList.remove("hovered"));
    });
});
