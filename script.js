// DOM elments
const player = document.getElementById("player");
const sunshine = document.getElementById("sunshine");
const cloud = document.getElementById("cloud");

const gameContainer = document.getElementById("game-container");

const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");

const gameOverScreen = document.getElementById("game-over");
const finalScoreDisplay = document.getElementById("final-score");
const restartButton = document.getElementById("restart-button");

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

// cloud variables
let cloudX = 50;
let cloudY = -50;

const cloudSpeed = 1.5;

// timer variables 
let timer = 60;
let gameRunning = true;

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
        finalScoreDisplay.textContent = score;
        gameOverScreen.style.display = "flex";
    }
}

// draw cloud
function updateCloud(){
    cloud.style.left = `${cloudX}%`;
    cloud.style.top = `${cloudY}px`;
}

// making it fall
function moveCloud(){
    cloudY += cloudSpeed;

    if(cloudY > gameContainer.clientHeight){
        resetCloud();
    }
}

// reset cloud cloud
function resetCloud(){
    cloudY = -50;
    cloudX = Math.random() * 90 + 5;
}

// cloud collision
function checkCloudCollision(){
    const playerRect = player.getBoundingClientRect();
    const cloudRect = cloud.getBoundingClientRect();

    if(
        playerRect.left < cloudRect.right &&
        playerRect.right > cloudRect.left &&
        playerRect.top < cloudRect.bottom &&
        playerRect.bottom > cloudRect.top
    ){
        score = Math.max(0, score - 1);
        scoreDisplay.textContent = score;
        resetCloud();
    }

}

// game restart 
function restartGame(){
    score = 0;
    timer = 60;
    playerX = 50;

    resetSunshine();
    resetCloud();
    scoreDisplay.textContent = score;
    timerDisplay.textContent = timer;
    gameOverScreen.style.display = "none";
    gameRunning = true;
    timerInterval = setInterval(updateTimer, 1000);

    gameLoop();
}
restartButton.addEventListener("click", restartGame);

// game loop
function gameLoop(){
    if(!gameRunning){
        return;
    }
    
    movePlayer();
    moveSunshine();
    moveCloud();
    updatePlayer();
    updateSunshine();

    updateCloud();
    checkCollision();
    checkCloudCollision();

    requestAnimationFrame(gameLoop);
}
scoreDisplay.textContent = score;
timerDisplay.textContent = timer;

let timerInterval = setInterval(updateTimer, 1000);

gameLoop();