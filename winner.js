
import { board, player } from "./gameCommon.js";

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

class Winner {
    player;
    numOfPlayers;
    #date;
    #time;

    constructor(player, numOfPlayers) {
        this.player = player;
        this.numOfPlayers = numOfPlayers;
        this.#date = this.date;
        this.#time = this.time;
    }

    get date() {
        const date = new Date();
        let currDate = date.getDate();
        let currMonth = date.getMonth() + 1;
        return currDate + "/" + currMonth;
    }

    get time() {
        const date = new Date();
        return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }
}

export function getPotentialWinner() {
    return player == "X" ? "O" : "X";
}

export function checkWinner(potentialWinner) {
    if (winPredicate.some((value) => {

        if (value.every((item) =>
            board[item] == potentialWinner
        )) {
            console.log("winner in every sample is:" + potentialWinner);
            return true;
        }
    })) {
        return true;
    } else {
        return false;
    }
}
export function declareWinningStatus(numOfPlayers, potentialWinner) {
    if (checkWinner(potentialWinner)) {
        declareWinner(potentialWinner);
        saveWinToLocalStorage(numOfPlayers, potentialWinner);
        return 1;
    }
    if (!board.includes("")) {
        document.querySelector(".subtitle").innerHTML = " there is a draw";
        return -1;
    }
    return 0;
}

export function declareWinner(winner) {
    console.log("winner in some");

    document.querySelector(".subtitle").innerHTML = "the winner is " + winner;
    document.querySelectorAll(".cell").forEach((cell) => {
        cell.disabled = true;
    });
}

function saveWinToLocalStorage(numOfPlayers, winner) {

    let winnerObj = new Winner(winner, numOfPlayers);
    console.log(winnerObj);
    let winArr = JSON.parse(localStorage.getItem("TicTacToeWinners"));
    if (winArr == null) {
        winArr = [JSON.stringify(winnerObj)];
    } else {
        winArr = [...winArr, JSON.stringify(winnerObj)]
    }
    localStorage.setItem("TicTacToeWinners", JSON.stringify(winArr));
}
