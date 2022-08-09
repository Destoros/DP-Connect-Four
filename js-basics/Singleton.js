// var SingletonFactory = (function(){
//     class SingletonClass {
//         constructor(height, width) {
//           this.height = Math.random();
//           this.width = Math.random();
//         }
//       }

//     var instance;

//     return {
//         getInstance: function(){
//             if (instance == null) {
//                 instance = new SingletonClass(7,3);
//                 // Hide the constructor so the returned object can't be new'd...
//                 instance.constructor = null;
//             }
//             return instance;
//         }
//    };
// })();


// let test = SingletonFactory.getInstance();
// console.log(test);

// test.height = 3;
// console.log(test);

// test2 = SingletonFactory.getInstance();
// console.log(test2);


class Rectangle {
    constructor(height, width) {


        //The first time this function gets called, Rectangle.instance is undefined, thus the if fails.
        //But all procceding calls fullfill this if, returning the instance saved as a static
        if(Rectangle.instance instanceof Rectangle) {
            return Rectangle.instance 
        }

        this.height = height;
        this.width = width;
        this.version = Math.random();


        //"this" refers to the current instance
        Rectangle.instance = this; //create a class (static) variable to save the created instance

    }
  }




test = new Rectangle(1,2);
// console.log(test);

test2 = new Rectangle(2,3);
// console.log(test2);

// console.log(test2.version)

console.log(Rectangle.instance)

// test.height = 2;
// console.log(test);
// console.log(test2);