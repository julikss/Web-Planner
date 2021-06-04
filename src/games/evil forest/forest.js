const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const repeat = document.querySelector('#gameOver');

canvas.width = 800;
canvas.height = 700;
const gameSpeed = 5;
const dist = 10;
let score = 0;
let frame = 0;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'fullback.png';
audover = new Audio('gameover.mp3');

let x = 0;
let x2 = 2400;
let pos;
document.addEventListener('keydown', move);

function move(event) {
  if (event.keyCode === 32 || event.keyCode === 38)
    pos = 'up';
}

document.addEventListener('keyup', () => pos = 'down');

repeat.addEventListener('click', () => {
  location.reload();
});

class Cat {
  constructor(img) {
    this.x = 10;
    this.y = 600;
    this.img = new Image();
    this.img.src = img;
    this.width = 100;
    this.height = 100;
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  jump() {
    if (pos === 'up') {
      this.y -= dist;
    } else if (pos === 'down' && this.y < canvas.height - this.width)
      this.y += dist;
  }
}

const cat = new Cat('cat.png');

class Apple {
  constructor(img) {
    this.x = canvas.width;
    this.y = 600;
    this.img = new Image();
    this.img.src = img;
    this.width = 100;
    this.height = 100;
  }
  draw() {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }
  roll() {
    this.x -= 6;
  }
}

const apple = new Apple('apple.png');

function gameOver() {
  const catX = cat.x + cat.width;
  const catY = cat.x + cat.width;
  const appleX = apple.x + apple.width;
  const appleY = apple.x + apple.width;
  if (catX === appleX && catY === appleY) {
    gameOver.innerHTML = 'Game Over - Reload to Play Again' + score.innerText;
    repeat.style.visibility = 'visible';
    audover.play();
  } else {
    score++;
  }
}
const appleArr = [];
function jumpScore() {
  if (frame % 100 === 0) {
    appleArr.push(new Apple());
  }
  for (let i = 0; i < appleArr.length; i++) {
    if (appleArr[i].y < 0) {
      score++;
      appleArr.splice(i, 1);
    }
  }
}

function writeInCtx() {
  ctx.fillStyle = 'white';
  ctx.fillText('score:' + score, 20, 40);
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(backgroundLayer1, x, 0);
  ctx.drawImage(backgroundLayer1, x2, 0);

  if (x < -2400) x = 2400 + x2 - gameSpeed;
  else x -= gameSpeed;
  if (x2 < -2400) x2 = 2400 + x - gameSpeed;
  else x2 -= gameSpeed;

  cat.draw();
  cat.jump();
  apple.draw();
  apple.roll();
  gameOver();
  jumpScore();
  writeInCtx();
  requestAnimationFrame(animate);
}
animate();
