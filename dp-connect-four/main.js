
//Selectors
let tableObject = document.getElementsByTagName('tr'); //Select all the table rows from ConnectFour.html
let tableCell = document.getElementsByTagName('td'); //Select all table cells

const playerTurnObject = document.querySelector('.player-turn'); //Displays which player should place a chip

//Buttons
const undo = document.querySelector('.undo'); 
const redo = document.querySelector('.redo');
const save = document.querySelector('.save');
const reset = document.querySelector('.reset');

//Selector to upload and load a game
const fileSelector = document.getElementById("file-selector");

//Text box to play moves by entering a text rather than clicking with the mouse
const textField = document.getElementById("text-field")

//Color of the chips
const playerOneColor = "red";
const playerTwoColor = "yellow";



//MODEL VIEW CONTROLLER PATTERN:
view = new View(tableObject,  playerTurnObject, playerOneColor, playerTwoColor, tableCell, null)
model = new Model(null, view.rows, view.cols, "ConnectFourGame.txt");
controller = new Controller(model, view)

view.controller = new Controller();  // Controller is a Singleton, hence we always use the same instance
model.controller = new Controller(); // and dont need to provide the model or view.


//add an Event Listener for the buttons
undo.addEventListener('click', () => {
    controller.undo()
})
redo.addEventListener('click', () => {
    controller.redo()
})
save.addEventListener('click', () => {
    model.save()
})
reset.addEventListener('click', () => {
    controller.reset()
})


fileSelector.addEventListener('change', (event) => {
    const fileList = event.target.files;
    this.model.load(fileList[0]); //if several files were uploaded, use the first one
});


textField.addEventListener('keypress', (e) => {
    if(e.key == "Enter") {

        let num = parseInt(e.target.value);
        if (isNaN(num)) {
            alert("Entered text is not a number")
        }
        else {
            controller.playChip(num);
        }

        textField.value = ""; //clear the text field
    }
})





/* List of Design Patterns 

I marked Design Patters which look really promissing with :: at the start of the line

::Iterator: Get the next element of a collection until it is exhausted. -> Is already used in the program

Adapter: Make a class compatible with another interface. -> Maybe we want another way to interact with our program (e.g. instead of HTML use a text based system). If we create a bot, it needs anther way to place a chip, than it is implemented right now. Altough we can simply change the EventListener a little to get the variable 'clickedCol' and provide this interger to the playChip() method.

Facade: Provide a higher-level interface which is easier to use for the client. -> I think we can argue, that the graphical overlay in HTML acts as an easier interface to the client??????? (Im really not sure about this) 

Decorator: Extends the functionality of an object, while maintaining the same interface. -> IDK how we could use this, but there could be a case.

Proxy: A transparent placeholder for another object. -> I dont think there is a need for a proxy.

~~Layers: Split up your application into layers of same abstraction level which depend upon the services by lower layers, and provide some services to upper layers. -> Maybe we could split the logic and the displaying. We create a logic layer which checks if the provided move is valid, if someone connected four, loading, saving the game. We create a display layer (i.e another class in our case) which simply asks for the board state(or maybe even which changes had been done since the last call) and update/draw the board accordingly. Argument against Layers: We use a Model View Controller DP

Broker: Manage dynmaic communication between clients and servers in distributed systems. -> No need, since we dont have a distributed system.

Pipes and Filters: Form a sequence of processing steps using a common interface. (e.g. Wäsche waschen, Wäsche aufhängen, Wäsche bügeln) -> ConnectFour does not have a sequence of processing steps. If you percieve each played chip as a processing chip it also does not make sense, since each processing step is almost identical (only the color of the chip changes).

Master/Slave: A coordinate distributes work amongst some helpers. -> The workload of ConnectFour is not big enough for the overhead the Master/Slave causes. Neither does ConnectFour have equal workload heavy subtasks.

Client/Server: Let clients send requests to a server who does the processing -> Well this is done in the background since we use JS to code this game, which requires a server. But we didnt implement this ourself and it would be overkill for ConnectFour.

Factory Method: Delegate the creation of an object to someone else. -> No need, we already know how our board object should look like.

Abstract Factory Builder: Create families of objects which belong together. -> No need, we dont have a family of objects.

Builder: Build objects part by part and assemble everything in the end (Guter Vergleich: PC zusammenbauen, ich sag welche Komponenten ich haben will, jemand anders baut alles zusammen, so dass es funktioniert). -> Seems to be overkill for our little game. Maybe we can use it to say if we want the game to have a bot or not.

::Singleton: Only allow a single istance of an object -> We should implement this, since there should be only one game running at all times (and is quite easy to implement :) ). Or maybe there should be only one Controller, if we implement the Model View Controlelr DP.

Prototype: Create templates for objects and copy them. -> No need, since we only have one object.

::Memento: Store and load the internal state of objects. -> We need to save and load the game so there is no way around this design pattern.

::State: Alter the behaviour of an object base on some coditions and defined model (state machine). -> ConnectFour is a stateful game so there is also no way around this pattern.

Flyweigh: Only store the difference if you have to manage many objects. -> Even though this says "objects", we could store the differences to each board state, rather than the entire board to undo and redo moves. But im not really sure if this counts as a Flyweigh DP.

::Model View Controller: Separate the responsibilites of visualizing, processing and data management for GUI applications into the roles: Mode, View, Controller. -> This looks promising is similar to the idea I described in Layers.

*/
