const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');
const game = document.querySelector('#game');
canvas.width = document.body.clientWidth;
canvas.height = document.body.clientHeight;

const bubbles = [];
const bubbleCount = 20;
const bubbleSpeed = 1;
let dir;
let score = 0;
let lives = 3;
const speed = 5;
const size = 8;
const direction = ['right', 'left', 'up', 'down'];

const edibleImgSrc = ['./img/clown.png', './img/cowfish.png', './img/goldfish.png', './img/shrimp.png', './img/fish.png'];
const dangerImgSrc = ['./img/coca.png', './img/paket.png', './img/stone.png'];
const edibleImgNames = [];
const dangerImgNames = [];
const edibleImg = [];
const dangerImg = [];
const edible = [];
const danger = [];

document.addEventListener('keydown', move);
document.addEventListener('keyup', () => dir = 'still');
game.addEventListener('click', () => location.reload());

function move(event) {
    if (event.keyCode === 37) {
        dir = 'left';
    } else if (event.keyCode === 39) {
        dir = 'right';
    } else if (event.keyCode === 38) {
        dir = 'up';
    } else if (event.keyCode === 40) {
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

function generateDir(dir) {
    const dirRest = ['right', 'left', 'up', 'down'];
    const index = dirRest.indexOf(dir);
    dirRest.splice(index, 1);
    return dirRest[Math.floor(Math.random() * dirRest.length)];
}

class Edible {
    constructor(img) {
        this.pos = {
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height
        };
        this.width = 120;
        this.height = 80;
        this.img = img;
        this.dir = direction[Math.floor(Math.random() * direction.length)];
        this.xEnd;
        this.yEnd;
    }

    endCoord() {
        if (this.dir === 'right') {
            this.xEnd = Math.random() * (canvas.width - this.width - this.pos.x) + this.pos.x;
            return this.xEnd;
        }
        if (this.dir === 'left') {
            this.xEnd = Math.random() * this.pos.x;
            return this.xEnd;
        }
        if (this.dir === 'up') {
            this.yEnd = Math.random() * this.pos.y;
            return this.yEnd;
        }
        if (this.dir === 'down') {
            this.yEnd = Math.random() * (canvas.height - this.height - this.pos.y) + this.pos.y;
            return this.yEnd;
        }
    }

    draw() {
        ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
    }

    move() {
        if (this.dir === 'right') {
            if (this.pos.x >= this.xEnd) {
                this.dir = generateDir(this.dir);
                this.xEnd = this.endCoord();
                this.yEnd = this.endCoord();
            } else { this.pos.x += speed; }
        } else if (this.dir === 'left') {
            if (this.pos.x <= this.xEnd) {
                this.dir = generateDir(this.dir);
                this.xEnd = this.endCoord();
                this.yEnd = this.endCoord();
            } else { this.pos.x -= speed; }
        } else if (this.dir === 'up') {
            if (this.pos.y <= this.yEnd) {
                this.dir = generateDir(this.dir);
                this.xEnd = this.endCoord();
                this.yEnd = this.endCoord();
            } else { this.pos.y -= speed; }
        } else if (this.dir === 'down') {
            if (this.pos.y >= this.yEnd) {
                this.dir = generateDir(this.dir);
                this.xEnd = this.endCoord();
                this.yEnd = this.endCoord();
            } else { this.pos.y += speed; }
        }
    }

    remove() {
        this.pos.x = canvas.width + this.width;
        this.pos.y = canvas.height + this.height;
        ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height);
    }
}

for (let i = 0; i < edibleImg.length; i++) {
    const item = new Edible(edibleImg[i]);
    edible.push(item);
}

class BonusFish extends Edible {}
const bonusFishImg = new Image();
bonusFishImg.src = './img/bonusfish.png';
const bonusFish = new BonusFish(bonusFishImg);

class Danger {
    constructor(img) {
        this.pos = { x: Math.random() * canvas.width, y: 0 };
        this.width = 80;
        this.height = 80;
        this.img = img;
    }

    draw() {
        ctx.drawImage(this.img, this.pos.x, this.pos.y, this.width, this.height);
    }

    move() {
        if (this.pos.y <= canvas.height - this.height) {
            this.pos.y += speed;
        } else {
            this.pos.y = -this.height;
            this.pos.x = Math.random() * canvas.width;
            ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height);
        }
    }

    remove() {
        this.pos.y = -this.height;
        this.pos.x = Math.random() * canvas.width;
        ctx.clearRect(this.pos.x, this.pos.y, this.width, this.height);
    }
}

for (let i = 0; i < dangerImg.length; i++) {
    const item = new Danger(dangerImg[i]);
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
        if (dir === 'right' && this.x < canvas.width - this.width) {
            this.x += speed;
        } else if (dir === 'left' && this.x > 0) {
            ctx.clearRect(this.x, this.y, this.width, this.height);
            ctx.drawImage(this.imgL, this.x, this.y, this.width, this.height);
            this.x -= speed;
        } else if (dir === 'up' && this.y > 0) {
            this.y -= speed;
        } else if (dir === 'down' && this.y < canvas.height - this.height) {
            this.y += speed;
        }
    }

    makeBigger() {
        this.width += size;
        this.height += size;
    }

    makeSmaller() {
        this.width -= size;
        this.height -= size;
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
        this.dir = direction[Math.floor(Math.random() * direction.length)];
        this.xEnd;
        this.yEnd;
    }

    endCoord() {
        if (this.dir === 'right') {
            this.xEnd = Math.random() * (canvas.width - this.width - this.x) + this.x;
            return this.xEnd;
        }
        if (this.dir === 'left') {
            this.xEnd = Math.random() * this.x;
            return this.xEnd;
        }
        if (this.dir === 'up') {
            this.yEnd = Math.random() * this.y;
            return this.yEnd;
        }
        if (this.dir === 'down') {
            this.yEnd = Math.random() * (canvas.height - this.height - this.y) + this.y;
            return this.yEnd;
        }
    }

    render() {
        ctx.drawImage(this.imgR, this.x, this.y, this.width, this.height);
        if (this.dir === 'right') {
            if (this.x >= this.xEnd) {
                this.dir = generateDir(this.dir);
                this.xEnd = this.endCoord();
                this.yEnd = this.endCoord();
            } else this.x += speed;
        } else if (this.dir === 'left') {
            ctx.clearRect(this.x, this.y, this.width, this.height);
            ctx.drawImage(this.imgL, this.x, this.y, this.width, this.height);
            if (this.x <= this.xEnd) {
                this.dir = generateDir(this.dir);
                this.xEnd = this.endCoord();
                this.yEnd = this.endCoord();
            } else this.x -= speed;
        } else if (this.dir === 'up') {
            if (this.y <= this.yEnd) {
                this.dir = generateDir(this.dir);
                this.xEnd = this.endCoord();
                this.yEnd = this.endCoord();
            } else this.y -= speed;
        } else if (this.dir === 'down') {
            if (this.y >= this.yEnd) {
                this.dir = generateDir(this.dir);
                this.xEnd = this.endCoord();
                this.yEnd = this.endCoord();
            } else this.y += speed;
        }
    }

    remove() {
        ctx.clearRect(this.x, this.y, this.width, this.height);
    }
}

const shark = new Shark('./img/shark_right.png', './img/shark_left.png');

class Bubble {
    constructor() {
        this.pos = { x: 0, y: 0 };
        this.radius = 10 + Math.random() * 10;
        this.endPos = {
            x: Math.random() * canvas.width - this.radius,
            y: Math.random() * canvas.height
        };
        this.distance = 50 + Math.random() * 40;
        this.count = canvas.height + this.endPos.y;
        this.maxRotate = 85;
        this.minRotate = this.maxRotate * -1;
        this.rotate = Math.floor(Math.random() * (this.maxRotate - this.minRotate)) + this.minRotate;
        this.rotateDir = 'forward';
    }

    resetPos() {
        this.pos = { x: 0, y: 0 };
        this.radius = 10 + Math.random() * 10;
        this.endPos = {
            x: Math.random() * canvas.width - this.radius,
            y: Math.random() * canvas.height
        };
        this.distance = 50 + Math.random() * 40;
        this.count = canvas.height + this.endPos.y;
    }

    render() {
        if (this.rotateDir === 'forward') {
            if (this.rotate < this.maxRotate) {
                this.rotate++;
            } else {
                this.rotateDir = 'backward';
            }
        } else if (this.rotate > this.minRotate) {
            this.rotate--;
        } else {
            this.rotateDir = 'forward';
        }
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.rotate * Math.PI / 180);
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
    const bubble = new Bubble();
    bubbles.push(bubble);
}

function drawBonusFish() {
    bonusFish.endCoord();
    bonusFish.draw();
    bonusFish.move();
    if (collide(bonusFish.pos.x, bonusFish.pos.y, bonusFish.width, bonusFish.height)) {
        bonusFish.remove();
        if (lives <= 2) lives++;
        else score++;
    }
}

function drawDanger() {
    for (let i = 0; i < danger.length; i++) {
        danger[i].draw();
        danger[i].move();
        if (collide(danger[i].pos.x, danger[i].pos.y, danger[i].width, danger[i].height)) {
            player.makeSmaller();
            danger[i].remove();
            lives--;
        }
    }
}

function drawEdible() {
    for (let i = 0; i < edible.length; i++) {
        edible[i].endCoord();
        edible[i].draw();
        edible[i].move();
        if (collide(edible[i].pos.x, edible[i].pos.y, edible[i].width, edible[i].height)) {
            if (player.width <= shark.width && player.height <= shark.height) {
                player.makeBigger();
                edible[i].remove();
                score++;
            }
        }
    }
}

function drawBubbles() {
    for (let i = 0; i < bubbles.length; i++) {
        bubbles[i].pos.x = Math.sin(bubbles[i].count / bubbles[i].distance) * 50 + bubbles[i].endPos.x;
        bubbles[i].pos.y = bubbles[i].count;
        bubbles[i].render();

        if (bubbles[i].count < 0 - bubbles[i].radius)
            bubbles[i].count = canvas.height + bubbles[i].endPos.y;
        else bubbles[i].count -= bubbleSpeed;
    }
}

function drawInfo() {
    const livesImg = new Image();
    livesImg.src = './img/lives.png';
    const imgWidth = 70;
    const imgHeight = 50;
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    let diff = 0;
    for (let i = 0; i < lives; i++) {
        ctx.drawImage(livesImg, 10 + diff, 20, imgWidth, imgHeight);
        diff += imgWidth;
    }
    ctx.fillText(`Score: ${score}`, 20, 100);
}

function gameOver() {
    const loser = new Image();
    loser.src = './img/loser.png';
    ctx.fillStyle = '#410606';
    ctx.font = 'bold 50px san-serif';
    if (lives === 0) {
        cancelAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(loser, canvas.width / 2 - 250, canvas.height / 2 - 200, 500, 500);
        ctx.fillText('GAME OVER!', canvas.width / 2 - 200, canvas.height / 2 - 350);
        ctx.fillText(`Your score: ${score}`, canvas.width / 2 - 200, canvas.height / 2 - 300);
        game.style.visibility = 'visible';
    }
}

function gameWin() {
    cancelAnimationFrame(animate);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#410606';
    ctx.font = 'bold 50px san-serif';
    ctx.fillText('GONGRATULATIONS!', canvas.width / 2 - 220, canvas.height / 2 - 350);
    ctx.fillText(`Your score: ${score}`, canvas.width / 2 - 200, canvas.height / 2 - 300);
    game.style.visibility = 'visible';
}

function collide(x, y, width, height) {
    let collideX = false;
    let collideY = false;
    if ((x >= player.x) && (x <= player.x + player.width)) collideX = true;
    if ((player.x >= x) && (player.x <= x + width)) collideX = true;
    if ((y >= player.y) && (y <= player.y + player.height)) collideY = true;
    if ((player.y >= y) && (player.y <= y + height)) collideY = true;
    if (collideX && collideY) return true;
    else return false;
}

function animate() {
    game.style.visibility = 'hidden';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBubbles();
    drawEdible();
    if (score >= 5) drawDanger();
    if (lives === 1) drawBonusFish();
    player.render();
    shark.endCoord();
    shark.render();

    if (collide(shark.x, shark.y, shark.width, shark.height)) {
        if (player.width === shark.width && player.height === shark.height) {
            shark.remove();
            gameWin();
        } else {
            player.remove();
            lives = 0;
        }
    }

    drawInfo();
    gameOver();
    requestAnimationFrame(animate);
}
animate();