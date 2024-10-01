const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const snakeHeadImg = new Image();
snakeHeadImg.src = '1.jpg';

const targets = ['2.png', '3.png', '4.png'].map(src => {
    const img = new Image();
    img.src = src;
    return img;
});

canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.8;

let snake = [{ x: 50, y: 50 }];
let target = { x: getRandomInt(canvas.width), y: getRandomInt(canvas.height) };
let score = 0;
let speed = 5;

const bgMusic = document.getElementById('bg-music');

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    snake.forEach((segment, index) => {
        if (index === 0) {
            ctx.drawImage(snakeHeadImg, segment.x, segment.y, 30, 30);
        } else {
            ctx.fillStyle = 'red';
            ctx.fillRect(segment.x, segment.y, 30, 30);
        }
    });

    // Move snake
    const head = { ...snake[0] };
    head.x += direction.x * speed;
    head.y += direction.y * speed;

    // Borderless world logic
    if (head.x >= canvas.width) head.x = 0;
    if (head.y >= canvas.height) head.y = 0;
    if (head.x < 0) head.x = canvas.width;
    if (head.y < 0) head.y = canvas.height;

    snake.unshift(head);
    snake.pop();

    // Check if snake eats target
    if (Math.abs(head.x - target.x) < 30 && Math.abs(head.y - target.y) < 30) {
        score++;
        snake.push({ x: head.x, y: head.y });
        target = { x: getRandomInt(canvas.width), y: getRandomInt(canvas.height) };
    }

    // Draw target
    const targetImg = targets[Math.floor(Math.random() * targets.length)];
    ctx.drawImage(targetImg, target.x, target.y, 30, 30);

    // Check for collision with itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            // Reset game
            snake = [{ x: 50, y: 50 }];
            score = 0;
        }
    }

    requestAnimationFrame(gameLoop);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

requestAnimationFrame(gameLoop);
