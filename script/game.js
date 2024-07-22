// imports
import { declareWinningStatus, getPotentialWinner } from "./winner.js";
import { makeMove } from "./gameCommon.js";

// globals
let numOfPlayers = 2;



// main
document.querySelectorAll(".cell").forEach((cell, index) => {
    cell.addEventListener("click", () => {
        makeMove(index, cell);
        declareWinningStatus(numOfPlayers, getPotentialWinner());
    });
});






