/////////////////////////////////////////header
////////// Function to update hero height as we adjust viewport height (vh) //
function updateLayout() {
  const header = document.getElementsByTagName("header")[0];   // Get the header element
  const contheroElement = document.getElementsByClassName("conthero")[0];   // Get the conthero section element


  if (header && contheroElement) {   // Proceed only if both elements exist

      const headerHeight = header.offsetHeight;       // Get the height of the header and put it in a const

      document.documentElement.style.setProperty('--header-height', headerHeight + 'px');       // Set a CSS variable for header height
      contheroElement.style.minHeight = `calc(100vh - ${headerHeight}px)`;       // Adjust the hero section height

      console.log("Header height:", headerHeight); // Log the header height

  } else {       // Log messages if elements are not found
      if (!header) { // = checks if (!header) is true do code.  !header = checks if header is "falsy." (i.e: header = false, 0 (the number zero) , "" (empty string) ,null, undefined, or NaN (Not a Number) */) If it is, the code block inside will be executed.
          console.log("Header element not found.");
      }
      if (!contheroElement) {
          console.log("conthero section not found.");
      }
  }
}


////////// header section size
updateLayout();   // Initial update -> call fct to update initial size 
window.addEventListener("resize", updateLayout);   // Update when user "resize" window -> call fct updateLayout to update hero height as we adjust viewport height (vh) 


////////// header bg (test)
// document.getElementsByTagName("header")[0].style.backgroundColor  = 'rgb(210, 255, 249)'; 


///////////////////////////////////////////////main
if ('caches' in window) { //clear all cashes, remove when website's online so its loads faster for users (cashes help store site memory?)
  caches.keys().then(function(names) {
      for (let name of names) caches.delete(name);
  });
}



/////////////////////////////// Programme jeux 
/*** 
while (true) { // Main program loop
  let jeu = prompt('Pour commencer, choisissez le jeu. Tapez "words", "RPG", ou "no" pour quitter:');
  switch (jeu) {
    case "words":
***/
      // !!!!!!!!!  fctmainwords ();
/***        break;

    case "RPG":
      document.querySelector(".zoneDebutpartie").innerHTML = `<b>===== Début de la partie =====</b>`; 
      fctmainRPG ();
      break;

    case "no":
      document.querySelector(".zoneMsg").innerHTML =`<b>Vous avez choisi de quitter le programme. À bientôt !</b>`;
      break;

    default:
      document.querySelector(".zoneMsg").innerHTML =`<b>Choix "${jeu}" est invalide. Veuillez taper "mots" ou "phrases" sans guillemets:</b>`;
      continue; // Restart the while loop
  }
  break; // Exit while loop and game 
}

***/

//////////////////////////////// Console logs:
/*
console.log(document.querySelectorAll(".zoneChoix input"));     //bring all the inputs and put them in a NodeList() // < quick ver : log the entire NodeList to the console as one object
*/

/*
for (let i = 0; i < document.querySelectorAll(".zoneChoix input").length; i++) {    
  console.log(document.querySelectorAll(".zoneChoix input")[i]);
}
*/

/*
document.querySelectorAll(".zoneChoix input").forEach(input => {   // console.log only values of what I want with a method
console.log(`ID: ${input.id}, Name: ${input.name}, Type: ${input.type}`);
});
*/
/////////////// logs

document.querySelectorAll(".zoneChoix input").forEach(input => {             // with a loop (openclasserooms) // < detailed ver : (many console.logs) for Each input element in the NodeList  individually - more useful for debug each one?       
  console.log(input);
});



console.log(document.getElementById("zoneProposition")); 

console.log(document.querySelector(".zoneinputtxt")); 

console.log(document.querySelector(".zonegrdform .cta")); 

console.log(document.querySelector(".zoneDebutpartie"));

console.log(document.querySelector(".zoneScore"));

console.log("this is zone message for msg at t:");
console.log(document.querySelector(".zoneMsg"));

console.log(document.querySelector(".zoneFinpartie"));

console.log("this is same zone message for msg final:");
console.log(document.querySelector(".zoneMsgfinal"));

console.log(document.querySelector(".zoneShare .cta"));

/////////////////// Lancement partie
fctmainwords(listeMots, listePhrases);

if (document.querySelector(".gamesection")) {  // Only if this element exist
  console.log("jeu exist!")
  document.querySelector(".zoneShare .cta").addEventListener("click", () => { // Only execute this code if the Partager btn is clicked to open popup
    fctgererpopup(); //lance popup si btn PARTAGER appuyé, lance fctgerer formulaire (teste et envoi de l'email)
  });
}






////////////////////////////////////////////////////////////////
////////////////////////// bckup //////////////////////////////
 
 /*


 */



/////////////////////////////////

/*

// 1. Variables
// Variables are used to store data. You can think of them as containers for data.

// Declaring a variable using 'var' (old way)
var name = "John"; // 'name' is a variable that holds the string "John"

// Declaring a variable using 'let' (preferred modern way)
let age = 30; // 'age' is a variable that holds the number 30

// Declaring a constant using 'const' (value cannot be changed)
const pi = 3.14; // 'pi' is a constant that holds the value 3.14

// 2. Data Types
// JavaScript has different types of data. Here are a few basic ones:

let isActive = true; // Boolean (true or false)
let score = 100; // Number (integer or floating-point)
let message = "Hello, World!"; // String (text)

// 3. Arrays
// Arrays are used to store multiple values in a single variable.

// Declaring an array
let fruits = ["Apple", "Banana", "Cherry"]; // An array of strings

// Accessing array elements (arrays are zero-indexed)
console.log(fruits[0]); // Output: Apple
console.log(fruits[1]); // Output: Banana

// Adding an element to the array
fruits.push("Orange"); // Adds "Orange" to the end of the array

// 4. Objects
// Objects are used to store collections of data. They consist of key-value pairs.

// Declaring an object
let person = {
  name: "Alice", // Key: 'name', Value: 'Alice'
  age: 25, // Key: 'age', Value: 25
  isStudent: true // Key: 'isStudent', Value: true
};

// Accessing object properties
console.log(person.name); // Output: Alice
console.log(person['age']); // Output: 25

// Adding a new property to the object
person.country = "USA";

// 5. Functions
// Functions are blocks of code designed to perform a particular task. They can be reused multiple times.

// Declaring a function
function greet(name) {
  return "Hello, " + name + "!"; // Returns a greeting message
}

// Calling the function
console.log(greet("Bob")); // Output: Hello, Bob!

// Function with default parameters
function add(x, y = 10) {  //here y = 10 is default)
  return x + y; // Returns the sum of x and y
}

console.log(add(5)); // Output: 15 (because y defaults to 10)

// 6. Function Expressions
// Functions can also be defined as expressions and stored in variables.

// Function expression
const multiply = function(a, b) {
  return a * b; // Returns the product of a and b
};

console.log(multiply(3, 4)); // Output: 12

// 7. Arrow Functions
// Arrow functions provide a more concise syntax for writing functions.

// Arrow function
const subtract = (a, b) => a - b; // Returns the difference of a and b

console.log(subtract(10, 3)); // Output: 7

// Summary
// 1. Variables store data.
// 2. Data types include numbers, strings, booleans, etc.
// 3. Arrays hold lists of values.
// 4. Objects store data in key-value pairs.
// 5. Functions perform tasks and can return values.
// 6. Function expressions store functions in variables.
// 7. Arrow functions provide a shorter syntax for functions.

*/