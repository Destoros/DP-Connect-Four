// Model (alles was wir speichern)

class Model {

    constructor(controller, rows, cols, saveFileName) {
        this.controller = controller
        this.playedMoves;
        this.indexCurrentMove;
        this.rows = rows;
        this.cols = cols;
        this.fileHandler = new FileHandler();
        this.fileName = saveFileName;

        
        //create a 2D array to store the board        
        this.board = new Array(this.rows);        
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = new Array(this.cols);
        }

        this.reset() //reset the models interal variables (also the board)
    }


    save() {
        let content = [this.playedMoves];
        let type = "text/plain;charset=utf-8";

        this.fileHandler.saveFile(this.fileName, content, type);
    }

    load(file) {

        this.fileHandler.loadFile(file, function (event) {
            let text = event.target.result;

            Controller.instance.reset(); //model reset gets called in controller reset
            
            for (let i = 0; i < text.length; i++) {
                if (i%2 == 0) { //every 2nd entry is a , (comma)
                    let num = parseInt(text[i])
                    Controller.instance.playChip(num);
                }                
            }
        });
    }

    //save the history of the board
    addPlayedMove(playerNumber) {
        while (this.indexCurrentMove != this.playedMoves.length-1) {
            this.playedMoves.pop();
        }
        this.playedMoves.push(playerNumber);
        this.indexCurrentMove++; //check if the indexCurrentMove points at the current move (even after undo/redo)
    }

    //reset all internal variables
    reset() {
        this.playedMoves = [];
        this.indexCurrentMove = -1;
        

        // initalize board
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.board[i][j] = 0; //0 = no player has a chip in this cell; 1 = player1 has a chip in this cell; 2 = player2 ...
            } //Note: the other classes need to know the info above
        }

    }



}