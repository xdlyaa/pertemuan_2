const mobil = document.getElementById("mobil2");
let canTriggerEvent = true;

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const character = {
  x: 50,
  y: canvas.height - 50,
  width: 550,
  height: 230,
  xSpeed: 5,
  ySpeed: 0,
  jumpStrength: -10,
  maxYSpeed: 10,
  isJumping: false,
};

function drawCharacter() {
  const characterImage = new Image();
  characterImage.src = "gambar/MOBIL.png"; // Replace with the path to your character image

  ctx.drawImage(characterImage, character.x, character.y, character.width, character.height);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update() {
  clearCanvas();

  // Move character left
  if (keys.left && character.x > 0) {
    character.x -= character.xSpeed;
  }

  // Move character right
  if (keys.right && character.x < canvas.width - character.width) {
    character.x += character.xSpeed;
  }

  // Jumping mechanics
  if (keys.up && !character.isJumping && character.y === canvas.height - character.height) {
    character.ySpeed = character.jumpStrength;
    character.isJumping = true;
  }

  // Apply gravity
  character.ySpeed += 0.5;
  character.ySpeed = Math.min(character.ySpeed, character.maxYSpeed);
  character.y += character.ySpeed;

  // Check for landing
  if (character.y >= canvas.height - character.height) {
    character.y = canvas.height - character.height;
    character.ySpeed = 0;
    character.isJumping = false;
  }

  drawCharacter();
  requestAnimationFrame(update);
}

const keys = {
  left: false,
  right: false,
  up: false,
};

// Keyboard event listeners
window.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") keys.left = true;
  if (event.key === "ArrowRight") keys.right = true;
  if (event.key === "ArrowUp") keys.up = true;
});

window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") keys.left = false;
  if (event.key === "ArrowRight") keys.right = false;
  if (event.key === "ArrowUp") keys.up = false;
});

// Start the game loop
update();
