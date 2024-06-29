let player = "X";
let board = ["", "", "", "", "", "", "", "", ""];

let winPredicate = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
let round = 0;

document.querySelector(".loadGame").addEventListener('click', loadGame);

document.querySelectorAll(".cell").forEach((cell, index) => {
    cell.addEventListener("click", () => {
        round++;
        console.log("round is:" + round);
        makeMove(index, cell);
        if (checkWinner() == 0) {
            makeMoveByPC();
            checkWinner();
        }
    });
});

document.querySelector(".restart-button").addEventListener("click", restartGame);

function loadGame() {
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
function makeMove(cellIndex, cell) {
    if (board[cellIndex] === "") {
        board[cellIndex] = player; // save the click
        localStorage.setItem("TicTacToeBoard", JSON.stringify(board));
        cell.innerText = player; //write the X/O inside the div
        player = player === "X" ? "O" : "X"; //toggle turn
    }
}
function makeMoveByPC() {
    let emptyCells = board.map((item, index) => {
        if (item === "") {
            return index;
        } else return -1;
    }).filter(item => item != -1);
    console.log("makeMoveByPc:" + emptyCells + " length:" + emptyCells.length);
    let chosen = Math.floor((Math.random() * emptyCells.length) % (emptyCells.length - 1));
    console.log("chosen is:" + chosen + "chosen index:" + emptyCells[chosen]);
    document.querySelectorAll(".cell").forEach((cell, index) => {
        if (index == emptyCells[chosen]) {
            makeMove(index, cell);
            return;
        }
    });
}
function checkWinner() {
    if (winPredicate.some((value, index, array) => {
        let potentialWinner = player == "X" ? "O" : "X";
        if (value.every((item) =>
            board[item] == potentialWinner
        )) {
            console.log("winner in every sample is:" + potentialWinner);
            return true;
        }
    })) {
        declareWinner();
        saveWinToLocalStorage();
        return 1;
    }
    if (!board.includes("")) {
        document.querySelector(".subtitle").innerHTML = " there is a draw";
        return -1;
    }
    return 0;
}
function declareWinner() {
    console.log("winner in some");
    let winner = player == "X" ? "O" : "X";
    document.querySelector(".subtitle").innerHTML = "the winner is " + winner;
    document.querySelectorAll(".cell").forEach((cell) => {
        cell.disabled = true;
    });
}
function saveWinToLocalStorage() {
    let winner = player == "X" ? "O" : "X";
    const date = new Date();
    let currDate = date.getDate();
    let currTime = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    let currMonth = date.getMonth() + 1;
    let winnerObj = {
        player: winner,
        numOfPlayers: 1,
        date: currDate + "/" + currMonth,
        time: currTime
    };
    let winArr = JSON.parse(localStorage.getItem("TicTacToeWinners"));
    if (winArr == null) {
        winArr = [JSON.stringify(winnerObj)];
    } else {
        winArr = [...winArr, JSON.stringify(winnerObj)]
    }
    localStorage.setItem("TicTacToeWinners", JSON.stringify(winArr));
}
function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    document.querySelectorAll(".cell").forEach((cell) => {
        cell.innerHTML = "";
        cell.disabled = false;
    });
}