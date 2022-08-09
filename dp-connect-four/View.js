// View

class View {

    constructor(tableObject,  playerTurnObject, playerOneColor, playerTwoColor, tableCell, controller)   {
        this.tableObject = tableObject; //HTML table object
        this.playerTurnObject = playerTurnObject; //header to display the current player
        this.rows = tableObject.length; //row length
        this.cols = tableObject[0].cells.length; //throws an error if the table has no entries at all
        this.playerColors = ['white', playerOneColor, playerTwoColor]; //color white is for empty slots
        this.controller = controller;

 
        //add an Event Listener for each cell; Iterable design pattern
        Array.prototype.forEach.call(tableCell, (cell) => {
            cell.addEventListener('click',(e) => { // "=>" is called an ES6 arrow function; I can not simply call board.playChip because the class board would use the wrong context (i.e. this).  It uses the context from the EventListener instead of the one from the class in the class.
                let clickedCol = e.target.cellIndex; 
                this.controller.playChip(clickedCol);
            } );
            cell.style.backgroundColor = this.playerColors[0];
        })

    }

    //draws the board to the screen
    drawBoard(board, playerColors) {

            
        for(let i = 0; i < this.rows; i++) {
            for(let j = 0; j < this.cols; j++) {
                    this.tableObject[i].cells[j].style.backgroundColor = playerColors[board[i][j]]; //change the background color depending on the player
            }
        }
    }

    //updates the displayed player turn
    drawCurrentPlayer(currentPlayer) {
        this.playerTurnObject.textContent = `Player ${currentPlayer}'s turn`;
        this.playerTurnObject.style.backgroundColor = this.playerColors[currentPlayer];
    }

}