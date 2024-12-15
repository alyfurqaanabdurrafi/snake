const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 400;

// Snake settings
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * 20) * 20, y: Math.floor(Math.random() * 20) * 20 };
let score = 0;
const tileSize = 20;

// Game loop speed
let gameSpeed = 100;

// Draw the snake
function drawSnake() {
  ctx.fillStyle = 'lime';
  snake.forEach(segment => ctx.fillRect(segment.x, segment.y, tileSize, tileSize));
}

// Move the snake
function moveSnake() {
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
  snake.unshift(head);

  // Check collision with food
  if (head.x === food.x && head.y === food.y) {
    score++;
    generateFood();
  } else {
    snake.pop(); // Remove the tail
  }

  // Check collision with walls
  if (
    head.x < 0 || head.y < 0 ||
    head.x >= canvas.width || head.y >= canvas.height ||
    snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    gameOver();
  }
}

// Draw the food
function drawFood() {
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, tileSize, tileSize);
}

// Generate new food
function generateFood() {
  food.x = Math.floor(Math.random() * (canvas.width / tileSize)) * tileSize;
  food.y = Math.floor(Math.random() * (canvas.height / tileSize)) * tileSize;
}

// Display score
function displayScore() {
  ctx.fillStyle = 'white';
  ctx.font = '20px Arial';
  ctx.fillText(`Score: ${score}`, 10, 20);
}

// Handle game over
function gameOver() {
  alert(`Game Over! Your score: ${score}`);
  snake = [{ x: 200, y: 200 }];
  direction = { x: 0, y: 0 };
  score = 0;
  generateFood();
}

// Game loop
function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawSnake();
  drawFood();
  displayScore();
  moveSnake();
  setTimeout(gameLoop, gameSpeed);
}

// Handle keyboard input
document.addEventListener('keydown', event => {
  switch (event.key) {
    case 'ArrowUp':
      if (direction.y === 0) direction = { x: 0, y: -tileSize };
      break;
    case 'ArrowDown':
      if (direction.y === 0) direction = { x: 0, y: tileSize };
      break;
    case 'ArrowLeft':
      if (direction.x === 0) direction = { x: -tileSize, y: 0 };
      break;
    case 'ArrowRight':
      if (direction.x === 0) direction = { x: tileSize, y: 0 };
      break;
  }
});

// Start the game
generateFood();
gameLoop();
