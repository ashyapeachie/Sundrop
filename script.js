// DOM elments
const player = document.getElementById("player");
const gameContainer = document.getElementById("game-container");

// variables
let playerX = 50;
// % across the screen
const playerSpeed = 2;
// movement apeed

// draw player 
function updatePlayer(){
    player.style.left = `${playerX}%`;
}
// the function above is responsible for updating the player's position

// keyboard input
const keys = {};

document.addEventListener("keydown", (event) => {
    keys[event.key] = true;
});

document.addEventListener("keyup", (event) => {
    keys[event.key] = false;
});
// above functions allow for smoother movement 

// movement 
function movePlayer(){
    if(keys["ArrowLeft"] || keys["a"]){
        playerX -= playerSpeed;
    }

    if(keys["ArrowRight"] || keys["d"]){
        playerX += playerSpeed;
    }
    playerX = Math.max(5, Math.min(95, playerX));
    // keeps player inside the game area 
}

// game loop
function gameLoop(){
    movePlayer();
    updatePlayer();
    requestAnimationFrame(gameLoop);
}

gameLoop();