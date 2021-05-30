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


document.addEventListener('keydown', move);
document.addEventListener('keyup', () => dir = 'still');

function move(event) {
    if (event.keyCode == 37) {
        dir = 'left';
    } else if (event.keyCode == 39) {
        dir = 'right';
    } else if (event.keyCode == 38) {
        dir = 'up';
    } else if (event.keyCode == 40) {
        dir = 'down';
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



function generateDir(el) {
    let direction = ['right', 'left', 'up', 'down'];
    let index = direction.indexOf(el);
    direction.splice(index, 1);
    return direction[Math.floor(Math.random() * direction.length)];
}


let createEdible = function(img) {
    this.pos = { x: Math.random() * canvas.width, y: Math.random() * canvas.height };
    this.width = 120;
    this.height = 80;
    this.img = img;
    this.dir = ['right', 'left', 'up', 'down'][Math.floor(Math.random() * 3)];

    this.EndCoord = function() {
        if (this.dir == 'right')
            return xEnd = Math.random() * (canvas.width - this.width - this.pos.x) + this.pos.x;
        if (this.dir == 'left')
            return xEnd = Math.random() * this.pos.x;
        if (this.dir == 'up')
            return yEnd = Math.random() * this.pos.y;
        if (this.dir == 'down')
            return xEnd = Math.random() * (canvas.height - this.height - this.pos.y) + this.pos.y;
    }
    this.xEnd = this.EndCoord();
    this.yEnd = this.EndCoord();
    this.draw = function() {
        ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
    }

    this.move = function() {

        if (this.dir == 'right') {

            if (this.pos.x >= this.xEnd) {
                this.dir = generateDir(this.dir);
                this.xEnd = this.EndCoord();
                this.yEnd = this.EndCoord();
            } else this.pos.x += 5;

        } else if (this.dir == 'left') {

            if (this.pos.x <= this.xEnd) {
                this.dir = generateDir(this.dir);
                this.xEnd = this.EndCoord();
                this.yEnd = this.EndCoord();
            } else this.pos.x -= 5;
        } else if (this.dir == 'up') {

            if (this.pos.y <= this.yEnd) {
                this.dir = generateDir(this.dir);
                this.xEnd = this.EndCoord();
                this.yEnd = this.EndCoord();
            } else this.pos.y -= 5;

        } else if (this.dir == 'down') {

            if (this.pos.y >= this.yEnd) {
                this.dir = generateDir(this.dir);
                this.xEnd = this.EndCoord();
                this.yEnd = this.EndCoord();
            } else this.pos.y += 5;
        }
    }
    this.remove = function() {
        this.pos.x = canvas.width + this.width;
        this.pos.y = canvas.height + this.height;

        ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height);
    }

}

for (let i = 0; i < edibleImg.length; i++) {
    let fish = new createEdible(edibleImg[i]);
    edible.push(fish);
}


let createDanger = function(img) {
    this.pos = { x: Math.random() * canvas.width, y: 0 };
    this.width = 210;
    this.height = 140;
    this.img = img;
    this.draw = function() {
        ctx.drawImage(this.img, this.pos.x, this.pos.y, 120, 120);
    }
    this.move = function() {
        if (this.pos.y <= canvas.height - this.height) {
            this.pos.y += 10;
        } else {
            this.pos.y = -this.height;
            this.pos.x = Math.random() * canvas.width;
            ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height);
        }
    }
    this.remove = function() {
        this.pos.y = -this.height;
        this.pos.x = Math.random() * canvas.width;
        ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height);

    }
}

for (let i = 0; i < dangerImg.length; i++) {
    let item = new createDanger(dangerImg[i]);
    danger.push(item);
}


class Player {
    constructor(imgR, imgL) {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.width = 120;
        this.height = 80;
        this.imgR = new Image();
        this.imgR.src = imgR;
        this.imgL = new Image();
        this.imgL.src = imgL;
    }
    render() {
        ctx.drawImage(this.imgR, this.x, this.y, this.width, this.height);
        if (dir == 'right' && this.x < canvas.width - this.width) {
            this.x += 10;
        } else if (dir == 'left' && this.x > 0) {
            ctx.clearRect(this.x, this.y, this.width, this.height);
            ctx.drawImage(this.imgL, this.x, this.y, this.width, this.height);
            this.x -= 10;
        } else if (dir == 'up' && this.y > 0) {
            this.y -= 10;
        } else if (dir == 'down' && this.y < canvas.height - this.height) {
            this.y += 10;
        }
    }
    makeBigger() {
        this.width += 5;
        this.height += 5;
    }
    makeSmaller() {
        this.width -= 5;
        this.height -= 5;
    }
    remove() {
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}

const player = new Player('./img/player_right.png', './img/player_left.png');


class Shark {
    constructor(imgR, imgL) {
        this.width = 400;
        this.height = 140;
        this.x = this.width;
        this.y = canvas.height - this.height;
        this.imgR = new Image();
        this.imgR.src = imgR;
        this.imgL = new Image();
        this.imgL.src = imgL;
        this.dir = ['right', 'left', 'up', 'down'][Math.floor(Math.random() * 3)];
        this.xEnd = xEnd;
        this.yEnd = yEnd;
    }

    EndCoord() {
        if (this.dir == 'right')
            return xEnd = Math.random() * (canvas.width - this.width - this.x) + this.x;
        if (this.dir == 'left')
            return xEnd = Math.random() * this.x;
        if (this.dir == 'up')
            return yEnd = Math.random() * this.y;
        if (this.dir == 'down')
            return xEnd = Math.random() * (canvas.height - this.height - this.y) + this.y;
    }

    render() {

        ctx.drawImage(this.imgR, this.x, this.y, this.width, this.height);
        if (this.dir == 'right') {

            if (this.x >= this.xEnd) {
                this.dir = generateDir(this.dir);
                this.xEnd = this.EndCoord();
                this.yEnd = this.EndCoord();
            } else this.x += 5;

        } else if (this.dir == 'left') {
            ctx.clearRect(this.x, this.y, this.width, this.height);
            ctx.drawImage(this.imgL, this.x, this.y, this.width, this.height);
            if (this.x <= this.xEnd) {
                this.dir = generateDir(this.dir);
                this.xEnd = this.EndCoord();
                this.yEnd = this.EndCoord();
            } else this.x -= 5;
        } else if (this.dir == 'up') {

            if (this.y <= this.yEnd) {
                this.dir = generateDir(this.dir);
                this.xEnd = this.EndCoord();
                this.yEnd = this.EndCoord();
            } else this.y -= 5;

        } else if (this.dir == 'down') {

            if (this.y >= this.yEnd) {
                this.dir = generateDir(this.dir);
                this.xEnd = this.EndCoord();
                this.yEnd = this.EndCoord();
            } else this.y += 5;
        }

    }
    remove() {
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}

const shark = new Shark('./img/shark_right.png', './img/shark_left.png');


//background animation
let createBubble = function() {
    this.pos = { x: 0, y: 0 };
    this.radius = 10 + Math.random() * 10;
    this.xOff = Math.random() * canvas.width - this.radius;
    this.yOff = Math.random() * canvas.height;
    this.distanceBetweenWaves = 50 + Math.random() * 40;
    this.count = canvas.height + this.yOff;
    this.maxRotation = 85;
    this.rotation = Math.floor(Math.random() * (this.maxRotation - (this.maxRotation * -1))) + (this.maxRotation * -1);
    this.rotationDirection = 'forward';
    this.resetPos = function() {
        this.pos = { x: 0, y: 0 };
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
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.arc(0, 0, this.radius - 3, 0, Math.PI * 1.5, true);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.restore();
    }
}

for (let i = 0; i < bubbleCount; i++) {
    let bubble = new createBubble();
    bubbles.push(bubble);
}


function drawInfo() {
    const livesImg = new Image();
    livesImg.src = './img/lives.png';
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    let diff = 0;
    for (let i = 0; i < lives; i++) {
        ctx.drawImage(livesImg, 10 + diff, 20, 70, 50);
        diff += 70;
    }
    ctx.fillText(`Score: ${score}`, 20, 100);
}

function gameOver() {
    const loser = new Image();
    loser.src = './img/loser.png';
    ctx.fillStyle = 'red';
    ctx.font = 'bold 50px Arial';
    if (lives == 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(loser, canvas.width / 2 - 250, canvas.height / 2 - 200, 500, 500);
        ctx.fillText('GAME OVER!!!', canvas.width / 2 - 220, canvas.height / 2 - 350);
        console.log('GAME OVER!!!');
        ctx.fillText(`Your score: ${score}`, canvas.width / 2 - 200, canvas.height / 2 - 300);
        //tryAgain.style.visibility = 'visible';
        //exit.style.visibility = 'visible';
    }
}

function gameWin() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'red';
    ctx.font = 'bold 50px Arial';
    setTimeout(() => {
        ctx.fillText('GONGRATULATIONS!!!', canvas.width / 2 - 220, canvas.height / 2 - 350);
    }, 0);
    ctx.fillText(`Your score: ${score}`, canvas.width / 2 - 200, canvas.height / 2 - 300);
    //tryAgain.style.visibility = 'visible';
    //exit.style.visibility = 'visible';

}

function sharkMeet() {
    let collisionX = false;
    let collisionY = false;

    if ((shark.x >= player.x) && (shark.x <= player.x + player.width)) collisionX = true;
    if ((player.x >= shark.x) && (player.x <= shark.x + shark.width)) collisionX = true;
    if ((shark.y >= player.y) && (shark.y <= player.y + player.height)) collisionY = true;
    if ((player.y >= shark.y) && (player.y <= shark.y + shark.height)) collisionY = true;

    if (collisionX && collisionY) {
        if (player.width == shark.width && player.height == shark.height) {
            shark.remove();
            //gameWin();
        } else {
            player.remove();
            lives = 0;
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //tryAgain.style.visibility = 'hidden';
    //exit.style.visibility = 'hidden';
    //start.style.visibility = 'hidden';
    player.render();
    shark.EndCoord();
    shark.render();
    sharkMeet();


    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].pos.x = Math.sin(bubbles[i].count / bubbles[i].distanceBetweenWaves) * 50 + bubbles[i].xOff;
        bubbles[i].pos.y = bubbles[i].count;
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

        let collisionX = false;
        let collisionY = false;

        if ((edible[i].pos.x >= player.x) && (edible[i].pos.x <= player.x + player.width)) collisionX = true;
        if ((player.x >= edible[i].pos.x) && (player.x <= edible[i].pos.x + edible[i].width)) collisionX = true;
        if ((edible[i].pos.y >= player.y) && (edible[i].pos.y <= player.y + player.height)) collisionY = true;
        if ((player.y >= edible[i].pos.y) && (player.y <= edible[i].pos.y + edible[i].height)) collisionY = true;

        if (collisionX && collisionY && player.width <= shark.width && player.height <= shark.height) {
            player.makeBigger();
            edible[i].remove();
            score++;
        }
    }


    for (let i = 0; i < danger.length; i++) {
        danger[i].draw();
        danger[i].move();
        let collisionX = false;
        let collisionY = false;

        if ((danger[i].pos.x >= player.x) && (danger[i].pos.x <= player.x + player.width)) collisionX = true;
        if ((player.x >= danger[i].pos.x) && (player.x <= danger[i].pos.x + danger[i].width)) collisionX = true;
        if ((danger[i].pos.y >= player.y) && (danger[i].pos.y <= player.y + player.height)) collisionY = true;
        if ((player.y >= danger[i].pos.y) && (player.y <= danger[i].pos.y + danger[i].height)) collisionY = true;

        if (collisionX && collisionY) {
            player.makeSmaller();
            danger[i].remove();
            lives--;
        }
    }

    drawInfo();
    gameOver();

    requestAnimationFrame(animate);
}
animate();