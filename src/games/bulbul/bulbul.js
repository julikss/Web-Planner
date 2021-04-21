//canvas
const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
const repeat = document.querySelector('#gameOver');
canvas.width = 900;
canvas.height = 600;

let score = 0;
let skip = 0;
let gameFrame = 0;
let total = 0;
const lives = 3;
let allTotal = localStorage.getItem('allTotal');
allTotal = JSON.parse(allTotal);
document.getElementById('allTotal').value = allTotal;
const bulMusic = document.createElement('audio');
bulMusic.src = 'soundBul.mp3';
ctx.font = '30px arial';

//mouse
let canvasPosition = canvas.getBoundingClientRect();
const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
};
canvas.addEventListener('mousedown', function(event){
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;
});
canvas.addEventListener('mouseup', function(){
    mouse.click = false;
});

//player
class Player {
    constructor(){
        this.x = canvas.width;
        this.y = canvas.height/2;
        this.radius = 60;    
        // this.angle = 0;
        // this.frameX = 0;
        // this.frameY = 0;
        // this.frame = 0;
    }
    update(){
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        if (mouse.x != this.x){
            this.x -= dx / 15;
        }
        if (mouse.y != this.y){
            this.y -= dy / 15;
        }
    }
    draw(){
        if(mouse.click) {
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
    }
}
const player = new Player();

//small bulbul
const bulArray = [];
class Bul {
    constructor (){
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + 100;
        this.radius = 50;
        this.speed = Math.random() * 5 + 1;  
        this.distance = 0;   
        this.count = false;   
        this.sound = 'sound';
    }
    update(){
        this.y -= this.speed;
        const dx = this.x - player.x;
        const dy = this.y - player.y;
        this.distance = Math.sqrt(dx * dx + dy * dy);
    }
    draw(){
        ctx.fillStyle = '#161c22';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.stroke();
    }
}

function handlyBul(){
    if (gameFrame % 50 == 0){
        bulArray.push(new Bul());
    }
    for (let i = 0; i < bulArray.length; i++){
        if (bulArray[i].y < 0){
            skip++;
            bulArray.splice(i, 1);
        }
          bulArray[i].update();
          bulArray[i].draw();
        if (bulArray[i].distance < bulArray[i].radius + player.radius){
            if (!bulArray[i].count){
                bulMusic.play();
                score++;
                bulArray[i].count = true;
                bulArray.splice(i, 1);
            }
        }
    }
}

function writeInCtx (){
    ctx.fillStyle = 'black';
    ctx.fillText('total:' + total, 20, 120);
    ctx.fillText(`lives: ${lives - skip}♥ ` , 20, 80);
    ctx.fillText('score:' + score, 20, 40);
}

function gameOver (){
        total += score;
        allTotal += score;
        localStorage.setItem('allTotal', JSON.stringify(allTotal));
        document.getElementById('allTotal').value = allTotal;
        skip = 0;
        score = 0;
        bulArray.count = true;
        for (let i = 0; i < bulArray.length; i++){
            bulArray.splice(i);
        }
        repeat.style.visibility='visible';
}

//animation
function animation(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    repeat.style.visibility='hidden';
    handlyBul();
    player.update();
    player.draw();
    writeInCtx();
    if (skip == lives){
        gameOver();
        return;
    }
    gameFrame++;
    requestAnimationFrame(animation);
}
animation();
repeat.addEventListener('click', animation);

