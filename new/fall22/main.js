const theFrameRate = 60; 

let playState = true;

let spheroidSize = 25;
let tableSize = innerWidth / 3;

let rectangles = []
let spheroids = []

let omegaValue = 0.005;

let theInitVelx = 2;
let theInitVely = 2;

new p5(leftCanvasObject); // creates the left instance of p5
