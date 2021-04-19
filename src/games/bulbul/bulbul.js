//canvas
const canvas = document.querySelector('#canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let score = 0;
let gameFrame = 0;

const mouse = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    click: false
};
canvas.addEventListener('mousedown', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(event);
    console.log(mouse.x, mouse.y);
});
