// Getting elements from DOM
let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

let increaseAngleBtn = document.getElementById('increaseAngle');
let decreaseAngleBtn = document.getElementById('decreaseAngle');
let increaseVelocityBtn = document.getElementById('increaseVelocity');
let decreaseVelocityBtn = document.getElementById('decreaseVelocity');
let shootBtn = document.getElementById('shoot');

let angleEl = document.getElementById('angle')
let velocityEl = document.getElementById('velocity')

let g = 9.81 // m/s**2


// Setting/getting the level
let level;

if (localStorage.level != null) {
    level = Number(localStorage.level)
}else {
    level = 0
}


function updateLS(){
    localStorage.level = level
}


let levelEl = document.getElementById("level")
levelEl.innerText = `Level: ${level}`


// Cannonball class
class Cannonball {
    constructor(r, x, y, v0=0, angle=45) {
        this.r = r;
        this.x = x;
        this.y = y;

        this.x0 = x;
        this.y0 = y;

        this.v0 = v0
        this.v0 = v0/3.6 //convert from km/h to m/s
        
        this.angle = deg2rad(angle)
        
        this.v0x = this.v0 * Math.cos(this.angle)
        this.v0y = this.v0 * Math.sin(this.angle)

        this.t = 0
    }

    dxcalc() {
        return this.v0x * this.t
    }

    dycalc() {
        return this.v0y * this.t - 0.5 * g * this.t ** 2
    }
}


// Time step
let dt = 0.1

function moveBall(ball){
    //let sf = 10 // scale factor
    
    let dx = ball.dxcalc()
    let dy = ball.dycalc()

    ball.x = ball.x0 + dx
    ball.y = ball.y0 - dy
    ball.t += dt

    //console.log(t.toFixed(2), (ball.x).toFixed(2), (ball.y).toFixed(2))
}



let shot = false
let collide = false

// Update function
function update(){
    balls.forEach(ball => {
        if (!collide) {
            collide = isCollision(ball, target)
        }

        if (shot && ball.y < canvas.height - ball.r && !collide) {
            moveBall(ball);
        }
    })
        
    if(!collide){
        draw();
        requestAnimationFrame(update);
    }else {
        console.log("You hit!")

        displayTextMiddle("Refresh page to try again at a higher level", 30, [0, canvas.height / 5])

        displayTextMiddle("You hit!", 100)

        
        level += 1
        updateLS()
    }
    
}




// Cannonball object
let ballr = 10
let ballx = ballr*1.01
let bally = canvas.height - ballr*1.01
let v0 = 300
//let ball = new Cannonball(ballr, ballx, bally, v0)
let ball;
let balls = []

// Target class
class Target {
    constructor(r, x, y) {
        this.r = r;
        this.x = x;
        this.y = y;
    }
}


// Target object
let targetr = 40 - level*2 // radius gets smaller as level progresses
if(targetr < 10){
    targetr = 10
} 
let targetx = randomInteger(2*targetr, canvas.width-2*targetr)
let targety = randomInteger(2*targetr, canvas.height-2*targetr)

let target = new Target(targetr, targetx, targety)

function isCollision(ball, target){
    dist = Math.sqrt((target.x - ball.x)**2 + (target.y - ball.y)**2)
    if(dist <= (target.r + ball.r)){
        console.log("Collision!")
        return true
    }else {
        return false
    }
}

// Create a random integer from min to max (inclusive)
function randomInteger(min, max){
    return Math.floor(Math.random()*(max-min+1)) + min
}


// Draw circle function
function drawCircle(circle, color) {
    ctx.beginPath();

    // ctx.arc(x,y, r, startAngle,endAngle, counterclockwise);
    ctx.arc(circle.x, circle.y, circle.r, 0, Math.PI * 2, true);

    ctx.fillStyle = color;
    ctx.fill();

    ctx.closePath();
}

// Function to convert from degrees to radians
function deg2rad(deg){
    return (deg * Math.PI) / 180
}


// Draw cannon
function drawCannon(angle = 45) {
    ctx.beginPath();
    let width = 32;
    let len = 100

    angle = deg2rad(angle)

    // start values
    let x0 = 0
    let y0 = canvas.height

    let x1 = x0 + len * Math.cos(angle)
    let y1 = y0 - len * Math.sin(angle)

    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    
    ctx.lineWidth = width;
    ctx.strokeStyle = "#2F3640";

    ctx.stroke();
}




// Display text on canvas
function displayText(msg, size, x, y) {
    ctx.fillStyle = '#000';
    ctx.font = `bold ${size}px Arial`;
    ctx.fillText(msg, x, y);
}

// Center text in the middle of the canvas
function displayTextMiddle(msg, size, offset=[0,0]){
    ctx.fillStyle = '#000';
    ctx.font = `bold ${size}px Arial`;
    let textWidth = ctx.measureText(msg).width;
    ctx.fillText(msg, (canvas.width/2)-(textWidth/2)+offset[0], canvas.height/2 + offset[1]);
}




let ammo = 9 - level;

// At higher level, you only have one shot
if (ammo < 1){
    ammo = 1
}

let angle = 45;

function draw() {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //drawCircle(new Cannonball(ballr, ballx, bally, v0), '#676e6a')

    if(shot){
        //drawCircle(ball, '#676e6a')
        balls.forEach(ball => drawCircle(ball, '#676e6a'))
    }
    drawCircle(target, 'red')

    drawCannon(angle)

    //displayText(`Score: ${level}`, 30, canvas.width - 140, 40)
    displayText(`Angle: ${angle}°`, 20, 10, 30)
    displayText(`Initial velocity: ${v0} km/h`, 20, 10, 60)
    displayText(`Ammo left: ${ammo}`, 20, 10, 90)
}

update()




function shoot(){
    if(!collide && ammo > 0){
        console.log("Shoot!")
        ball = new Cannonball(ballr, ballx, bally, v0, angle)
        balls.push(ball)
        shot = true
        ammo--;
    }else {
        console.log("Out of ammo")
    }

    
}

let dv = 20
let da = 5

function keyDown(e) {
    if (e.key == " ") {
        shoot()
    }else if(e.key == "ArrowLeft"){
        v0 -= dv
    }else if(e.key == "ArrowRight"){
        v0 += dv
        if(v0 > 400){
            v0 = 400
        }
    }else if(e.key == "ArrowUp"){
        angle += da
    }else if(e.key == "ArrowDown"){
        angle -= da
    }
}

document.addEventListener('keydown', keyDown)


shootBtn.addEventListener('click', shoot)




const angleRangeEl = document.getElementById('anglerange')
const velocityRangeEl = document.getElementById('velocityrange')

angleRangeEl.addEventListener('input', () => {
    angle = angleRangeEl.value
})

velocityRangeEl.addEventListener('input', () => {
    v0 = velocityRangeEl.value
})
    
