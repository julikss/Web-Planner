let score = 0;
let level = 0;
let  playfield = [
    [0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];
const figures = {
    figureOne: [
                   [0, 1, 0],
                   [1, 1, 1],
                   [0, 0, 0]
               ],
    figureTwo: [
                   [0, 1, 1],
                   [0, 1, 1],
                   [0, 0, 0]
               ],
  figureThree: [
                   [1, 1, 0],
                   [0, 1, 1],
                   [0, 0, 0]
               ],
  figureFoure: [
                   [0, 1, 1],
                   [1, 1, 0],
                   [0, 0, 0]
               ],
   figureFive: [
                   [1, 0, 0],
                   [1, 0, 0],
                   [1, 1, 0]
               ],
    figureSix: [
                   [0, 0, 1],
                   [0, 0, 1],
                   [0, 1, 1]
               ],
 figureSeven:  [
                   [0, 1, 0],
                   [0, 1, 0],
                   [0, 1, 0]
               ],
            }
const allBlocks = 200;
const main = document.getElementsById('main');
for (let i = 0; i < allBlocks; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    main.appendChild(cell);
}
const MaxCoundOfFigures = 7;
function getRandomInt(MaxCoundOfFigures){
    return Math.floor(Math.random() * MaxCoundOfFigures);
    }
let  activeFigure = {
x: 0,
y: 0,
get blocks() {
    return this.rotations[this.rotationIndex];
},
rotationIndex: 0,
rotations: [
    //1
    [
        [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 1, 0],
            [0, 1, 1],
            [0, 1, 0]
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [0, 1, 0]
        ],
        [
            [0, 1, 0],
            [1, 1, 0],
            [0, 1, 0]
        ],
    ],
    //2
    [
         [0, 1, 1],
         [0, 1, 1],
         [0, 0, 0]
        
    ],
    //3
    [
        [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ],
        [
            [0, 0, 1],
            [0, 1, 1],
            [0, 1, 0]
        ],
        [
            [0, 0, 0],
            [1, 1, 0],
            [0, 1, 1]
        ],
        [   
            [0, 1, 0],
            [1, 1, 0],
            [1, 0, 0]
        ]
    ],
    //4
    [
        [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
        [
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0]
        ],
        [
            [0, 0, 0],
            [0, 1, 1],
            [1, 1, 0]
        ],
        [   
            [1, 0, 0],
            [1, 1, 0],
            [0, 1, 0]
        ]
    ],
    //5
    [
        [
            [1, 0, 0],
            [1, 0, 0],
            [1, 1, 0]
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [1, 0, 0]
        ],
        [
            [1, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        [   
            [0, 0, 0],
            [0, 0, 1],
            [1, 1, 1]
        ]
    ],
    //6
    [
        [
            [0, 0, 1],
            [0, 0, 1],
            [0, 1, 1]
        ],
        [
            [0, 0, 0],
            [1, 0, 0],
            [1, 1, 1]
        ],
        [
            [1, 1, 0],
            [1, 0, 0],
            [1, 0, 0]
        ],
        [   
            [1, 1, 1],
            [0, 0, 1],
            [0, 0, 0]
        ]
    ],
    //7
    [
        [
            [0, 1, 0],
            [0, 1, 0],
            [0, 1, 0]
        ],
        [
            [0, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ]
    ]
]
};
moveFigureLeft = () => {
    this.activeFigure.x -= 1; 
    if (this.isConditionsForFigures()) {
        this.activeFigure.x += 1;
        this.lockFigure();
    }
}
moveFigureRight = () => {
    this.activeFigure.x += 1;
    if (this.isConditionsForFigures()) {
        this.activeFigure.x -= 1;
        this.lockFigure();
    }
}
moveFigureDown = () => {
    this.activeFigure.y += 1;
    if (this.isConditionsForFigures()) {
        this.activeFigure.y -= 1;
        this.lockFigure();
    }
}
rotateFigure = () => {
    this.activeFigure.rotationIndex = this.activeFigure.rotationIndex < 3 ? this.activeFigure.rotationIndex + 1 : 0;
    if (this.isConditionsForFigures()) {
        this.activeFigure.rotationIndex = this.activeFigure.rotationIndex > 0 ? this.activeFigure.rotationIndex - 1 : 3;
    }
    return this.activeFigure.blocks;
}
isConditionsForFigures = () => {
    const blocks = this.activeFigure.blocks;
    const {y: FigureY, x: figureX} = this.activeFogure;
    for (let y = 0; y < blocks.length; y++) {
        for (let x = 0; x < blocks[y].length; x++) {
            if (blocks[y][x] != 0) {
                if (this.playfield[FigureY + y] === undefined || this.playfield[FigureY + y][figureX + x] === undefined || this.playfield[FigureY + y][figureX + x]) {
                    return true;
                }
                return true;
            }
                return false;
    }
}
lockFigure = () => {
    const blocks = this.activeFigure.blocks;
    const {y: FigureY, x: figureX} = this.activeFogure;
    for (let y = 0; y < this.activeFigure.blocks.length; y++) {
        for (let x = 0; x < blocks[y].length; x++) {
            if (blocks[y][x] != 0){
            this.playfield[FigureY + y][figureX + x] = blocks[y][x];
                }
            }
        }
    }
}
document.addEventListener('keydown', move);
    function move(event) {
        if (event.keyCode === 37) {
            dir = 'left';
        } else if (event.keyCode === 39) {
            dir = 'right';
        }  else if (event.keyCode === 40) {
            dir = 'down';
        }
    }
move();
class View {
constructor(elements, width, height, rows, columns) {
this.elements = elements;
this.width = width;
this.height = height;
this.rows = rows;
this.columns = columns;

this.blockwidth = this.width / columns;
this.blockheight = this.height / rows;
this.elements.appendChild(this.canvas);
}

DrawPlayfield = (playfield) => {
       for (let y = 0; y < playfield.length; y++){
           const line = playfield[y];

           for (let x = 0; x < line.length; x++) {
               const block =line[x];
               if (block != 0) {
                   this.context.fillStyle = '#fbee6c';
                   this.context.strokeStyle = '#c7c7c7';
                   this.context.lineWidth = 2;

                   this.context.fillRect(x * this.blockwidth, y * this.blockheight, this.blockwidth, this.blockheight);

               }
           }
       } 
    }
}


