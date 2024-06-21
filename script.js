const canvas = document.getElementById('gameCanvas');
const context = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// Variáveis do jogo
let paddleWidth = 10;
let paddleHeight = 100;
let playerX = 0;
let playerY = (canvas.height - paddleHeight) / 2;
let aiX = canvas.width - paddleWidth;
let aiY = (canvas.height - paddleHeight) / 2;
let ballSize = 10;
let ballX = (canvas.width - ballSize) / 2;
let ballY = (canvas.height - ballSize) / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;
let playerSpeed = 8;

// Função para desenhar o tabuleiro
function drawBoard() {
    context.fillStyle = '#333';
    context.fillRect(0, 0, canvas.width, canvas.height);
}

// Função para desenhar a raquete
function drawPaddle(x, y, width, height) {
    context.fillStyle = '#fff';
    context.fillRect(x, y, width, height);
}

// Função para desenhar a bola
function drawBall(x, y, size) {
    context.fillStyle = '#fff';
    context.fillRect(x, y, size, size);
}

// Função para mover a bola
function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY <= 0 || ballY + ballSize >= canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX <= 0) {
        resetBall();
    }

    if (ballX + ballSize >= canvas.width) {
        resetBall();
    }
}

// Função para resetar a bola
function resetBall() {
    ballX = (canvas.width - ballSize) / 2;
    ballY = (canvas.height - ballSize) / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = 4;
}

// Função para detectar colisão
function detectCollision() {
    if (ballX <= playerX + paddleWidth && ballY + ballSize >= playerY && ballY <= playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX + ballSize >= aiX && ballY + ballSize >= aiY && ballY <= aiY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }
}

// Função para mover a raquete do jogador
function movePlayerPaddle() {
    document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case 'ArrowUp':
                if (playerY > 0) {
                    playerY -= playerSpeed;
                }
                break;
            case 'ArrowDown':
                if (playerY < canvas.height - paddleHeight) {
                    playerY += playerSpeed;
                }
                break;
        }
    });
}

// Função para mover a raquete da IA
function moveAIPaddle() {
    if (aiY + paddleHeight / 2 < ballY) {
        aiY += 6;
    } else {
        aiY -= 6;
    }
}

// Função principal do jogo
function gameLoop() {
    drawBoard();
    drawPaddle(playerX, playerY, paddleWidth, paddleHeight);
    drawPaddle(aiX, aiY, paddleWidth, paddleHeight);
    drawBall(ballX, ballY, ballSize);
    moveBall();
    detectCollision();
    moveAIPaddle();

    requestAnimationFrame(gameLoop);
}

movePlayerPaddle();
gameLoop();
