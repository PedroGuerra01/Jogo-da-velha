document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const statusText = document.getElementById("game-status");
    const resetButton = document.getElementById("reset-button");

    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
    let gameActive = true;

    const winningConditions = [
        [0, 1, 2], // Linha 1
        [3, 4, 5], // Linha 2
        [6, 7, 8], // Linha 3
        [0, 3, 6], // Coluna 1
        [1, 4, 7], // Coluna 2
        [2, 5, 8], // Coluna 3
        [0, 4, 8], // Diagonal principal
        [2, 4, 6]  // Diagonal secundária
    ];

    function handleCellClick(event) {
        const cell = event.target;
        const index = cell.getAttribute("data-index");

        if (gameBoard[index] !== "" || !gameActive) return;

        gameBoard[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add("taken");

        if (checkWinner()) {
            statusText.textContent = `Jogador ${currentPlayer} venceu! 🎉`;
            gameActive = false;
            return;
        }

        if (gameBoard.every(cell => cell !== "")) {
            statusText.textContent = "Empate! 😐";
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusText.textContent = `Jogador ${currentPlayer}, é sua vez!`;
    }

    function checkWinner() {
        return winningConditions.some(condition => {
            return condition.every(index => gameBoard[index] === currentPlayer);
        });
    }

    function resetGame() {
        gameBoard = ["", "", "", "", "", "", "", "", ""];
        gameActive = true;
        currentPlayer = "X";
        statusText.textContent = `Jogador ${currentPlayer}, é seu vez!`;
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("taken");
        });
    }

    cells.forEach(cell => cell.addEventListener("click", handleCellClick));
    resetButton.addEventListener("click", resetGame);
});
