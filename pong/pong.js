// Select canvas
const cvs = document.getElementById("pong");
const ctx = cvs.getContext("2d");

const initVel = 3;


// Create the user paddle
const user = {
    x : 0,
    y : cvs.height/2 - 100/2,
    width : 10,
    height : 100,
    color : "WHITE",
    score : 0
}

// Create the com paddle
const com = {
    x : cvs.width - 10,
    y : cvs.height/2 - 100/2,
    width : 10,
    height : 100,
    color : "WHITE",
    score : 0
}

// Create the ball
const ball = {
    x : cvs.width/2,
    y : cvs.height/2,
    radius: 10,
    speed: initVel,
    velocityX : initVel,
    velocityY : initVel,
    color : "WHITE"
}

// Draw rect function
function drawRect(x, y, w, h, color){
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}

// Create the net
const net = {
    x : cvs.width/2 - 1,
    y : 0,
    width : 2,
    height : 10,
    color : "WHITE"
}

// Draw Net
function drawNet(){
    for(let i = 0; i<= cvs.height; i+=15){
        drawRect(net.x, net.y + i, net.width, net.height, net.color);
    }
}

//drawRect(0, 0, cvs.width, cvs.clientHeight, "BLACK");

// Draw circle
function drawCircle(x, y, r, color){
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2, false);
    ctx.closePath();
    ctx.fill();
}

//drawCircle(100, 100, 50, "WHITE");


// Draw text
function drawText(text, x, y, color){
    ctx.fillStyle = color;
    ctx.font = "45px fantasy"
    ctx.fillText(text, x, y);
}

//drawText("something", 300, 200, "WHITE");

// Render the game
function render(){
    // Clear the canvas
    drawRect(0, 0, cvs.width, cvs.height, "BLACK");

    // Draw the net
    drawNet();

    // Draw score
    drawText(user.score, cvs.width/4, cvs.height/5, "WHITE");
    drawText(com.score, 3*cvs.width/4, cvs.height/5, "WHITE");

    // Draw the user and com paddle
    drawRect(user.x, user.y, user.width, user.height, user.color);
    drawRect(com.x, com.y, com.width, com.height, com.color);

    // Draw the ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);

}

// Control the user paddle
cvs.addEventListener("mousemove", movePaddle);

function movePaddle(evt){
    let rect = cvs.getBoundingClientRect();

    user.y = evt.clientY - rect.top - user.height/2;
}


// Collision detection
function collision(b, p){
    b.top = b.y - b.radius;
    b.bottom = b.y + b.radius;
    b.left = b.x - b.radius;
    b.right = b.x + b.radius;

    p.top = p.y;
    p.bottom = p.y + p.height;
    p.left = p.x;
    p.right = p.x + p.width;

    return b.right > p.left && b.bottom > p.top && b.left < p.right && b.top < p.bottom;
}

// Reset ball
function resetBall(){
    ball.x = cvs.width/2;
    ball.y = cvs.height/2;

    ball.speed = initVel;
    ball.velocityX = -ball.velocityX;
}

// Update : pos, mov, score, ...
function update(){
    console.log(ball.speed)

    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // Simple AI to control the com paddle
    let computerLevel = 0.1;
    com.y += (ball.y - (com.y + com.height/2)) * computerLevel;

    if (ball.y + ball.radius > cvs.height || ball.y - ball.radius < 0){
        ball.velocityY = -ball.velocityY;
    }

    let player = (ball.x < cvs.width/2) ? user : com;

    if(collision(ball, player)){
        //ball.velocityX = -ball.velocityX;
        // Where the ball hit the player
        let collidePoint = ball.y - (player.y + player.height/2);

        // Normalization
        collidePoint = collidePoint/(player.height/2);

        // Calculate the angle i Radian
        let angleRad = collidePoint * Math.PI/4

        // X direction of the ball when it's hit
        let direction = (ball.x < cvs.width/2) ? 1 : -1;

        // Change vel X and Y
        ball.velocityX = direction * ball.speed * Math.cos(angleRad);
        ball.velocityY = direction * ball.speed * Math.sin(angleRad);

        // Everytime the ball hit a paddle, we increase its speed
        ball.speed += 0.5;
    }

    // Update the score
    //if(ball.x - ball.radius < 0){
    if(ball.x + ball.radius < 0){
        //The com win
        com.score++;
        resetBall();
    //}else if(ball.x + ball.radius > cvs.width){
    }else if(ball.x - ball.radius > cvs.width){
        //The user win
        user.score++;
        resetBall();
    
    }

}


// Game init
function game(){
    update();
    render();
}

// Loop
//const framePerSecond = 50;
const framePerSecond = 100;
setInterval(game, 1000/framePerSecond);