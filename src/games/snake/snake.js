'use strict'

const canvas = document.getElementById('canvas');
const blocksAmount = 625;

let direct = 'right';
let initScore = 0;
let initCoords = {
    x: 1,
    y: 25,
};

let snakeObjects = []; //snake body
let snakeParametres = {
    initLength: 5,
    snakeX: 13,
    snakeY: 13,
};
let apple;
let applePos;

//making cells
for (let i = 0; i < blocksAmount; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    canvas.appendChild(cell);
}

const block = document.getElementsByClassName('cell');
const makingCells = () => {
    for (let j = 0; j < blocksAmount; j++) {
        if (initCoords.x == 26) {
            initCoords.x = 1;
            initCoords.y--;
        }
        block[j].setAttribute('x', initCoords.x);
        block[j].setAttribute('y', initCoords.y);
        initCoords.x++;
    }
}

makingCells();

const randomPos = () => {
    let posX = Math.round(Math.random() * (25 - 1) + 1);
    let posY = Math.round(Math.random() * (25 - 1) + 1);
    return [posX, posY];
}

const createApple = () => {
    applePos = randomPos();
    apple = document.querySelector('[x = "' + applePos[0] +
        '"][y = "' + applePos[1] + '"]');
    while (apple.classList.contains('snakeBody')) {
        applePos = randomPos();
        apple = document.querySelector('[x = "' + this.x +
            '"][y = "' + this.y + '"]');
    }
    apple.classList.add('apple');
}

createApple();

class Snake {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    initializeSnake() {
        for (let i = 0; i < snakeParametres.initLength; i++) {
            snakeObjects.push(document.querySelector('[x = "' + (this.x - i) +
                '"][y = "' + (this.y) + '"]'));
        }
        console.log(snakeObjects);
        snakeObjects[0].classList.add('snakeHead');
        for (let el = 1; el < snakeObjects.length; el++) {
            snakeObjects[el].classList.add('snakeBody');
        }
    }
    moveSnake() {
        let headCoords = [snakeObjects[0].getAttribute('x'),
            snakeObjects[0].getAttribute('y')
        ];
        snakeObjects[0].classList.remove('snakeHead');
        snakeObjects[snakeObjects.length - 1].classList.remove('snakeBody');
        snakeObjects.pop();

        if (direct == 'right') {
            if (headCoords[0] == 25) headCoords[0] = 0;
            snakeObjects.unshift(document.querySelector('[x = "' +
                (+headCoords[0] + 1) + '"][y = "' + (headCoords[1]) + '"]'));
        }
        if (direct == 'left') {
            if (headCoords[0] == 1) headCoords[0] = 26;
            snakeObjects.unshift(document.querySelector('[x = "' +
                (+headCoords[0] - 1) + '"][y = "' + (headCoords[1]) + '"]'));
        }
        if (direct == 'down') {
            if (headCoords[1] == 1) headCoords[1] = 26;
            snakeObjects.unshift(document.querySelector('[x = "' +
                (headCoords[0]) + '"][y = "' + (+headCoords[1] - 1) + '"]'));
        }
        if (direct == 'up') {
            if (headCoords[1] == 25) headCoords[1] = 0;
            snakeObjects.unshift(document.querySelector('[x = "' +
                (headCoords[0]) + '"][y = "' + (+headCoords[1] + 1) + '"]'));
        }
        if (snakeObjects[0].getAttribute('x') == apple.getAttribute('x') &&
            snakeObjects[0].getAttribute('y') == apple.getAttribute('y')) {
            apple.classList.remove('apple');
            snakeObjects.push(document.querySelector('[x = "' +
                snakeObjects[snakeObjects.length - 1]
                .getAttribute('x') + '"][y = "' +
                snakeObjects[snakeObjects.length - 1]
                .getAttribute('y') + '"]'));
            initScore++;
            createApple();
            console.log(initScore);
        }
        snakeObjects[0].classList.add('snakeHead');
        for (let el = 1; el < snakeObjects.length; el++) {
            snakeObjects[el].classList.add('snakeBody');
        }
    }
    endGame() {
        this.moveSnake();
        if (snakeObjects[0].classList.contains('snakeBody')) {
            console.log('game over');
            document.getElementById('end').style.display = 'block';
            snakeObjects[0].classList.remove('snakeHead');
            for (let el = 1; el < snakeObjects.length; el++) {
                snakeObjects[el].classList.remove('snakeBody');
            }
            snakeObjects.splice(0, snakeObjects.length);
            document.getElementById('restart').innerText = 'Restart';
            document.getElementById('restart').addEventListener('click',
                () => {
                    document.getElementById('end').style.display = 'none';
                });
            this.initializeSnake();
        }
    }
}
const snake = new Snake(snakeParametres.snakeX, snakeParametres.snakeY);

snake.initializeSnake();
snake.endGame();
//snake.moveSnake();

document.addEventListener('keydown', (x) => {
    if (x.keyCode == 37 && direct != 'right') {
        direct = 'left';
        snake.endGame();
    } else if (x.keyCode == 38 && direct != 'down') {
        direct = 'up';
        snake.endGame();
    } else if (x.keyCode == 39 && direct != 'left') {
        direct = 'right';
        snake.endGame();
    } else if (x.keyCode == 40 && direct != 'up') {
        direct = 'down';
        snake.endGame();
    }
});