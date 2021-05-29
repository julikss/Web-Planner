'use strict'

const canvas = document.getElementById('canvas');
let initScore = 0;

//making cells
for (let i = 0; i < 625; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    canvas.appendChild(cell);
}

const block = document.getElementsByClassName('cell');
let initCoords = {
    x: 1,
    y: 25,
}

for (let j = 0; j < 625; j++) {
    if (initCoords.x == 26) {
        initCoords.x = 1;
        initCoords.y--;
    }
    block[j].setAttribute('x', initCoords.x);
    block[j].setAttribute('y', initCoords.y);
    initCoords.x++;
}

let snakeObjects = []; //snake body
let snakeParametres = {
    initLength: 1,
    snakeX: 13,
    snakeY: 13,
};

let applePos = { //food coordinates
    x: 10,
    y: 10,
};
let apple = document.querySelector('[x = "' + applePos.x +
    '"][y = "' + applePos.y + '"]');
apple.classList.add('apple');
console.log(apple);

snakeObjects.push(document.querySelector('[x = "' + snakeParametres.snakeX +
    '"][y = "' + snakeParametres.snakeY + '"]'));

for (let el of snakeObjects) {
    el.classList.add('snakeBody');
}

console.log(snakeObjects);

