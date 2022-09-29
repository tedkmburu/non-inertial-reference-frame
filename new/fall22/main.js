const theFrameRate = 30; 

let playState = true;
let playForward = true;

let spheroidSize = 25;
let tableSize = innerWidth / 3;

let rectangles = []
let spheroids = []

let omegaValue = 0.005;

let theInitVelx = 1;
let theInitVely = 2;

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
    playForward = !playForward;

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
    playState = false; 
    playForward = true;
    
    spheroids.forEach(spheroid => {
        spheroid.reset()
    })

    rectangles.forEach(rectangle => {
        rectangle.reset()
    })
}