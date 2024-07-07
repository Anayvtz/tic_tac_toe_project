import { declareWinningStatus, getPotentialWinner } from "./winner.js";
import { loadGame, makeMove, restartGame } from "./gameCommon.js";

// globals
let numOfPlayers = 2;



// main
document.querySelectorAll(".cell").forEach((cell, index) => {
    cell.addEventListener("click", () => {
        makeMove(index, cell);
        declareWinningStatus(numOfPlayers, getPotentialWinner());
    });
});






