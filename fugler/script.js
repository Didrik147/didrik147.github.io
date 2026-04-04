let cardGridEl = document.querySelector('.card-grid');

cardGridEl.innerHTML = ''

class Bird {
  constructor(name, family, img, color, ability, cost, power, flavor) {
    this.name = name;
    this.family = family;
    this.img = img;
    this.color = color;
    this.ability = ability;
    this.cost = cost;
    this.power = power;
    this.flavor = flavor;
  }
}

let magpie = new Bird(
  "Skjære", 
  "Kråkefugler", 
  "https://live.staticflickr.com/65535/55185848180_1fc575d377_b.jpg",
  "yellow",
  "Når denne fuglen kommer i spill, trekk 1 kort.", 
  2, 200, 
  "En utpreget standfugl som beveger seg lite i løpet av året."
);

let birds = [magpie]

let blueTit = new Bird (
  "Blåmeis",
  "Meisefugler",
  "https://live.staticflickr.com/65535/55185710904_c076e564ee_b.jpg",
  "green",
  "",
  1, 100,
  "Ligner på kjøttmeis, men er tydelig mindre og gjennomgående mer intenst blå."
)

birds.push(blueTit)


let muteSwan = new Bird (
  "Knoppsvane",
  "Andefamilien",
  "https://live.staticflickr.com/65535/55184563177_6ae0e9b49c_b.jpg",
  "blue",
  "",
  4, 400,
  "Knoppsvanen kan bli mer enn 10 kilo og ha et vingespenn på over 2 meter. Det gjør den til vår tyngste hekkefugl."
)

birds.push(muteSwan)

birds.push(magpie)
birds.push(blueTit)
birds.push(muteSwan)

birds.push(magpie)
birds.push(blueTit)
birds.push(muteSwan)

/*let emptyBird = new Bird (
  "",
  "",
  "",
  "white",
  "",
  "", "",
  ""
)

birds = [emptyBird, emptyBird, emptyBird, emptyBird, emptyBird, emptyBird, emptyBird, emptyBird, emptyBird]
*/

for (let i = 0; i < birds.length; i++) {
  let bird = birds[i]

// Create card element
let cardEl = document.createElement('div');
cardEl.classList.add('card');
cardEl.classList.add(`bg-${bird.color}-light`);

// Card content
cardEl.innerHTML += `
    <!-- Cost -->
    <div class="circle bg-${bird.color}-dark text-white">${bird.cost}</div>

    <!-- Name -->
    <h1 class="text-center bg-${bird.color}-radial">${bird.name}</h1>

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


let cardEl = document.createElement('div');
cardEl.classList.add('card');
cardEl.classList.add('food');

cardEl.innerHTML += `
    <!-- Name -->
    <h2 class="text-center bg-white">Mat</h2>

    <!-- Image -->
    <div class="image-container">
      <img src="https://avianreport.com/wp-content/uploads/2020/07/hulled-sunflower-seed_optimized.jpg" class="border-top" alt="Mat">
    </div>

    <!-- Power -->
    <div class="power bg-white mb-1 border-top">+100 på din tur</div>
`
cardGridEl.appendChild(cardEl)