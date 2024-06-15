let currentPlayer = 'X';
let gameMode = '';
let board = ['', '', '', '', '', '', '', '', ''];
const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

function selectCoin(coin) {
    currentPlayer = coin;
    document.getElementById('choose-coin').style.display = 'none';
    document.getElementById('choose-mode').style.display = 'block';
}

function selectMode(mode) {
    gameMode = mode;
    document.getElementById('choose-mode').style.display = 'none';
    document.getElementById('game-board').style.display = 'block';
    initializeBoard();
}

function initializeBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    board = ['', '', '', '', '', '', '', '', ''];
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleCellClick);
        boardElement.appendChild(cell);
    }
}

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');
    if (board[index] === '') {
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        if (checkWin()) {
            displayResult(`${currentPlayer} Wins!`);
        } else if (board.every(cell => cell !== '')) {
            displayResult('Draw!');
        } else {
            switchPlayer();
            if (gameMode === 'pvc' && currentPlayer !== 'X') {
                setTimeout(computerMove, 500); // Adding delay for better user experience
            }
        }
    }
}

function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function computerMove() {
    let availableMoves = board.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    let move = availableMoves[Math.floor(Math.random() * availableMoves.length)];
    board[move] = currentPlayer;
    document.querySelector(`[data-index='${move}']`).textContent = currentPlayer;
    if (checkWin()) {
        displayResult(`${currentPlayer} Wins!`);
    } else if (board.every(cell => cell !== '')) {
        displayResult('Draw!');
    } else {
        switchPlayer();
    }
}

function checkWin() {
    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === currentPlayer);
    });
}

function displayResult(result) {
    const resultBox = document.getElementById('result');
    resultBox.textContent = result;
    resultBox.style.display = 'block';
    resultBox.classList.add('animate-result');
}

document.addEventListener('DOMContentLoaded', () => {
    const style = document.createElement('style');
    style.innerHTML = `
        .animate-result {
            animation: fadeIn 1s ease-in-out;
        }
        @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);

    // Start title animation
    document.getElementById('game-title').classList.add('animate-title');
});
