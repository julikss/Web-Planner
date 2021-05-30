'use strict'

const canvas = document.getElementById('canvas');

let direction = 'right';
let initScore = 0;
let initCoords = {
    x: 1,
    y: 25,
};

let snakeObjects = []; //snake body
let snakeParametres = {
    initLength: 1,
    snakeX: 13,
    snakeY: 13,
};

let applePos = {
    x: 10,
    y: 10,
};

//making cells
for (let i = 0; i < 625; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    canvas.appendChild(cell);
}

const block = document.getElementsByClassName('cell');

for (let j = 0; j < 625; j++) {
    if (initCoords.x == 26) {
        initCoords.x = 1;
        initCoords.y--;
    }
    block[j].setAttribute('x', initCoords.x);
    block[j].setAttribute('y', initCoords.y);
    initCoords.x++;
}

class Food {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    initializeFood() {
        let apple = document.querySelector('[x = "' + this.x +
            '"][y = "' + this.y + '"]');
        apple.classList.add('apple');
    }
}

class Snake {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    initializeSnake() {
        for (let i = 0; i <= 2; i++) {
            snakeObjects.push(document.querySelector('[x = "' + (this.x - i) +
                '"][y = "' + (this.y) + '"]'));
        }

        for (let el of snakeObjects) {
            el.classList.add('snakeBody');
        }
    }

    moveRight() {
        let headCoords = [snakeObjects[0].getAttribute('x'), snakeObjects[0].getAttribute('y')];
        if (headCoords[0] == 25) headCoords[0] = 0;
        
        snakeObjects[snakeObjects.length - 1].classList.remove('snakeBody');
        snakeObjects.pop();
        snakeObjects.unshift(document.querySelector('[x = "' + (+ headCoords[0] + 1) +
            '"][y = "' + (headCoords[1]) + '"]'));
        snakeObjects[0].classList.add('snakeBody');
    }

    moveLeft() {
        let tailCoords = [snakeObjects[snakeObjects.length - 1].getAttribute('x'),
         snakeObjects[snakeObjects.length - 1].getAttribute('y')];
        if (tailCoords[0] == 1) tailCoords[0] = 25;
        
        snakeObjects[0].classList.remove('snakeBody');
        snakeObjects.shift();
        snakeObjects.push(document.querySelector('[x = "' + (+ tailCoords[0] - 1) +
            '"][y = "' + (tailCoords[1]) + '"]'));
        snakeObjects[snakeObjects.length - 1].classList.add('snakeBody');
    }
}
const snake = new Snake(snakeParametres.snakeX, snakeParametres.snakeY);
const apple = new Food(applePos.x, applePos.y);

apple.initializeFood();
snake.initializeSnake();

document.addEventListener('keydown', snake.moveRight);


