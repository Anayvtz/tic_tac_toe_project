
// main
document.getElementById("winsTbl").addEventListener("click", openWinsTbl);

// functions
function openWinsTbl() {
    let winsTbl = localStorage.getItem("TicTacToeWinners");
    if (winsTbl == null) {
        console.error("TicTacToeWinners is empty");
        return;
    }
    try {
        parsedTbl = JSON.parse(winsTbl);
        parsedTblItems = parsedTbl.map((item) => JSON.parse(item));
    } catch (e) {
        console.error("error parsing TicTacToeWinners");
        return;
    }
    let tableHTML = '<table border="1"><thead><tr><th>Player</th><th>numOfPlayers</th><th>date</th><th>time</th></tr></thead><tbody>';
    parsedTblItems.forEach(item => {
        numOfPlayers: 1,
            tableHTML += `<tr><td>${item.player}</td><td>${item.numOfPlayers}</td><td>${item.date}</td><td>${item.time}</td></tr>`;
    });
    tableHTML += '</tbody></table>';

    let newWindow = window.open('', '_blank');
    newWindow.document.open();
    newWindow.document.write(`
        <html>
        <head>
        <title>table of winnings</title>
        <style>
        body {
        display:flex;
        justify-content: center;
        align-items: center;
        height:100vh;
        margin:0;
        font-family:arial;
        }
        table {
        border-collapse:collapse;
        width:80%;
        max-width:800px;
        text-align: center;
        }
        th,td {
        padding:10px;
        border: 1px solid navy;
        }
        th {
        background-color: lightskyblue;
        }
        </style>
        </head>
        <body>
        ${tableHTML}
        </body>
        </html>`);
    newWindow.document.close();

}