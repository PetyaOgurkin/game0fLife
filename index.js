const canvas = document.querySelector("#mainWindow");
const context = canvas.getContext("2d");

context.fillStyle = "black";

let BORN = document.querySelector('#born').value.toString().split('');
let SURVIVE = document.querySelector('#survive').value.toString().split('');
let SIZE = document.querySelector('#size').value;
let LEVEL = document.querySelector('#level').value;
let TIME = document.querySelector('#time').value;

let WIDTH = (canvas.width / SIZE).toFixed()
let HEIGHT = (canvas.height / SIZE).toFixed()

let field = []

function generation() {
    field = []
    for (let i = 0; i < WIDTH; i++) {
        field.push([]);
        for (let j = 0; j < HEIGHT; j++) {
            if (i === 0 || j === 0 || i === WIDTH - 1 || j === HEIGHT - 1) {
                field[i].push(0)
            } else {
                +(Math.random() * 100).toFixed() < LEVEL ? field[i].push(1) : field[i].push(0)
            }
        }
    }
}

function updateField() {
    for (let i = 0; i < WIDTH; i++) {
        for (let j = 0; j < HEIGHT; j++) {
            if (field[i][j] === 2)
                field[i][j] = 1;
        }
    }
}

function render() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < WIDTH; i++) {
        for (let j = 0; j < HEIGHT; j++) {
            if (field[i][j] === 2) {
                field[i][j] = 1;
            }

            if (field[i][j] === 1) {
                context.fillRect(i * SIZE, j * SIZE, SIZE, SIZE);
            }
        }
    }
}

function logics() {
    for (let i = 1; i < WIDTH - 1; i++) {
        for (let j = 1; j < HEIGHT - 1; j++) {
            let neighbors = 0;

            field[i - 1][j - 1] === 1 && neighbors++
            field[i - 1][j] === 1 && neighbors++
            field[i][j - 1] === 1 && neighbors++
            field[i - 1][j + 1] === 1 && neighbors++
            field[i + 1][j - 1] === 1 && neighbors++
            field[i + 1][j] === 1 && neighbors++
            field[i][j + 1] === 1 && neighbors++
            field[i + 1][j + 1] === 1 && neighbors++

            if (field[i][j] === 0) {
                if (BORN.includes(neighbors.toString())) {
                    field[i][j] = 2;
                }

            } else {
                if (!SURVIVE.includes(neighbors.toString())) {
                    field[i][j] = 0;
                }
            }
        }
    }

}

function game() {
    render()
    logics()
    // updateField()
}

document.querySelector('#applySettings').addEventListener('click', () => {
    BORN = document.querySelector('#born').value.toString().split('');
    SURVIVE = document.querySelector('#survive').value.toString().split('');
    SIZE = document.querySelector('#size').value;
    LEVEL = document.querySelector('#level').value;
    TIME = document.querySelector('#time').value;
    WIDTH = (canvas.width / SIZE).toFixed()
    HEIGHT = (canvas.height / SIZE).toFixed()
})

let tick;
let process = false;

document.querySelector('#startGame').addEventListener('click', () => {
    generation();
    clearInterval(tick);
    tick = setInterval(game, TIME);
    process = true;
})

document.querySelector('#pauseGame').addEventListener('click', () => {
    if (process) {
        clearInterval(tick);
        process = false
    } else {
        tick = setInterval(game, TIME);
        process = true
    }
})



