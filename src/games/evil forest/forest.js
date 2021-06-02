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

function jump() {
  if (cat.classList != 'jump') {
    cat.classList.add('jump');

    setTimeout(() => {
      cat.classList.remove('jump');
    }, 300);
  }
}

document.addEventListener('keydown', (event) => {
  jump();
});
