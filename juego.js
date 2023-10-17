var contador = 0;
const canvas = document.getElementById('tic-tac-toe');
const context = canvas.getContext('2d');
const gridSize = 3;
const cellSize = canvas.width / gridSize;
const board = Array(gridSize).fill(0).map(() => Array(gridSize).fill(0));

document.addEventListener('DOMContentLoaded', function() {
    const comenzar = document.getElementById('button');
     drawBoard();

    comenzar.addEventListener('click', jugar);

    canvas.addEventListener('click', (event) => {
        const rect = canvas.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const cell = getCellFromClick(x, y);

        if (board[cell.row][cell.col] === 0) {
            // Coloca el movimiento actual (por ejemplo, 1 para X) en el tablero
            board[cell.row][cell.col] = 1;
            drawBoard();
        }
    });
});

function drawBoard() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = 'black';
    context.lineWidth = 2;

    for (let i = 1; i < gridSize; i++) {
        const x = i * cellSize;
        context.beginPath();
        context.moveTo(x, 0);
        context.lineTo(x, canvas.height);
        context.stroke();

        context.beginPath();
        context.moveTo(0, x);
        context.lineTo(canvas.width, x);
        context.stroke();
    }

    for (let row = 0; row < gridSize; row++) {
        for (let col = 0; col < gridSize; col++) {
            const cell = board[row][col];
            if (cell === 1) {
                drawX(row, col);
            } else if (cell === -1) {
                drawO(row, col);
            }
        }
    }
}

function drawX(row, col) {
    context.strokeStyle = 'red';
    context.lineWidth = 4;
    context.beginPath();
    const x = col * cellSize;
    const y = row * cellSize;
    context.moveTo(x, y);
    context.lineTo(x + cellSize, y + cellSize);
    context.moveTo(x + cellSize, y);
    context.lineTo(x, y + cellSize);
    context.stroke();
}

function drawO(row, col) {
    context.strokeStyle = 'blue';
    context.lineWidth = 4;
    const centerX = col * cellSize + cellSize / 2;
    const centerY = row * cellSize + cellSize / 2;
    const radius = cellSize / 2 - 10;
    context.beginPath();
    context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    context.stroke();
}

function getCellFromClick(x, y) {
    return {
        row: Math.floor(y / cellSize),
        col: Math.floor(x / cellSize)
    };
}

function jugar() {
    // Crear una nueva instancia de la red neuronal
    const net = new brain.NeuralNetwork();

    // Datos de entrenamiento simulados (esto debería ser un conjunto de datos más grande y realista)
    const trainingData = [
    {
        input: [1, 1, 0,
                0, 0, 0,
                0, 0, 0], // Representación del tablero
        output: [0, 0, 1,
                0, 0, 0,
                0, 0, 0] // Movimiento deseado (casilla 3)
    },
    {
        input: [1, 0, 0,
                0, 0, 0,
                0, 0, 0], // Representación del tablero
        output: [0, 0, 0,
                0, 1, 0,
                0, 0, 0] // Movimiento deseado (casilla 3)
    },
    {
        input: [0, 0, 0,
                0, 0, 0,
                0, 0, 1], // Representación del tablero
        output: [0, 0, 0,
                0, 1, 0,
                0, 0, 0] // Movimiento deseado (casilla 3)
    },
    {
        input: [0, 0, 0,
                0, 0, 0,
                0, 1, 0], // Representación del tablero
        output: [0, 0, 0,
                0, 1, 0,
                0, 0, 0] // Movimiento deseado (casilla 3)
    },
    {
        input: [0, 0, 0,
                0, 1, 0,
                0, 0, 0], // Representación del tablero
        output: [0, 0, 1,
                0, 0, 0,
                0, 0, 0] // Movimiento deseado (casilla 3)
    },
    {
        input: [0, 0, 0,
                0, 1, 0,
                0, 0, 0], // Representación del tablero
        output: [0, 0, 0,
                0, 0, 0,
                1, 0, 0] // Movimiento deseado (casilla 3)
    },
    {
        input: [0, 0, 0,
                1, 0, 0,
                0, 0, 0], // Representación del tablero
        output: [0, 0, 0,
                0, 1, 0,
                0, 0, 0] // Movimiento deseado (casilla 3)
    },
    {
        input: [1, 0, 0,
                1, 0, 0,
                0, 0, 0], // Representación del tablero
        output: [0, 0, 0,
                0, 0, 0,
                1, 0, 0] // Movimiento deseado (casilla 3)
    },
    {
        input: [0, 0, 0,
                0, 1, 0,
                0, 0, 1], // Representación del tablero
        output: [1, 0, 0,
                0, 0, 0,
                0, 0, 0] // Movimiento deseado (casilla 3)
    },
    {
        input: [0, 0, 0,
                0, 1, 1,
                0, 0, 0], // Representación del tablero
        output: [0, 0, 0,
                1, 0, 0,
                0, 0, 0] // Movimiento deseado (casilla 3)
    },
    {
        input: [0, 0, 0,
                0, 0, 0,
                0, 1, 1], // Representación del tablero
        output: [0, 0, 0,
                0, 0, 0,
                1, 0, 0] // Movimiento deseado (casilla 3)
    },
    {
        input: [0, 0, 0,
                0, 1, 0,
                1, 0, 0], // Representación del tablero
        output: [0, 0, 1,
                0, 0, 0,
                0, 0, 0] // Movimiento deseado (casilla 3)
    },
    {
        input: [0, 0, 0,
                0, -1, 0,
                1, 0, 0], // Representación del tablero
        output: [0, 0, 0,
                1, 0, 0,
                0, 0, 0] // Movimiento deseado (casilla 3)
    },
    {
        input: [0, 0, 0,
                0, -1, 0,
                1, 0, 0], // Representación del tablero
        output: [0, 0, 0,
                0, 0, 0,
                0, 1, 0] // Movimiento deseado (casilla 3)
    },
    {
        input: [0, 0, 0,
                0, -1, 0,
                1, 0, -1], // Representación del tablero
        output: [1, 0, 0,
                0, 0, 0,
                0, 0, 0] // Movimiento deseado (casilla 3)
    },
    {
        input: [1, 0, -1,
                0, -1, 0,
                1, 0, -1], // Representación del tablero
        output: [0, 0, 0,
                1, 0, 0,
                0, 0, 0] // Movimiento deseado (casilla 3)
    },
    // Agrega más ejemplos de entrenamiento con diferentes estados y movimientos deseables
    ];

    // Entrenar la red neuronal
    net.train(trainingData);

    // Realizar una predicción basada en el estado actual del juego
    const currentState = board.reduce((acc, row) => acc.concat(row), []);; // Estado actual del tablero
    const predictedMove = net.run(currentState);
    console.log(predictedMove);

    // La salida de la red representaría la probabilidad de realizar un movimiento en cada casilla
    // Debes implementar lógica adicional para tomar una decisión basada en la salida de la red.

    var maxProbabilityIndex = predictedMove.indexOf(Math.max(...predictedMove));
    var row = Math.floor(maxProbabilityIndex / gridSize);
    var col = maxProbabilityIndex % gridSize;
    if(contador<=5){
        if (board[row][col] === 0) {
            board[row][col] = -1;
            drawBoard();
        } else {
            contador+=1;
            jugar();
        }
    } else if(contador>5 && contador<=10) {
        predictedMove[maxProbabilityIndex] = -Infinity;
        var secondMaxIndex = predictedMove.indexOf(Math.max(...predictedMove));
        var row = Math.floor(secondMaxIndex / gridSize);
        var col = secondMaxIndex % gridSize;
        if (board[row][col] === 0) {
            board[row][col] = -1;
            contador = 0;
            drawBoard();
        } else {
            contador +=1;
            jugar();
        }
    } else {
        predictedMove[maxProbabilityIndex] = -Infinity;
        var secondMaxIndex = predictedMove.indexOf(Math.max(...predictedMove));
        predictedMove[secondMaxIndex] = -Infinity;
        var thirdMaxIndex = predictedMove.indexOf(Math.max(...predictedMove));
        var row = Math.floor(thirdMaxIndex / gridSize);
        var col = thirdMaxIndex % gridSize;
        if (board[row][col] === 0) {
            board[row][col] = -1;
            contador = 0;
            drawBoard();
        } else {
            contador +=1;
            jugar();
        }
    }
}