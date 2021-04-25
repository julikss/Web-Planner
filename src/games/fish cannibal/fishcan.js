let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

let count = canvas.height;
let bubbles = [];
let bubbleCount = 20;
let bubbleSpeed = 1;

document.addEventListener("keydown", move);

let dir;

function move(event) {
    if (event.keyCode == 37) {
        dir = "left";
    } else if (event.keyCode == 39) {
        dir = "right";
    } else if (event.keyCode == 38) {
        dir = "up";
    } else if (event.keyCode == 40) {
        dir = "down";
    }
}

const edible = ['./img/clownfish.png', './img/cowfish.png', './img/goldfish.png', './img/shrimp.png'];
const danger = ['./img/cocacola.png', './img/paket.png', './img/stone.png'];

//main player
const imgPlayer = new Image();
imgPlayer.src = './img/player.png';
class Player {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
    }
    draw() {
        ctx.drawImage(imgPlayer, this.x, this.y, 150, 150);
    }
}
const player = new Player();



//background animation
let createBubble = function() {
    this.position = { x: 0, y: 0 };
    this.radius = 10 + Math.random() * 10;
    this.xOff = Math.random() * canvas.width - this.radius;
    this.yOff = Math.random() * canvas.height;
    this.distanceBetweenWaves = 50 + Math.random() * 40;
    this.count = canvas.height + this.yOff;
    this.color = '#ffffff';
    this.maxRotation = 85;
    this.rotation = Math.floor(Math.random() * (this.maxRotation - (this.maxRotation * -1))) + (this.maxRotation * -1);
    this.rotationDirection = 'forward';
    this.resetPosition = function() {
        this.position = { x: 0, y: 0 };
        this.radius = 10 + Math.random() * 10;
        this.xOff = Math.random() * canvas.width - this.radius;
        this.yOff = Math.random() * canvas.height;
        this.distanceBetweenWaves = 50 + Math.random() * 40;
        this.count = canvas.height + this.yOff;
    }
    this.render = function() {
        if (this.rotationDirection === 'forward') {
            if (this.rotation < this.maxRotation) {
                this.rotation++;
            } else {
                this.rotationDirection = 'backward';
            }
        } else {
            if (this.rotation > this.maxRotation * -1) {
                this.rotation--;
            } else {
                this.rotationDirection = 'forward';
            }
        }

        ctx.save();
        ctx.translate(this.position.x, this.position.y);
        ctx.rotate(this.rotation * Math.PI / 180);

        ctx.beginPath();
        ctx.strokeStyle = '#ffffff';
        ctx.arc(0, 0, this.radius - 3, 0, Math.PI * 1.5, true);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
        ctx.stroke();

        ctx.restore();
    }
}

for (let i = 0; i < bubbleCount; i++) {
    let tempBubble = new createBubble();
    bubbles.push(tempBubble);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    player.draw();

    if (dir == "right" && player.x < canvas.width) {
        player.x += 10;
    } else if (dir == "left" && player.x > 0) {
        player.x -= 10;
    } else if (dir == "up" && player.y > 0) {
        player.y -= 10;
    } else if (dir == "down" && player.y < canvas.height) {
        player.y += 10;
    }

    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].position.x = Math.sin(bubbles[i].count / bubbles[i].distanceBetweenWaves) * 50 + bubbles[i].xOff;
        bubbles[i].position.y = bubbles[i].count;
        bubbles[i].render();

        if (bubbles[i].count < 0 - bubbles[i].radius) {
            bubbles[i].count = canvas.height + bubbles[i].yOff;
        } else {
            bubbles[i].count -= bubbleSpeed;
        }
    }

    window.requestAnimationFrame(animate);
}
animate();