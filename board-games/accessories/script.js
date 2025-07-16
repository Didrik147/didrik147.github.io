let manufacturers = [
    "blackfire",
    "dragon-shield",
    "dragon-shield_dragon",
    "gamegenic_side-holder", 
    "gamegenic", 
    "ultimate-guard",
    "ultimate-guard_boulder", 
    "ultimate-guard_deck-n-tray", 
    "ultra-pro",
    "ultra-pro_2piece"];

manufacturers.sort();

let colors = [
    "black", 
    "blue",
    "brown",
    "clear",
    "green",
    "lime-green",
    "orange", 
    "pink",
    "purple", 
    "red",
    "silver",
    "transparent",
    "white",
    "yellow"];

colors.sort();

let sizes = [60, 80, 100, 133];

let possibleExtensions = ["jpg", "png", "webp"];

const mainEl = document.querySelector("main");

mainEl.innerHTML = ""

sizes.forEach(size => {
    let sectionEl = document.createElement("section");
    sectionEl.setAttribute("id", `deck-boxes-${size}`);

    sectionEl.innerHTML = `<h3 class="text-center">${size}+</h3>`

    let divEl = document.createElement("div");
    divEl.classList.add("grid");

    colors.forEach(color => {
        manufacturers.forEach(manufacturer => {
            // Assume not two images in same category with different extension
            possibleExtensions.forEach(extension => {
                let imgSrc = `${manufacturer}_${color}_${size}.${extension}`;

                if (imageFileArr.includes(imgSrc)) {
                    divEl.innerHTML += `
            <article>
                <img src="./images/${imgSrc}" alt="Deck box">
                <p>${fixManufacturer(manufacturer)}${capitalizeWords(color)} ${size}+</p>
            </article>`
                }
            })

            sectionEl.appendChild(divEl);
        })
    })

    mainEl.appendChild(sectionEl)

})

function fixManufacturer(manufacturer) {
    switch(manufacturer){
        case "ultimate-guard_boulder":
            return "Ultimate Guard Boulder"
        case "ultimate-guard_deck-n-tray":
            return "Ultimate Guard Deck 'n' Tray"
        case "ultra-pro_2piece":
            return "Ultra PRO 2-Piece"
        case "ultra-pro":
            return "Ultra PRO"
        case "gamegenic_side-holder":
            return "Gamegenic Side Holder"
        case "dragon-shield_dragon":
            return "Dragon Shield Dragon"
        default:
            return capitalizeWords(manufacturer)
    }
}

function capitalizeWords(words){
    words = words.split("-")
    let output = ""
    words.forEach(word => {
        output += " "
        output += capitalize(word)
    })

    return output
}

function capitalize(str) {
    return String(str).charAt(0).toUpperCase() + String(str).slice(1);
}