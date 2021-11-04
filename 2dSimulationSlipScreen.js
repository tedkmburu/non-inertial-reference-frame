let leftCanvas, rightCanvas; 

let boxes = [];

let rectangles = [];
let spheroids = [];
let arrows = [];
let myCamera;

let buttons = [];
let checkBoxes = [];
let sliders = [];

let play = true;

let omegaValue = 0.001;
let roomAngle = 0;

let grid, leftGrid, rightGrid;
let room;

let spheroidSize = 25;
let tableSize = 550;

let theInitVelx = 1;
let theInitVely = 1;

const theFrameRate = 60; 

const leftCanvasObject = canvas => {
    canvas.preload = function() { leftGrid = canvas.loadImage('grid.png'); }
    canvas.setup = function()  // This function only runs once when the page first loads. 
    {
        canvas.createCanvas((innerWidth - 300) / 2, innerHeight); // creates the <canvas> that everything runs on.
        let cnv = canvas.createCanvas((innerWidth - 300) / 2, innerHeight); // creates the <canvas> that everything runs on.
        cnv.addClass('left');
        leftCanvas = canvas;
        canvas.angleMode(canvas.RADIANS);
    
        canvas.rectMode(canvas.CENTER);
        canvas.ellipseMode(canvas.CENTER);
        rectangles[0] = new Rectangle({
            size: canvas.createVector(tableSize, tableSize), 
            pos: canvas.createVector((innerWidth - 300) / 4, innerHeight / 2), 
            omega: - omegaValue,
            frame: "room",
            canvas: leftCanvas});
        spheroids[0] = new Spheroid({
            pos: canvas.createVector((innerWidth - 300) / 5, (innerHeight / 4) - 50), 
            vel: canvas.createVector(theInitVelx, theInitVely), 
            omega: canvas.createVector(0, 0, omegaValue), 
            fill: "red",
            frame: "room",
            canvas: leftCanvas});

            document.getElementById("mass").value = spheroids[0].mass;
            document.getElementById("velX").value = spheroids[0].vel.x;
            document.getElementById("velY").value = spheroids[0].vel.y;
    }
  
    canvas.draw = function() // this function runs every frame. Everything on the background canvas starts here.
    {  
        canvas.background(100); // sets the background color to grey
        canvas.frameRate(theFrameRate);  // the simulation will try limit itself to 60 frames per second. If a device can't maintain 60 fps, it will run at whatever it can
        canvas.push();
            canvas.translate(innerWidth / 4, innerHeight / 2)
            canvas.image(leftGrid,-innerWidth, -innerHeight, innerWidth * 2, innerHeight * 2)
        canvas.pop();

        if (play) { rectangles[0].move(); }
        rectangles[0].display();

        if (play) { spheroids[0].move(); }
        spheroids[0].display();

        canvas.text("Room Frame", canvas.width / 2, 20)

        // console.log(spheroids[1].vel)
    }
  
    canvas.windowResized = function() // inbuilt p5 function. runs everytime the window is resized
    {
      canvas.resizeCanvas((innerWidth - 300) / 2, innerHeight); // resizes the canvas to fit the new window size
    }
}


const rightCanvasObject = canvas => {
    canvas.preload = function() { rightGrid = canvas.loadImage('grid.png'); }
    canvas.setup = function()  // This function only runs once when the page first loads. 
    {
        let cnv = canvas.createCanvas((innerWidth - 300) / 2, innerHeight); // creates the <canvas> that everything runs on.
        cnv.addClass('right');
        rightCanvas = canvas;
        canvas.angleMode(canvas.RADIANS);
    
        canvas.rectMode(canvas.CENTER);
        canvas.ellipseMode(canvas.CENTER);
        rectangles[1] = new Rectangle({
            size: canvas.createVector(tableSize, tableSize), 
            pos: canvas.createVector((innerWidth - 300) / 4, innerHeight / 2), 
            omega: 0.0,
            frame: "table",
            canvas: rightCanvas});
        spheroids[1] = new Spheroid({
            pos: canvas.createVector((innerWidth - 300) / 5, (innerHeight / 4) - 50), 
            vel: canvas.createVector(theInitVelx, theInitVely), 
            omega: canvas.createVector(0, 0, omegaValue), 
            fill: "red",
            frame: "table",
            canvas: rightCanvas});
    }
  
    canvas.draw = function() // this function runs every frame. Everything on the background canvas starts here.
    {  
        canvas.background(175); // sets the background color to grey
        canvas.frameRate(theFrameRate);  // the simulation will try limit itself to 60 frames per second. If a device can't maintain 60 fps, it will run at whatever it can
        canvas.push();
            canvas.translate(innerWidth / 4, innerHeight / 2)
            canvas.rotate(roomAngle)
            canvas.image(rightGrid,-innerWidth, -innerHeight, innerWidth * 2, innerHeight * 2)
        canvas.pop();

        if (play) { rectangles[1].move(); }
        rectangles[1].display();

        if (play) { spheroids[1].move(); }
        spheroids[1].display();

        if (play) { roomAngle += omegaValue }

        canvas.text("Table Frame", canvas.width / 2, 20)
        document.getElementById("cent").innerHTML = "<" + spheroids[0].centForce.x.toFixed(3) + ", " + spheroids[0].centForce.y.toFixed(3) + ">";
    document.getElementById("cor").innerHTML =  "<" + spheroids[0].corForce.x.toFixed(3) + ", " + spheroids[0].corForce.y.toFixed(3) + ">";
    }
  
    canvas.windowResized = function() // inbuilt p5 function. runs everytime the window is resized
    {
      canvas.resizeCanvas((innerWidth - 300) / 2, innerHeight); // resizes the canvas to fit the new window size
    }
}

new p5(leftCanvasObject); // creates the background instance of p5
new p5(rightCanvasObject); // creates the foreground instance of p5


class Rectangle
{
    constructor(props)
    {
        this.canvas = props.canvas;
        this.pos = props.pos || this.canvas.createVector(0, 0); 
        this.vel = props.vel || this.canvas.createVector(0, 0); 
        this.acc = props.acc || this.canvas.createVector(0, 0); 
        this.angle = props.angle || 0;
        this.omega = props.omega || 0; 
        this.angularAcceleration = props.angularAcceleration || 0;

        this.stroke = props.stroke || "black";
        this.fill = props.fill || "white";

        this.previousPositions = [this.pos]

        this.frame = props.frame; 
    }

    move()
    {
        this.omega += this.angularAcceleration;
        this.angle += this.omega;

        this.vel.add(this.acc);
        this.pos.add(this.vel);

        // if (this.canvas.frameCount % 15 == 0 && this.frame == "room") 
        // {
        //     let newPosition = this.canvas.createVector(spheroids[0].pos.x, spheroids[0].pos.y);
        //     this.previousPositions.push(newPosition);
        // }
    }

    display()
    {
        this.canvas.push()
            this.canvas.translate(this.pos);
            this.canvas.rotate(this.angle);
            this.canvas.fill(this.fill);
            this.canvas.stroke(this.stroke)
            this.canvas.rect(0, 0, tableSize, tableSize);
        this.canvas.pop()
        
        this.canvas.ellipse(this.pos.x, this.pos.y, spheroidSize, spheroidSize);

        if (this.frame == "room") 
        {
            this.canvas.push()
                this.canvas.stroke(0)
                this.canvas.translate(this.pos)
                
                this.canvas.rotate(this.angle);

                spheroids[1].previousPositions.forEach( (position, i) => {
        
                    this.canvas.push()
        
                        this.canvas.fill(this.fill);
                        this.canvas.stroke(this.stroke);
                
                        let size = spheroidSize / 10; 
                        // this.canvas.rotate(((this.angle * -1) - ((i + 1) / 14.5)));

                        let thePoint = p5.Vector.sub(position, this.pos)
                        this.canvas.ellipse(thePoint.x,  thePoint.y, size, size);

                        
        
                    this.canvas.pop()
                })
            this.canvas.pop()     
        }
    }

    reset()
    {
        this.previousPositions = [this.pos];
        this.angle = 0;
    }
}

class Spheroid
{
    constructor(props)
    {
        this.canvas = props.canvas;
        this.mass = props.mass || 1;

        this.startingPos = props.pos || this.canvas.createVector(0, 0); 
        this.startingVel = props.vel || this.canvas.createVector(0, 0); 
        this.startingAcc = props.acc || this.canvas.createVector(0, 0); 

        this.reset();
        this.angle = props.angle || this.canvas.createVector(0, 0)
        this.omega = props.omega || this.canvas.createVector(0, 0); 
        this.angularAcceleration = props.angularAcceleration || this.canvas.createVector(0, 0);

        this.corForce = props.corForce || this.canvas.createVector(0, 0);
        this.centForce = props.centForce || this.canvas.createVector(0, 0);

        this.previousPositions = [props.pos]

        this.stroke = props.stroke || "black";
        this.fill = props.fill || "white";

        this.frame = props.frame; 
    }

    move()
    {

        // this.corForce = p5.Vector.mult(p5.Vector.cross(this.vel, this.omega), (-2 * this.mass));
        // this.centForce = p5.Vector.mult(p5.Vector.cross(this.omega, this.pos), this.mass).cross(this.omega);

        this.corForce = p5.Vector.mult(p5.Vector.cross(this.vel, this.omega), (-2 * this.mass));
        this.centForce = p5.Vector.mult(p5.Vector.sub(this.pos, rectangles[0].pos), p5.Vector.dot(this.omega, this.omega) * this.mass);


        this.acc = p5.Vector.add(this.corForce, this.centForce).div(this.mass);

        this.vel.add(this.acc);
        this.pos.add(this.vel);


        if (this.canvas.frameCount % 15 == 0) 
        {
            let newPosition = this.canvas.createVector(this.pos.x, this.pos.y)
            this.previousPositions.push(newPosition)
        }
        
    }

    display()
    {
        this.canvas.push()

        this.canvas.fill(this.fill);
        this.canvas.stroke(this.stroke);

        if (this.frame == "room")
        {
            let thePoint = p5.Vector.sub(this.pos, rectangles[0].pos)
            // this.canvas.ellipse(thePoint.x,  thePoint.y, size, size);

            this.canvas.fill("green");
            this.canvas.ellipse(rectangles[0].pos.x, rectangles[0].pos.y, spheroidSize, spheroidSize);

            // this.canvas.translate(rectangles[0].pos.x, rectangles[0].pos.y)
            let angle = rectangles[0].omega * rightCanvas.frameCount * 1;
            // console.log(angle);
            // this.canvas.rotate(angle)
            this.canvas.ellipse(this.pos.x, this.pos.y, spheroidSize, spheroidSize);

            
        }
        else
        {
            this.canvas.ellipse(this.pos.x, this.pos.y, spheroidSize, spheroidSize);
        }
        
        

        if (this.frame == "table") 
        {
            createArrow(this.pos, p5.Vector.add(this.pos, p5.Vector.mult(this.corForce, 10000)), this.corForce.heading(), "blue", 1, this.canvas);
            createArrow(this.pos, p5.Vector.add(this.pos, p5.Vector.mult(this.centForce, 10000)), this.centForce.heading(), "green", 1, this.canvas);
            createArrow(this.pos, p5.Vector.add(this.pos, p5.Vector.mult(this.vel, 10000)), this.vel.heading(), "red", 1, this.canvas);

        }
        
        this.canvas.pop()

        this.canvas.push()
        this.canvas.stroke(0)
        
        if (this.frame == "table") 
        {
            this.previousPositions.forEach( position => {

                this.canvas.push()

                    this.canvas.fill(this.fill);
                    this.canvas.stroke(this.stroke);
            
                    let size = spheroidSize / 10; 
                    this.canvas.ellipse(position.x, position.y, size, size);

                this.canvas.pop()
            })
            this.canvas.pop()
        }
    }

    reset()
    {
        roomAngle = 0;
        this.pos = this.startingPos.copy(); 
        this.vel = this.startingVel.copy(); 
        this.pos = this.startingPos.copy(); 

        this.omega = this.canvas.createVector(0, 0, omegaValue)

        this.previousPositions = [this.pos]
    }
}

function menuInput()
{
    spheroids[0].mass = parseInt(document.getElementById("mass").value);
    spheroids[0].startingVel.x = parseInt(document.getElementById("velX").value);
    spheroids[0].startingVel.y = parseInt(document.getElementById("velY").value);
    // spheroids[0].startingVel.z = parseInt(document.getElementById("velZ").value);

    omegaValue = parseFloat(document.getElementById("omega").value);

    let ele = document.getElementsByName('frame');
    console.log(ele);      
    
    for(i = 0; i < ele.length; i++) 
    {
        // console.log(ele[i].checked);
        if(ele[i].checked)
        {
            console.log(ele[i].value);
        }
    }

    console.log(document.getElementById("frame").value );
}

function resetAll()
{
    spheroids.forEach(sphere => {
        sphere.reset()
    })

    rectangles.forEach(rectangle => {
        rectangle.reset()
    })
}

function togglePlay()
{
    play = !play;

    if (play) {
        document.getElementById("play").value = "Play";
    }
    else
    {
        document.getElementById("play").value = "Pause";
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