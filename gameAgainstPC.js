
import { declareWinningStatus, getPotentialWinner } from "./winner.js";
import { loadGame, board, makeMove, restartGame } from "./gameCommon.js";

// globals
let numOfPlayers = 1;
let round = 0;

// main


document.querySelectorAll(".cell").forEach((cell, index) => {
    cell.addEventListener("click", () => {
        round++;
        console.log("round is:" + round);
        makeMove(index, cell);
        if (declareWinningStatus(numOfPlayers, getPotentialWinner()) == 0) {
            makeMoveByPC();
            declareWinningStatus(numOfPlayers, getPotentialWinner());
        }
    });
});




// functions
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

