const { Vibrant } = require("node-vibrant/worker");

document.addEventListener("DOMContentLoaded", () => {
    // Selecciona elementos del DOM
    const uploadInput = document.getElementById("imageUpload");
    const shuffleButton = document.getElementById("shuffle");
    const restartButton = document.getElementById("restart");
    const colorGrid = document.getElementById("color-grid");

    // Funcion para manejar la carga de imagenes
    uploadInput.addEventListener("change", handleImageUpload);

    // Funcion para mezclar la paleta de colores
    shuffleButton.addEventListener("click", shuffleColors);

    // Funcion para reiniciar
    restartButton.addEventListener("click", restartPalette);

    function handleImageUpload(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                const img = new Image();
                img.src = reader.result;
                img.onload = function () {
                    Vibrant.from(img).getPalette((err, palette) => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                        displayPalette(palette);
                    });
                };
            };
            reader.readAsDataURL(file);
        }
    }

    function displayPalette(palette) {
        colorGrid.innerHTML = '';
        for (const swatch in palette) {
            if (palette[swatch]) {
                const color = palette[swatch].getHex();
                const colorDiv = document.createElement("div");
                colorDiv.style.backgroundColor = color;
                colorDiv.className = "color-swatch";
                colorGrid.appendChild(colorDiv);
            }
        }
    }

    function shuffleColors() {
        console.log("Shuffle colors");
    }

    function restartPalette() {
        colorGrid.innerHTML = '';
        console.log("Restart palette");
    }
});