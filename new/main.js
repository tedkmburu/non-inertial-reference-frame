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
let tableSize = innerWidth / 3.490905;

let theInitVelx = 3;
let theInitVely = 1;

let backgroundSize = innerWidth * 2;

const theFrameRate = 60; 

const leftCanvasObject = canvas => {
    canvas.preload = function() { leftGrid = canvas.loadImage('grid2.png'); }
    canvas.setup = function()  // This function only runs once when the page first loads. 
    {
        canvas.createCanvas((innerWidth - 300) / 2, innerHeight); // creates the <canvas> that everything runs on.
        let cnv = canvas.createCanvas(innerWidth / 2, innerHeight); // creates the <canvas> that everything runs on.
        cnv.addClass('left');
        leftCanvas = canvas;
        canvas.angleMode(canvas.RADIANS);
    
        canvas.rectMode(canvas.CENTER);
        canvas.ellipseMode(canvas.CENTER);
        rectangles[0] = new Rectangle({
            size: canvas.createVector(tableSize, tableSize), 
            pos: canvas.createVector((innerWidth) / 4, innerHeight / 2), 
            omega: -omegaValue,
            frame: "room",
            canvas: leftCanvas});

        spheroids[0] = new Spheroid({
            pos: canvas.createVector((innerWidth) / 4, (innerHeight / 4) - 50), 
            vel: canvas.createVector(theInitVelx, theInitVely), 
            omega: canvas.createVector(0, 0, omegaValue), 
            fill: "red",
            frame: "room",
            canvas: leftCanvas});

            document.getElementById("mass").value = spheroids[0].mass;
            document.getElementById("velX").value = spheroids[0].vel.x;
            document.getElementById("velY").value = spheroids[0].vel.y;

            spheroids[0].reset()
    }
  
    canvas.draw = function() // this function runs every frame. Everything on the left canvas starts here.
    {  
        canvas.background(100); // sets the background color to grey
        canvas.frameRate(theFrameRate);  // the simulation will try limit itself to 60 frames per second. If a device can't maintain 60 fps, it will run at whatever it can
        canvas.push();
            canvas.translate(innerWidth / 4, innerHeight / 2)
            canvas.image(leftGrid,-innerWidth, -innerHeight, backgroundSize, backgroundSize)
        canvas.pop();

        if (play) { rectangles[0].move(); }
        rectangles[0].display();

        if (play) { spheroids[0].move(); }
        spheroids[0].display();

        canvas.fill(0);
        canvas.rect(canvas.width - 5, canvas.height / 2, 10, canvas.height)

        canvas.textSize(36)
        canvas.noStroke()
        canvas.textAlign(canvas.CENTER)
        canvas.text("Room Frame", canvas.width / 2, innerHeight - 30)

        let forceScale = 100;
        let centForceText = "<" + spheroids[0].centForce.copy().mult(forceScale).x.toFixed(2) + ", " + spheroids[0].centForce.copy().mult(forceScale).y.toFixed(2) + ">";
        let corForceText = "<" + spheroids[0].corForce.copy().mult(forceScale).x.toFixed(2) + ", " + spheroids[0].corForce.copy().mult(forceScale).y.toFixed(2) + ">";
        document.getElementById("cent").innerHTML = centForceText;
        document.getElementById("cor").innerHTML =  corForceText;
    }
  
    canvas.windowResized = function() // inbuilt p5 function. runs everytime the window is resized
    {
        canvas.resizeCanvas(innerWidth / 2, innerHeight); // resizes the canvas to fit the new window size
        canvas.setup()
    }
}


const rightCanvasObject = canvas => {
    canvas.preload = function() 
    { 
        rightGrid = canvas.loadImage('grid2.png'); 
        fCorImg = canvas.loadImage('ref (1).png'); 
        fCfImg = canvas.loadImage('ref (2).png'); 
        vImg = canvas.loadImage('v.png'); 
    }
    canvas.setup = function()  // This function only runs once when the page first loads. 
    {
        let cnv = canvas.createCanvas(innerWidth / 2, innerHeight); // creates the <canvas> that everything runs on.
        cnv.addClass('right');
        rightCanvas = canvas;
        canvas.angleMode(canvas.RADIANS);
    
        canvas.rectMode(canvas.CENTER);
        canvas.ellipseMode(canvas.CENTER);
        rectangles[1] = new Rectangle({
            size: canvas.createVector(tableSize, tableSize), 
            pos: canvas.createVector((innerWidth) / 4, innerHeight / 2), 
            omega: 0.0,
            frame: "table",
            canvas: rightCanvas});
        spheroids[1] = new Spheroid({
            pos: canvas.createVector((innerWidth) / 4, (innerHeight / 4) - 50), 
            vel: canvas.createVector(theInitVelx, theInitVely), 
            omega: canvas.createVector(0, 0, omegaValue), 
            fill: "red",
            frame: "table",
            canvas: rightCanvas});

        spheroids[1].reset()
    }
  
    canvas.draw = function() // this function runs every frame. Everything on the right canvas starts here.
    {  
        canvas.background(175); // sets the background color to grey
        canvas.frameRate(theFrameRate);  // the simulation will try limit itself to 60 frames per second. If a device can't maintain 60 fps, it will run at whatever it can
        canvas.push();
            canvas.translate(innerWidth / 4, innerHeight / 2)
            canvas.rotate(roomAngle)
            canvas.image(rightGrid,-innerWidth, -innerHeight, backgroundSize, backgroundSize)
        canvas.pop();

        if (play) { rectangles[1].move(); }
        rectangles[1].display();

        if (play) { spheroids[1].move(); }
        spheroids[1].display();

        if (play) { roomAngle += omegaValue }

        if (spheroids[1].pos.x < 0 || spheroids[1].pos.x > innerWidth / 2) 
        {
            togglePlay(false);
        }

        canvas.textSize(36)
        canvas.fill("black");
        canvas.noStroke()
        canvas.text("Table Frame", canvas.width / 2, innerHeight - 30)
        canvas.textAlign(canvas.CENTER)
    }
  
    canvas.windowResized = function() // inbuilt p5 function. runs everytime the window is resized
    {
        canvas.resizeCanvas(innerWidth / 2, innerHeight); // resizes the canvas to fit the new window size
        canvas.setup()
    }
}

new p5(leftCanvasObject); // creates the left instance of p5
new p5(rightCanvasObject); // creates the right instance of p5


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
        this.canvas.fill("white");
        this.canvas.stroke(0)

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

                let theFirst = true;

                try
                {
                    spheroids[0].previousPositions.forEach( (position, i) => {
        
                        this.canvas.push()
            
                            this.canvas.fill(i == 0 ? "red" : this.fill);
                            this.canvas.stroke(this.stroke);
                    
                            let size = spheroidSize / 10; 
    
                            let thePoint = p5.Vector.sub(position, this.pos)
    
                            if (i == 0) 
                            {
                                this.canvas.ellipse(thePoint.x,  thePoint.y, spheroidSize  *  spheroids[0].mass, spheroidSize  * spheroids[0].mass); 
                            }
                            else
                            {
                                this.canvas.ellipse(thePoint.x,  thePoint.y, size, size); 
                            }
    
                        
                        this.canvas.pop()
                    })
                }
                catch (e)
                {
                    location.reload();
                }
                
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
        this.vel = props.vel || this.canvas.createVector(0, 0); 
        this.acc = props.acc || this.canvas.createVector(0, 0); 

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
        // calculate the Coriolis and centrifugal forces for a particle
        this.corForce = p5.Vector.mult(p5.Vector.cross(this.vel, this.omega), (-2 * this.mass));
        this.centForce = p5.Vector.mult(p5.Vector.sub(this.pos, rectangles[0].pos), p5.Vector.dot(this.omega, this.omega) * this.mass);

        // combine the Coriolis and centrifugal forces and divide by mass to get net force
        this.acc = p5.Vector.add(this.corForce, this.centForce).div(this.mass);

        // eulers method with vectors
        this.vel.add(this.acc);
        this.pos.add(this.vel);

        // this will add points to the trail of the red ball
        if (this.canvas.frameCount % 15 == 0) 
        {
            let newPosition = this.pos.copy()
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
            //let thePoint = p5.Vector.sub(this.pos, rectangles[0].pos)
            // this.canvas.ellipse(thePoint.x,  thePoint.y, size, size);

            

            // this.canvas.translate(rectangles[0].pos.x, rectangles[0].pos.y)
            // let angle = rectangles[0].omega * rightCanvas.frameCount * 1;
            // console.log(angle);
            // this.canvas.rotate(angle)
            this.canvas.push()
            if (this.frame == "table")
            {
                // this.canvas.rotate(rectangles[0].angle)    
                // this.canvas.ellipse(this.pos.x, this.pos.y, spheroidSize * this.mass, spheroidSize * this.mass);
            }
            else
            {
                // this.canvas.fill("red");
                // let lastIndex = spheroids[0].previousPositions.length - 1;
                // this.canvas.ellipse(spheroids[0].previousPositions[lastIndex].x, spheroids[0].previousPositions[lastIndex].y, spheroidSize * this.mass, spheroidSize * this.mass);
            }
            
            this.canvas.pop()
            
        }
        else
        {
            this.canvas.ellipse(this.pos.x, this.pos.y, spheroidSize * this.mass, spheroidSize * this.mass);
        }
        
        

        if (this.frame == "table") 
        {
            let fCorFinalPosition = p5.Vector.add(this.pos, p5.Vector.mult(this.corForce, 10000));
            let fCentFinalPosition = p5.Vector.add(this.pos, p5.Vector.mult(this.centForce, 10000));
            let velFinalPosition = p5.Vector.add(this.pos, p5.Vector.mult(this.vel, 100));
            
            createArrow(this.pos, fCorFinalPosition, this.corForce.heading(), "blue", 1, this.canvas);
            createArrow(this.pos, fCentFinalPosition, this.centForce.heading(), "green", 1, this.canvas);
            createArrow(this.pos, velFinalPosition, this.vel.heading(), "red", 1, this.canvas);

            let scaleCor = 30;
            let scaleCf = 30;
            let scaleV = 1.5;

            this.canvas.image(fCorImg,fCorFinalPosition.x, fCorFinalPosition.y, 2000/scaleCor, 1320/scaleCor)
            this.canvas.image(fCfImg,fCentFinalPosition.x, fCentFinalPosition.y, 1656/scaleCf, 1464/scaleCf)
            this.canvas.image(vImg,velFinalPosition.x, velFinalPosition.y, 46/scaleV, 61/scaleV)
            
            

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
        // this.pos = this.startingPos.copy(); 

        this.omega = this.canvas.createVector(0, 0, omegaValue)

        this.previousPositions = [this.pos]
    }
}

function menuInput()
{
    spheroids[0].startingVel.x = parseInt(document.getElementById("velX").value);
    spheroids[0].startingVel.y = parseInt(document.getElementById("velY").value);

   
    spheroids[1].startingVel.x = parseInt(document.getElementById("velX").value);
    spheroids[1].startingVel.y = parseInt(document.getElementById("velY").value);
    // spheroids[0].startingVel.z = parseInt(document.getElementById("velZ").value);

    omegaValue = parseFloat(document.getElementById("omega").value);

    rectangles.forEach(rectangle => {
        rectangle.omegaValue = omegaValue;
    })

    spheroids.forEach(spheroid => {
        spheroid.omega = canvas.createVector(0, 0, omegaValue);
    })

    

    spheroids[0].mass = parseFloat(document.getElementById("mass").value);
    spheroids[1].mass = parseFloat(document.getElementById("mass").value);

    // console.log(document.getElementById("frame").value );
}

function resetAll()
{
    // omegaValue = newOmegaValue;

    rectangles[0].omega = -newOmegaValue

    // spheroids[0].mass = parseFloat(document.getElementById("mass").value);
    // spheroids[1].mass = parseFloat(document.getElementById("mass").value);
    
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
            document.getElementById("play").value = "Play";
        }
        else
        {
            document.getElementById("play").value = "Pause";
        }
    }
    else
    {
        play = state; 
        document.getElementById("play").value = state ? "Pause" : "Play";
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