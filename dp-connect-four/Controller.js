
class Controller {

    constructor(model, view) {

        //SINGLETON PATTERN:
        //The first time the constructor gets called, Rectangle.instance is undefined, thus the if fails.
        //But all procceding calls fullfill this if, returning the instance saved as a class variable (static)
        if(Controller.instance instanceof Controller) {
            return Controller.instance 
        }

        this.currentPlayer = 1; //can be 1 or 2 
        this.gameFinished = false; //gameOver

        this.model = model;
        this.view = view;

        this.view.drawCurrentPlayer(this.currentPlayer);

        //"this" refers to the current instance
        Controller.instance = this; //create a class (static) variable to save the created instance
    }


    playChip(clickedCol) {

        //return if a player already won
        if (this.gameFinished) {
            return;
        }

        
        //if the the new chip would be out of bounds (i.e. the entire colum is already filled) 
        //simply show an alert but dont change anything else        
        if(this.model.board[0][clickedCol] != 0) {
            alert("Out of bounds");
            return
        }


        //search the clicked column from bottom to top to check if a chip can be placed
        for(let i = this.model.rows - 1; i >= 0; i--) {
            if(this.model.board[i][clickedCol] == 0) {

                this.model.board[i][clickedCol] = this.currentPlayer;
                this.model.addPlayedMove(clickedCol);


                this.view.drawBoard(this.model.board, this.view.playerColors);

                
                if (this.checkWin(this.currentPlayer)) {
                    this.gameFinished = true;
                    alert(`Player ${this.currentPlayer} wins! `);
                }
                // finally change the player if a chip was inserted succesfully
                this.changePlayer();

                break;
                
            }
        }
    }

    changePlayer() {
        this.currentPlayer = (this.currentPlayer == 1 ? 2 : 1); //ternary operator yeah!

        //change HTML <h3> tag to display the current player
        this.view.drawCurrentPlayer(this.currentPlayer);
        
    }

    undo() {

        //return if no moves were played yet
        if (this.model.indexCurrentMove == -1) {
            return
        }        

        
        let lastPlayedCol = this.model.playedMoves[this.model.indexCurrentMove];
        
        //search the clicked column from top to bottom to undo the last played chip
        //the last played column is provided by the array "lastPlayedCol"
        for(let i = 0; i < this.model.rows; i++) {
            if(this.model.board[i][lastPlayedCol] != 0) {
                this.model.board[i][lastPlayedCol] = 0;
                
                this.model.indexCurrentMove--;
                this.view.drawBoard(this.model.board, this.view.playerColors);
                
                // finally change the player if a chip was deleted succesfully
                this.changePlayer();
                break;
            }
        }
        //also set the "gameFinished" flag to false, since there is no possibility that a player won now
        this.gameFinished = false;
    }

    redo() {
        //do nothing if we need to know the future
        if (this.model.indexCurrentMove >= this.model.playedMoves.length - 1) {
            return
        }

        //increase the pointer for the playedMoves array
        this.model.indexCurrentMove++;
        let PlayedCol = this.model.playedMoves[this.model.indexCurrentMove];
        
        //search the clicked column from bottom to top and play a chip
        for(let i = this.model.rows-1; i >= 0; i--) {
            if(this.model.board[i][PlayedCol] == 0) {
                this.model.board[i][PlayedCol] = this.currentPlayer;

                
                this.view.drawBoard(this.model.board, this.view.playerColors);

                if (this.checkWin(this.currentPlayer)) {
                    this.gameFinished = true;
                }
               
                // finally change the player if a chip was inserted succesfully
                this.changePlayer();
                break;
            }
        }      
    }

    //reset the controller variables aswell as the model and display
    reset() {
        this.currentPlayer = 1;
        this.gameFinished = false;
        this.model.reset();
        this.view.drawBoard(this.model.board, this.view.playerColors);
        this.view.drawCurrentPlayer(this.currentPlayer);
    }
    

    checkWin(player) {
        let rows = this.model.board.length;
        let cols = this.model.board[0].length;

        for(let r=0; r < rows; ++r) {
            for(let c=0; c < cols; ++c) {
                if (c < cols - 3) {
                    if (this.checkHorizontal(player, r, c)){
                        return true;
                    }
                }

                if (r < rows - 3) {
                    if (this.checkVertical(player, c, r)){
                        return true;
                    }
                }

                if (r < rows - 3 && c < cols - 3) {
                    if (this.checkDiagonal1(player, r, c)){
                        return true;
                    }
                }

                if (r < rows - 3 && c >= 3) {
                    if (this.checkDiagonal2(player, r, c)){
                        return true;
                    }
                }


            }
        }

        return false;
    }

    checkHorizontal(player, row, offset) {
        if (this.model.board[row][0 + offset] == player &&
            this.model.board[row][1 + offset] == player &&
            this.model.board[row][2 + offset] == player &&
            this.model.board[row][3 + offset] == player   )
            return true;
        return false;
    }

    checkVertical(player, col, offset) {
        if (this.model.board[0 + offset][col] == player &&
            this.model.board[1 + offset][col] == player &&
            this.model.board[2 + offset][col] == player &&
            this.model.board[3 + offset][col] == player   )
            return true;
        return false;
    }

    // from top left to bottom right
    checkDiagonal1(player, row, col) {
        if (this.model.board[row+0][col+0] == player &&
            this.model.board[row+1][col+1] == player &&
            this.model.board[row+2][col+2] == player &&
            this.model.board[row+3][col+3] == player   )
            return true;
        return false;
    }

    // from top right to bottom left
    checkDiagonal2(player, row, col) {
        if (this.model.board[row+0][col-0] == player &&
            this.model.board[row+1][col-1] == player &&
            this.model.board[row+2][col-2] == player &&
            this.model.board[row+3][col-3] == player   )
            return true;
        return false;
    }

}