let canvas = document.getElementById('canvas');
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


const edibleImgSrc = ['./img/clownfish.png', './img/cowfish.png', './img/goldfish.png', './img/shrimp.png', './img/greyfish.png'];
const dangerImgSrc = ['./img/cocacola.png', './img/paket.png', './img/stone.png'];

const edible = {};
const danger = {};

const edibleImg = [];
const edibleImgNames = [];
const dangerImg = [];
const dangerImgNames = [];

for (const item of edibleImgSrc) {
    const key = item.match(/[a-zA-Z]+(?=\.)/);
    const value = new Image();
    value.src = item;
    edible[key] = value;
}
for (const item of Object.keys(edible)) {
    edibleImgNames.push(item);
}
console.log(edibleImgNames); // prints imagenames

for (const item of Object.values(edible)) {
    edibleImg.push(item);
}
console.log(edibleImg);


/*for (const item of dangerImgSrc) {
    const key = item.match(/[a-zA-Z]+(?=\.)/);
    const value = new Image();
    value.src = item;
    danger[key] = value;
}

for (const item of Object.keys(danger)) {
    dangerImgNames.push(item);
}
console.log(dangerImgNames); // prints imagenames

for (const item of Object.values(danger)) {
    dangerImg.push(item);
}
console.log(dangerImg);*/

let coordinatesOfEdible = {
    x: Math.round(Math.random() * canvas.width),
    y: Math.round(Math.random() * canvas.height),
}
console.log(coordinatesOfEdible);

class Edible {
    constructor(x, y, img) {
        this.img = img;
        this.x = x;
        this.y = y;
        this.width = 80;
    }
    draw() {
        ctx.drawImage(this.img, this.x, this.y, 80, 80);
    }
    move() {
        this.x += 100;
        if (this.x == canvas.width - this.width) this.x -= 100;
    }
}


//main player
const playerRight = new Image();
playerRight.src = './img/player_right.png';
const playerLeft = new Image();
playerLeft.src = './img/player_left.png';

class Player {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.width = 210;
        this.height = 140;
    }
    draw() {
        let side = "right";
        ctx.drawImage(playerRight, this.x, this.y, this.width, this.height);
        if (dir == "left" && side == "right") {
            side = "left";
            ctx.clearRect(this.x, this.y, this.width, this.height);
            ctx.drawImage(playerLeft, this.x, this.y, this.width, this.height);
        }
    }
    move() {
        if (dir == "right" && this.x < canvas.width - this.width) {
            this.x += 10;
        } else if (dir == "left" && this.x > 0) {
            this.x -= 10;
        } else if (dir == "up" && this.y > 0) {
            this.y -= 10;
        } else if (dir == "down" && this.y < canvas.height - this.height) {
            this.y += 10;
        }
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
    player.move();

    for (let i = 0; i < edibleImg.length; i++) {
        const index = Object.keys(edible).length;
        edibleImgNames[index] = new Edible(coordinatesOfEdible.x + 150, coordinatesOfEdible.y + 150, edibleImg[i]); //problem
        edibleImgNames[index].draw();
        edibleImgNames[index].move();
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