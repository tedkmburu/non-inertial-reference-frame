const theFrameRate = 60; 

let landscape;
let canvasHeight, canvasWidth;
let canvasPosX, canvasPosY, spheroidPosX, spheroidPosY;
let tableSize;
let roomCnv, tableCnv; 
let controlMenu; 

let playState = true;
let playForward = true;
let reseting = false;
let showHelp = false;

let spheroidSize = 25;

let gravity = 0.25;

let trucks = []

let mass = 1;
let scale = 0.1;

let truckVel = 1
// let scale;

let theInitVelx = 0.01;
let theInitVely = 1;

let cannonImg1, cannonImg2, cannonImg3, enviroment;

let truckImg, rightGrid, fCorImg, fCfImg, vImg, equation;

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
    // console.log(omegaValue);
    rectangles[0].omega = omegaValue;
    rectangles[1].omega = 0;

    spheroids[1].omega = new p5.Vector(0, 0, omegaValue);
    spheroids[0].omega = new p5.Vector(0, 0, 0);
}

function changeMass()
{
    mass = parseFloat(document.getElementById("mass").value);
    spheroids[0].mass = mass;
    spheroids[1].mass = mass;
}

function toggleHelp()
{
    togglePlay()
    showHelp = !showHelp;

    let helpContainer = document.getElementById("helpContainer");
    if (showHelp) 
    {
        helpContainer.style.display = 'block';
    }
    else
    {
        helpContainer.style.display = 'none';
    }
}

