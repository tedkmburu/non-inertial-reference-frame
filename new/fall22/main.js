const theFrameRate = 60; 

let playState = true;
let playForward = true;
let reseting = false;

let spheroidSize = 25;
let tableSize = innerWidth / 3;

let rectangles = []
let spheroids = []

let omegaValue = 0.005;
let mass = 1;

let theInitVelx = 0.5;
let theInitVely = 1;

let rightGrid, fCorImg, fCfImg, vImg, equation

new p5(leftCanvasObject); // creates the left instance of p5
new p5(rightCanvasObject); // creates the right instance of p5


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

function toggleRewind()
{
    console.log("toggle rewind");
    playForward = !playForward;
    reseting = false;
    playState = true; 

    if (playForward) 
    {
        document.getElementById("playForward").src = "images/backward-solid.svg";
    }
    else
    {
        document.getElementById("playForward").src = "images/forward-solid.svg";
    }
}

function togglePlay()
{
    console.log("toggle play");
    playState = !playState;

    if (playState) 
    {
        document.getElementById("playPause").src = "images/pause-solid.svg";
    }
    else
    {
        document.getElementById("playPause").src = "images/play-solid.svg";
    }
}

function resetAll()
{
    console.log("reset");
    reseting = true;
    playState = false; 
    playForward = true;

    spheroids.forEach(spheroid => {
        spheroid.reset()
    })

    rectangles.forEach(rectangle => {
        rectangle.reset()
    })
}

function changeOmega()
{
    // console.log("adsf");
    omegaValue = parseFloat(document.getElementById("omega").value);
    console.log(omegaValue);
    rectangles[0].omega = omegaValue;
}

function changeMass()
{
    mass = parseFloat(document.getElementById("mass").value);
    spheroids[0].mass = mass;
    spheroids[1].mass = mass;
}
