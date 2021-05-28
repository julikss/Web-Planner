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

const edibleImgNames = [];
const dangerImgNames = [];

for (const item of edibleImgSrc) {
    const name = item.match(/[a-zA-Z]+(?=\.)/);
    edibleImgNames.push(name.toString());
}
console.log(edibleImgNames);

for (const item of dangerImgSrc) {
    const name = item.match(/[a-zA-Z]+(?=\.)/);
    dangerImgNames.push(name.toString());
}
console.log(dangerImgNames);

let x = [];
let y = [];

for (let i = 0; i < edibleImgNames.length; i++) {
    x.push(Math.round(Math.random() * canvas.width));
    y.push(Math.round(Math.random() * canvas.height));

}
console.log(x);
console.log(y);



class Edible {
    constructor(x, y, img) {
        this.x = x;
        this.y = y;
        this.img = new Image();
        this.img.src = img;
        this.width = 150;
    }
    draw() {
        console.log('drawing');
        ctx.drawImage(this.img, this.x, this.y, 120, 95);
    }
    move() { //doesn't work
        console.log('works');
        this.x += 10;
        if (this.x > canvas.width) {
            this.x -= 10;
        }
    }
}

/*for (let i = 0; i < edibleImgNames.length; i++) {
    const index = edibleImgNames.length;
    edibleImgNames[index] = new Edible(x[i], y[i], edibleImgSrc[i]);
    edibleImgNames[index].draw();
    edibleImgNames[index].move();
}*/


//main player
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
}
const player = new Player('./img/player_right.png', './img/player_left.png');

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
    player.render();

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