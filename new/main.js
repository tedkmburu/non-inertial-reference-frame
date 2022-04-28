let leftCanvas, rightCanvas; 
let fCorImg, fCfImg, vImg;

let boxes = [];

let rectangles = [];
let spheroids = [];
let arrows = [];
let myCamera;

let buttons = [];
let checkBoxes = [];
let sliders = [];

let play = true;

let omegaValue = 0.005;
let newOmegaValue = 0.005;
let roomAngle = 0;

let grid, leftGrid, rightGrid;
let room;

let spheroidSize = 25;
let tableSize = innerWidth / 3;

let theInitVelx = 0;
let theInitVely = 3;

let backgroundSize = innerWidth * 2;

const theFrameRate = 60; 

new p5(leftCanvasObject); // creates the left instance of p5
new p5(rightCanvasObject); // creates the right instance of p5

function menuInput()
{
    spheroids[0].startingVel.x = parseInt(document.getElementById("velX").value);
    spheroids[0].startingVel.y = parseInt(document.getElementById("velY").value);

    spheroids[1].startingVel.x = parseInt(document.getElementById("velX").value);
    spheroids[1].startingVel.y = parseInt(document.getElementById("velY").value);

    omegaValue = parseFloat(document.getElementById("omega").value);

    rectangles.forEach(rectangle => {
        rectangle.omegaValue = omegaValue;
    })

    spheroids.forEach(spheroid => {
        spheroid.omega = canvas.createVector(0, 0, omegaValue);
    })

    spheroids[0].mass = parseFloat(document.getElementById("mass").value);
    spheroids[1].mass = parseFloat(document.getElementById("mass").value);
}

function resetAll()
{
    // omegaValue = newOmegaValue;

    rectangles[0].omega = -omegaValue

    spheroids[0].mass = parseFloat(document.getElementById("mass").value);
    spheroids[1].mass = parseFloat(document.getElementById("mass").value);
    
    spheroids.forEach(sphere => {
        sphere.reset()
    })

    rectangles.forEach(rectangle => {
        rectangle.reset()
        // rectangle.omega = newOmegaValue;
    }) 
}

function togglePlay(state)
{
    if (state == undefined || state == null) 
    {
        play = !play;

        if (play) 
        {
            // document.getElementById("play").value = "Play";
            document.getElementById("playPause").src = "images/pause-solid.svg";
        }
        else
        {
            // document.getElementById("play").value = "Pause";
            document.getElementById("playPause").src = "images/play-solid.svg";
        }
    }
    else
    {
        play = state; 
        // document.getElementById("play").value = state ? "Pause" : "Play";
        document.getElementById("playPause").src = state ? "images/pause-solid.svg": "images/play-solid.svg";
        // console.log(state);
    }
}

function createArrow(start, end, angle, color, scale, canvas)
{
    if (p5.Vector.sub(end, start).mag() > 1) 
    {
        canvas.push();
            canvas.stroke(color);
            canvas.strokeWeight(scale * 4);
            canvas.noFill();
            canvas.line(start.x, start.y, end.x, end.y);

            canvas.translate(end.x, end.y)
            canvas.rotate(angle);
            canvas.fill(color);

            canvas.triangle(0, 0, -10 * scale, -5 * scale, -10 * scale, 5 * scale);
        canvas.pop();
    }
}

function mouseDraggedLeft(canvas) 
{
    let mousePosition = canvas.createVector(canvas.mouseX, canvas.mouseY)

    spheroids.forEach(spheroid => { // loop through all spheroids. Used a JavaScript array function
        let distance = p5.Vector.dist(mousePosition, spheroid.pos); // get distance between two points. Used p5 vector.dist(vector) function
        if (distance < spheroidSize)
        {
            console.log("inside");
        }
    })
}

function mouseDraggedRight(canvas) 
{
    let mousePosition = canvas.createVector(canvas.mouseX, canvas.mouseY)

    spheroids.forEach(spheroid => { // loop through all spheroids. Used a JavaScript array function
        let distance = p5.Vector.dist(mousePosition, spheroid.pos); // get distance between two points. Used p5 vector.dist(vector) function
        if (distance < spheroidSize)
        {
            // console.log("inside");
            spheroid.pos = mousePosition.copy();
        }
    })
}




// fix vectors
// split screen
// lock 2d perspective 
// change background
// lock background with omega
// check fixed eq with videos
// apply trajectory to table 
// differential trajectory relative as seen on/ off the table




// frame rate slider
// shrink vel arrow
// host it
// color code the text
// make it more user friendly