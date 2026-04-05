let cardGridEl = document.querySelector('.card-grid');

cardGridEl.innerHTML = ''

const fileUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTNeV8IOdFb29xK4JS0tvnTk4uijz0DQ80XOqRqyaonYOzhhUdxmUApJwHjePNk9GCfA8MKSI78g79H/pub?gid=310952346&single=true&output=csv';

let birds = []; // Your target array

Papa.parse(fileUrl, {
  download: true,
  header: true,      // This turns each row into an object instead of an array
  dynamicTyping: true, // Automatically converts numbers/booleans from strings
  skipEmptyLines: true,
  complete: (results) => {
    // results.data is already an array of objects!
    birds = results.data;

    console.log("Birds:", birds);
    processData(birds); // Call your next function here
  }
});

function processData(birds) {
  for (let i = 0; i < birds.length; i++) {
    let bird = birds[i]

    // Create card element
    let cardEl = document.createElement('div');
    cardEl.classList.add('card');
    cardEl.classList.add(`bg-${bird.color.toLowerCase()}-light`);

    // Card content
    cardEl.innerHTML += `
    <!-- Cost -->
    <div class="circle bg-${bird.color.toLowerCase()}-dark text-white">${bird.cost}</div>

    <!-- Name -->
    <h1 class="text-center bg-${bird.color.toLowerCase()}-radial">${bird.name}</h1>

    <!-- Image -->
    <div class="image-container">
      <img src="${bird.img}" alt="${bird.name}">

      <!-- Type -->
      <div class="type bg-grey">${bird.family}</div>
    </div>

    

    <!-- Abilities -->
    <div class="abilities">
      <p>${bird.ability}</p>
    </div>
    
    <!-- Flavor text -->
    <p class="flavor">
      ${bird.flavor}
    </p>

    <!-- Power -->
    <div class="power bg-black text-white">${bird.power}</div>
`
    cardGridEl.appendChild(cardEl)
  }
}