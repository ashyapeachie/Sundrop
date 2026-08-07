// DOM elments
const player = document.getElementById("player");
const sunshine = document.getElementById("sunshine");
const gameContainer = document.getElementById("game-container");
const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

// variables
let playerX = 50;
// % across the screen
const playerSpeed = 2;
// movement apeed
let score = 0;

// sunshine variables
let sunshineX = 50;
let sunshineY = 0;

const sunshineSpeed = 1;

// timer variables 
let timer = 60;

// draw player 
function updatePlayer(){
    player.style.left = `${playerX}%`;
}
// the function above is responsible for updating the player's position

// draw sunshine 
function updateSunshine(){
    sunshine.style.left = `${sunshineX}%`;
    sunshine.style.top = `${sunshineY}px`;
}

// keyboard input
const keys = {};

document.addEventListener("keydown", (event) => {
    keys[event.key.toLowerCase()] = true;
});

document.addEventListener("keyup", (event) => {
    keys[event.key.toLowerCase()] = false;
});
// above functions allow for smoother movement 

// movement 
function movePlayer(){
    if(keys["arrowleft"] || keys["a"]){
        playerX -= playerSpeed;
    }

    if(keys["arrowright"] || keys["d"]){
        playerX += playerSpeed;
    }
    playerX = Math.max(5, Math.min(95, playerX));
    // keeps player inside the game area 
}

// falling object
function moveSunshine(){
    sunshineY += sunshineSpeed;

     if (sunshineY > gameContainer.clientHeight) {
        resetSunshine();
    }
}

// reset sunshine
function resetSunshine(){
    sunshineY = 0;
    sunshineX = Math.random() * 90 + 5;
}

// collision function
function checkCollision(){
    const playerRect = player.getBoundingClientRect();
    const sunshineRect = sunshine.getBoundingClientRect();

    if(
        playerRect.left < sunshineRect.right &&
        playerRect.right > sunshineRect.left &&
        playerRect.top < sunshineRect.bottom &&
        playerRect.bottom > sunshineRect.top
    ){
        score++;
        scoreDisplay.textContent = score;
        console.log("Sunshine Collected!", score);
        resetSunshine();
    }
}

// countdown
function updateTimer(){
    timer--;
    timerDisplay.textContent = timer;

    if(timer <= 0){
        gameRunning = false;
        clearInterval(timerInterval);
        alert(`Summer's over! You collected ${score} sunshine!`);
    }
}

// game loop
function gameLoop(){
    let gameRunning = true;
    
    if(!gameRunning){
        return;
    }
    
    movePlayer();
    moveSunshine();
    updatePlayer();
    updateSunshine();
    checkCollision();
    requestAnimationFrame(gameLoop);
}
scoreDisplay.textContent = score;
timerDisplay.textContent = timer;

const timerInterval = setInterval(updateTimer, 1000);

gameLoop();

