const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
const gameSpeed = 5;

const backgroundLayer1 = new Image();
backgroundLayer1.src = 'fullback.png';

let x = 0;
let x2 = 2400;

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  ctx.drawImage(backgroundLayer1, x, 0);
  ctx.drawImage(backgroundLayer1, x2, 0);

  if (x < -2400) x = 2400 + x2 - gameSpeed;
  else x -= gameSpeed;
  if (x2 < -2400) x2 = 2400 + x - gameSpeed;
  else x2 -= gameSpeed;

  requestAnimationFrame(animate);
}
animate();

const cat = document.getElementById('cat');
const apple = document.getElementById('apple');
const score = document.getElementById('score');
const repeat = document.querySelector('#gameOver');
audplay = new Audio('sumsound.mp3');
audplay = new Audio('gameover.mp3');
function jump() {
  repeat.style.visibility = 'hidden';
  if (cat.classList !== 'jump') {
    cat.classList.add('jump');

    setTimeout(() => {
      cat.classList.remove('jump');
    }, 300);
  }
}

setInterval(() => {
  const catTop = parseInt(window.getComputedStyle(cat)
    .getPropertyValue('top'));
  const appleLeft = parseInt(window.getComputedStyle(apple)
    .getPropertyValue('left'));

  if (appleLeft < 350) apple.style.display = 'none';
  else apple.style.display = '';

  const catPos = 400;
  const applePos = 350;
  const catJ = 500;

  if (appleLeft < catPos && appleLeft > applePos && catTop > catJ) {
    repeat.style.visibility = 'visible';

    audplay.play();
    seTimeout(() => {
      audplay.pause();
      audplay.pause();
    }, 1000);
  }
}, 50);

document.addEventListener('keydown', (event) => {
  jump();
});
repeat.addEventListener('click', () => {
  location.reload();
});
