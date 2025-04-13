const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const gravity = 0.5;
const mario = {
    x: 100,
    y: canvas.height - 150,
    width: 50,
    height: 50,
    speed: 5,
    dx: 0,
    dy: 0,
    jumping: false
};

function drawMario() {
    ctx.fillStyle = 'red';
    ctx.fillRect(mario.x, mario.y, mario.width, mario.height);
}

function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function newPos() {
    mario.y += mario.dy;
    mario.x += mario.dx;

    if (mario.y + mario.height < canvas.height) {
        mario.dy += gravity;
    } else {
        mario.dy = 0;
        mario.jumping = false;
        mario.y = canvas.height - mario.height;
    }
}

function update() {
    clear();
    drawMario();
    newPos();
    requestAnimationFrame(update);
}

function moveRight() {
    mario.dx = mario.speed;
}

function moveLeft() {
    mario.dx = -mario.speed;
}

function jump() {
    if (!mario.jumping) {
        mario.dy = -10;
        mario.jumping = true;
    }
}

function keyDown(e) {
    if (e.key === 'ArrowRight' || e.key === 'd') {
        moveRight();
    } else if (e.key === 'ArrowLeft' || e.key === 'a') {
        moveLeft();
    } else if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') {
        jump();
    }
}

function keyUp(e) {
    if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'ArrowLeft' || e.key === 'a') {
        mario.dx = 0;
    }
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

update();
