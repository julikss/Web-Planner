//canvas
const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
const repeat = document.querySelector('#gameOver');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let score = 0;
let skip = 0;
let gameFrame = 0;
let lives = 5;
let allTotal = localStorage.getItem('allTotal');
allTotal = JSON.parse(allTotal);
document.getElementById('allTotal').value = allTotal;
ctx.font = '30px arial';

//sound
const bulMusic = document.createElement('audio');
bulMusic.src = './sound/soundBul.mp3';
const gameOverMusic = document.createElement('audio');
gameOverMusic.src = './sound/gameover.mp3';

//mouse
let canvasPosition = canvas.getBoundingClientRect();
const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};
canvas.addEventListener('mousemove', function (event) {
  mouse.x = event.x - canvasPosition.left;
  mouse.y = event.y - canvasPosition.top;
});

//player
const imgPlayer = new Image();
imgPlayer.src = './img/player.png';
class Player {
  constructor() {
    this.x = canvas.width;
    this.y = canvas.height / 2;
    this.radius = 60;
  }
  update() {
    const dx = this.x - mouse.x;
    const dy = this.y - mouse.y;
    if (mouse.x != this.x) {
      this.x -= dx / 15;
    }
    if (mouse.y != this.y) {
      this.y -= dy / 15;
    }
  }
  draw() {
    if (mouse.move) {
      ctx.lineWidth = 0.1;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    }
    ctx.fillStyle = 'rgba(219, 204, 68)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.fillRect(this.x, this.y, this.radius, 0);
    ctx.drawImage(imgPlayer, this.x - 80, this.y - 80, 150, 150);
  }
}
const player = new Player();

//small bulbul
const bulArray = [];
const imgBul = new Image();
imgBul.src = './img/bul.png';
class Bul {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height + 100;
    this.radius = 50;
    this.speed = Math.random() * 6 + 1;
    this.distance = 0;
    this.count = false;
    this.sound = 'sound';
  }
  update() {
    this.y -= this.speed;
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    this.distance = Math.sqrt(dx * dx + dy * dy);
  }
  draw() {
    ctx.fillStyle = '#161c22';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.stroke();
    ctx.drawImage(imgBul, this.x - 50, this.y - 50, 100, 100);
  }
}

function handlyBul() {
  if (gameFrame % 50 == 0) {
    bulArray.push(new Bul());
  }
  for (let i = 0; i < bulArray.length; i++) {
    if (bulArray[i].y < 0) {
      skip++;
      bulArray.splice(i, 1);
    }
    bulArray[i].update();
    bulArray[i].draw();
    if (bulArray[i].distance < bulArray[i].radius + player.radius) {
      if (!bulArray[i].count) {
        bulMusic.play();
        score++;
        bulArray[i].count = true;
        bulArray.splice(i, 1);
      }
    }
  }
}

//danger fish
const dangerFishImage = new Image();
dangerFishImage.src = './img/dangerFish.png';
class DangerFish {
  constructor() {
    this.x = 0;
    this.y = Math.random() * canvas.height;
    this.radius = 50;
    this.speed = Math.random() * 2 + 2;
  }
  draw() {
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.drawImage(dangerFishImage, this.x - 130, this.y - 130, 200, 200);
  }
  update() {
    this.x += this.speed;
    if (this.x > canvas.width - this.radius * 2) {
      this.x = 0;
      this.y = Math.random() * canvas.height;
      this.speed = Math.random() * 2 + 3;
    }
    const dx = this.x - player.x;
    const dy = this.y - player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < this.radius + player.radius) {
      lives--;
    }
  }
}
const dangerFish1 = new DangerFish();

function handlyDangerfish() {
  dangerFish1.draw();
  dangerFish1.update();
}

//inscription on canvas
function writeInCtx() {
  ctx.fillStyle = 'white';
  ctx.fillText(`lives: ${lives - skip}♥ `, 20, 80);
  ctx.fillText('score:' + score, 20, 40);
}

function gameOver() {
  allTotal += Math.round(score / 10);
  localStorage.setItem('allTotal', JSON.stringify(allTotal));
  document.getElementById('allTotal').value = allTotal;
  bulArray.count = true;
  for (let i = 0; i < bulArray.length; i++) {
    bulArray.splice(i);
  }
  repeat.style.visibility = 'visible';
  gameOverMusic.play();
}

//animation
function animation() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  repeat.style.visibility = 'hidden';
  handlyBul();
  if (score >= 15) handlyDangerfish();
  player.update();
  player.draw();
  writeInCtx();
  if (skip == lives) {
    gameOver();
    return;
  }
  gameFrame++;
  requestAnimationFrame(animation);
}
animation();
repeat.addEventListener('click', function () {
  location.href = location.href;
});