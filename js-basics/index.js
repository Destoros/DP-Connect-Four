//by using the live server extension we can start a live server by right clicking the index.html file and click "Open with Live Server"
//each we save the file (Ctrl + S), the website reloads with the new content
console.log("in index.js")


let name; //declaration of a variable; we did not set a value so it gets displayed as "undefined" in the browser
let name2 = "Mosh"
console.log(name);
console.log(name2);

//name conventions:
//they can not be a reserved keyword like let, if, else
//names should be meaningfull
//they can not start with a number
//they can not contain a space or hypen(-)
//use camelCase notation for variables
//variables are case senstive

let firstName;
let FirstName; //two different variables

//declaration of multiple variables can be done in one line (let firstName = "Hannes", lastName = "Reindl";) but this is not best practice
//best practice would be to define each variable in a new line


let interestRate = 0.3; //we can change this at any time
interestRate = 1;
console.log(interestRate);

//now we want to define a constant (can not be changed later in the programm)
const spendingRate = 2;
//spendingRate = 2.5; //this causes an error: index.js:30 Uncaught TypeError: Assignment to constant variable
// at index.js:30 (:30 refers to line 30 in the index.js file)
// The programm will not continue if it encounters an error
console.log(spendingRate);

//There are to types which we can assign to variables: 1) Primitive/Value Types and 2) Reference Types
//Primitve/Value Types are: STring, Number, Boolean, undefined, null

let string1 = "Hannes"; //the text right to the equals sign is called a String Literal
let age = 30; //Number Literal
let isApproved = true; //Boolean Literal
let undefVariable = undefined; //we can also write nothing after the name to assign undefined
let selectedColor = null; // we use null to clear the value of a variable
//there is another primitive called "symbol", but this will be explained later

//Java script is dynamic language (i.e. not static)
//This means the type of a variable can be change at runtime (e.g. from string to number literal)
//static typed programming languages dont allow changing a variable at runtime

//string1 is right now a string
console.log("type of string1 = " + typeof string1);
string1 = 1; //it dynamically changes the type of the variable at runtime
console.log("type of string1 after assigning 1 to it = " + typeof string1);
//java script does not differentiate between integers and floating point numbers

console.log("type of selectedColor = " + typeof selectedColor) //selected color is a null object, but typeof displays it simply as object

//to clear the console in the webbrowser one can pres Ctrl + L


//now we take a look at the reference types
//These are: Object, Array, Function

//define an object

let person = {
    //now we add some key-value pairs
    //keys: properties of this object (e.g. name)
    //value: the value assigned to the key (e.g. "Hannes")
    name: "Hannes", //key-value pairs are separated by a comma
    age: 30
}; //the curly bracers are an object literal

console.log(person)
console.log(name) //the name the object person has local scope

// to change the values inside use dot notation
person.name = "Johnny" //this is more convenient, if the target property is know BEFORE runtime
console.log(person)

//or use bracket notation
let select = "name";
person[select] = "Mary" //bracket notation allows to specify to the target property at runtime (dynamic!)
console.log(person)


//now we take a look at arrays
let selectedColors = []; //these square brackets are called Array Literal
selectedColors = ["red", "blue"];
console.log(selectedColors);

//access an element in an array
console.log(selectedColors[0]);

//the length of an array aswell as the types in it, can change at runtime (again because javascript is dynamically typed)
selectedColors[2] = "green";
selectedColors[3] = 3;
console.log(selectedColors);
console.log(typeof selectedColors); //= (array) object -> allows us to use dot notation. This array object already has some functionality (eg. .toString) inherited 
console.log(selectedColors.length)


//FUNCTIONS
//this function performs a task
function greet(name) { //name is a parameter of the greet function and has only local scope inside the function
    console.log("Greetings " + name); //+ operate: concatenate two strings; if name is not a string, it will get converted first
}

greet(); //default value is undefined
greet("Hannes") //"Hannes" is an argument to the greet function
greet(2) 

//calculate a value
function square(number) {
    return number*number;
}

console.log(square(2)) //2 functions calls: first is the log function and second is the square function, which we defined ourself


