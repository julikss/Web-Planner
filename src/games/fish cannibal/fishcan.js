let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

let count = canvas.height;
let bubbles = [];
let bubbleCount = 20;
let bubbleSpeed = 1;
let dir;
let score = 0;
let lives = 3;

const edibleImgSrc = ['./img/clownfish.png', './img/cowfish.png', './img/goldfish.png', './img/shrimp.png', './img/greyfish.png'];
const dangerImgSrc = ['./img/cocacola.png', './img/paket.png', './img/stone.png'];
const edibleImgNames = [];
const dangerImgNames = [];
const edibleImg = [];
const dangerImg = [];
const edible = [];
const danger = [];

document.addEventListener("keydown", move);

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

for (const item of edibleImgSrc) {
    const name = item.match(/[a-zA-Z]+(?=\.)/);
    edibleImgNames.push(name.toString());
    const value = new Image();
    value.src = item;
    edibleImg.push(value);
}


for (const item of dangerImgSrc) {
    const name = item.match(/[a-zA-Z]+(?=\.)/);
    dangerImgNames.push(name.toString());
    const value = new Image();
    value.src = item;
    dangerImg.push(value);
}


function generateDir() {
    const direction = ['right', 'left', 'up', 'down'];
    return direction[Math.round(Math.random() * 3)];
}


let createEdible = function(img) {
    this.pos = { x: Math.random() * canvas.width, y: Math.random() * canvas.height };
    this.width = 210;
    this.height = 140;
    this.img = img;
    this.dir = generateDir();
    this.draw = function() {
        ctx.drawImage(this.img, this.pos.x, this.pos.y, 120, 120);
    }

    this.move = function() {

        if (this.dir == "right" && this.pos.x < Math.random() * (canvas.width - this.width)) {
            this.pos.x += 10;

        } else if (this.dir == "left" && this.pos.x > 0) {
            this.pos.x -= 10;
        } else if (this.dir == "up" && this.pos.y > 0) {
            this.pos.y -= 10;

        } else if (this.dir == "down" && this.pos.y < Math.random() * (canvas.height - this.height)) {
            this.pos.y += 10;

        }
    }
    this.remove = function() {
        ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height);
    }

}

for (let i = 0; i < edibleImg.length; i++) {
    let fish = new createEdible(edibleImg[i]);
    edible.push(fish);
}

let createDanger = function(img) {
    this.pos = { x: Math.random() * canvas.width, y: 0 };
    console.log(this.pos)
    this.width = 210;
    this.height = 140;
    this.img = img;
    this.draw = function() {
        ctx.drawImage(this.img, this.pos.x, this.pos.y, 120, 120);
    }
    this.move = function() {
        if (this.pos.y <= canvas.height - this.height) {
            this.pos.y += 10;
        } else ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height);
    }
    this.remove = function() {
        ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height);

    }
}

for (let i = 0; i < dangerImg.length; i++) {
    let item = new createDanger(dangerImg[i]);
    edible.push(item);
}

class Player {
    constructor(imgR, imgL) {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.width = 210;
        this.height = 140;
        this.imgR = new Image();
        this.imgR.src = imgR;
        this.imgL = new Image();
        this.imgL.src = imgL;
    }
    render() {
        ctx.drawImage(this.imgR, this.x, this.y, this.width, this.height);
        if (dir == "right" && this.x < canvas.width - this.width) {
            this.x += 10;
        } else if (dir == "left" && this.x > 0) {
            ctx.clearRect(this.x, this.y, this.width, this.height);
            ctx.drawImage(this.imgL, this.x, this.y, this.width, this.height);
            this.x -= 10;
        } else if (dir == "up" && this.y > 0) {
            this.y -= 10;
        } else if (dir == "down" && this.y < canvas.height - this.height) {
            this.y += 10;
        }
    }
    resize() {
        this.width += 100;
        this.height += 100;
    }
}
const player = new Player('./img/player_right.png', './img/player_left.png');

class Shark {
    constructor(imgR, imgL) {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.width = 400;
        this.height = 140;
        this.imgR = new Image();
        this.imgR.src = imgR;
        this.imgL = new Image();
        this.imgL.src = imgL;
        this.dir = generateDir();
    }
    render() {
        ctx.drawImage(this.imgR, this.x, this.y, this.width, this.height);
        if (this.dir == "right" && this.x < Math.random() * (canvas.width - this.width)) {
            this.x += 10;
        } else if (this.dir == "left" && this.x > 0) {
            ctx.clearRect(this.x, this.y, this.width, this.height);
            ctx.drawImage(this.imgL, this.x, this.y, this.width, this.height);
            this.x -= 10;
        } else if (this.dir == "up" && this.y > 0) {
            this.y -= 10;

        } else if (this.dir == "down" && this.y < Math.random() * (canvas.height - this.height)) {
            this.y += 10;

        }
    }
    remove() {
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}

const shark = new Shark('./img/shark_right.png', './img/shark_left.png');

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

function drawInfo() {
    const livesImg = new Image();
    livesImg.src = './img/lives.png';
    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.drawImage(livesImg, 10, 20, 70, 50);
    ctx.drawImage(livesImg, 80, 20, 70, 50);
    ctx.drawImage(livesImg, 150, 20, 70, 50);
    ctx.fillText('Score:' + score, 20, 100);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    player.render();
    shark.render();

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

    for (let i = 0; i < edible.length; i++) {
        edible[i].draw();
        edible[i].move();
        //does not work
        if ((edible[i].pos.x == player.x) || (edible[i].pos.y == player.y)) {
            player.resize();
            edible[i].remove();
            score++;
        }
    }
    for (let i = 0; i < danger.length; i++) {
        danger[i].draw();
        danger[i].move();
        //does not work
        if ((danger[i].pos.x == player.x) || (danger[i].pos.y == player.y)) {
            danger[i].remove();
            lives--;
            console.log(lives)
        }
    }
    drawInfo();

    requestAnimationFrame(animate);
}
animate();