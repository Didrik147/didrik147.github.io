let manufacturers = ["ultimate-guard", 
    "ultra-pro", 
    "gamegenic_side-holder", 
    "gamegenic", 
    "dragon-shield",
    "dragon-shield_dragon",
    "blackfire"];

manufacturers.sort();

let colors = ["purple", "orange", "red", "yellow", "lime-green", "white", "blue", "green", "black", "clear", "pink"];

colors.sort();

let sizes = [60, 80, 100];

let possibleExtensions = ["jpg", "png", "webp"];

const mainEl = document.querySelector("main");

mainEl.innerHTML = ""

sizes.forEach(size => {
    let sectionEl = document.createElement("section");
    sectionEl.setAttribute("id", `deck-boxes-${size}`);

    sectionEl.innerHTML = `<h3 class="text-center">${size}+</h3>`

    let divEl = document.createElement("div");
    divEl.className = "collection-list mt-4 row gx-0 gy-3";

    colors.forEach(color => {
        manufacturers.forEach(manufacturer => {
            // Assume not two images in same category with different extension
            possibleExtensions.forEach(extension => {
                let imgSrc = `${manufacturer}_${color}_${size}.${extension}`;

                if (imageFileArr.includes(imgSrc)) {
                    divEl.innerHTML += `
            <article class="col-sm-6 col-md-4 col-lg-3 col-xl-2 p-2">
                <img src="./images/${imgSrc}" alt="Deck box" class="w-100">
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