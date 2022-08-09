console.log("in test.js")

// 1) String primitive
const message = "This is my first message"; //string is a primitive type, so it should not have properties (attributes) and methods
// message.
// but in java script there are two types of strings: 1) String primitive and 2) String object

// 2) String object
let anotherMessage = new String("hi"); // this is a constructor function ->  new

// typeof message -> string
// type of anotherMessage -> object

//but if we use the dot notation (message.) javascript wraps the primitve into a string object, hence we can access the properties and methods
console.log(message);