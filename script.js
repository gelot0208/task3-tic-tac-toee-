const board = document.getElementById("board");
const cells = document.querySelectorAll(".cell");
const resetBtn = document.getElementById("resetBtn");
const statusDisplay = document.getElementById("status");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-index"));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.classList.add(currentPlayer);
    checkResult();
}

function checkResult() {
    let roundWon = false;

    for ( let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerHTML = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.innerHTML = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
}

function resetGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;
    cells.forEach(cell => {
        cell.classList.remove("X");
        cell.classList.remove("O");
    });
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
resetBtn.addEventListener("click", resetGame);

statusDisplay.innerHTML = `It's ${currentPlayer}'s turn`;