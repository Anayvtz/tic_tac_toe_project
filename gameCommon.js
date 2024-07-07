
export let player = "X";
export let board = ["", "", "", "", "", "", "", "", ""];

document.querySelector(".loadGame").addEventListener('click', loadGame);
document.querySelector(".restart-button").addEventListener("click", restartGame);

export function loadGame() {
    let storageBoard = localStorage.getItem("TicTacToeBoard");
    if (storageBoard != null) {
        board = JSON.parse(storageBoard);
    }
    document.querySelectorAll(".cell").forEach((cell, index) => {
        if (board[index] != "") {
            cell.innerHTML = board[index];
        }
    });
}

export function makeMove(cellIndex, cell) {
    if (board[cellIndex] === "") {
        board[cellIndex] = player; // save the click
        localStorage.setItem("TicTacToeBoard", JSON.stringify(board));
        cell.innerText = player; //write the X/O inside the div
        player = player === "X" ? "O" : "X"; //toggle turn
    }
}

export function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll(".cell").forEach((cell) => {
        cell.innerHTML = "";
        cell.disabled = false;
    });
}
