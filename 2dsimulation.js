let previousMousePosition;

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
let roomAngle = 0;

let grid;
let room;

function preload() 
{
    grid = loadImage('grid.png');
    room = loadModel('room.stl');
}


function setup()
{
    createCanvas(innerWidth - 300, innerHeight);

    rectMode(CENTER);
    ellipseMode(CENTER);
    rectangles.push(new Rectangle({size: createVector(800, 800), pos: createVector((innerWidth - 300) / 2, innerHeight / 2), omega: 0.0}));

    spheroids.push(new Spheroid({size: createVector(25, 25), pos: createVector((innerWidth - 300) / 4, (innerHeight / 4) - 50), vel: createVector(2, 2), omega: createVector(0, 0, omegaValue), fill: "red"}));

    document.getElementById("mass").value = spheroids[0].mass;
    document.getElementById("velX").value = spheroids[0].startingVel.x;
    document.getElementById("velY").value = spheroids[0].startingVel.y;
}

function draw() 
{
    mousePosition = createVector(mouseX, mouseY);
    previousMousePosition = createVector(pmouseX, pmouseY);
    background(175);
    frameRate(60);

    displayCheckBoxes();

    push();
    
    
    translate(innerWidth / 2, innerHeight / 2)
    rotate(roomAngle)
    image(grid,-innerWidth, -innerHeight, innerWidth * 2, innerHeight * 2)
    pop();

    rectangles.forEach(rectangle => {
        rectangle.move()
        rectangle.display()
    });

    spheroids.forEach(spheroid => {
        if (play) 
        {
            spheroid.move();
        }
        
        spheroid.display();
    });

    arrows.forEach(arrow => {
        arrow.display()
    });


    

    if (play) 
    {
        roomAngle -= 0.01
    }

    document.getElementById("cent").innerHTML = "<" + spheroids[0].centForce.x.toFixed(3) + ", " + spheroids[0].centForce.y.toFixed(3) + ">";
    document.getElementById("cor").innerHTML =  "<" + spheroids[0].corForce.x.toFixed(3) + ", " + spheroids[0].corForce.y.toFixed(3) + ">";
}

function calibrateCamera() 
{

}

class Arrow
{
    constructor(props)
    {
        this.arrow = props.arrow;
        this.pos = props.pos;
        this.mag = this.arrow.mag()
        this.color = props.color || "red";
        this.text = props.text;
    }

    display()
    {
        push()
        fill(this.color)
        pop()

        push()
        stroke(this.color)
        strokeWeight(this.mag / 50)
        line(this.pos.x, this.pos.y, this.arrow.x + this.pos.x, this.arrow.y + this.pos.y);

        pop()
    }
}

class Rectangle
{
    constructor(props)
    {
        this.size = props.size || createVector(0, 0);
        this.pos = props.pos || createVector(0, 0); 
        this.vel = props.vel || createVector(0, 0); 
        this.acc = props.acc || createVector(0, 0); 
        this.angle = props.angle || 0;
        this.omega = props.omega || 0; 
        this.angularAcceleration = props.angularAcceleration || 0;

        this.stroke = props.stroke || "black";
        this.fill = props.fill || "white";
    }

    move()
    {
        this.omega += this.angularAcceleration;
        this.angle += this.omega;

        this.vel.add(this.acc);
        this.pos.add(this.vel);
    }

    display()
    {
        push()
        translate(this.pos);
        rotate(this.angle);
        // rotateY(this.angle.y);

        

        fill(this.fill);
        stroke(this.stroke)
        
        rect(0, 0, this.size.x, this.size.y);

        pop()
    }
}

class Spheroid
{
    constructor(props)
    {
        this.size = props.size || createVector(0, 0);
        this.mass = props.mass || 1;

        this.startingPos = props.pos || createVector(0, 0); 
        this.startingVel = props.vel || createVector(0, 0); 
        this.startingAcc = props.acc || createVector(0, 0); 

        this.reset();
        this.angle = props.angle || createVector(0, 0)
        this.omega = props.omega || createVector(0, 0); 
        this.angularAcceleration = props.angularAcceleration || createVector(0, 0);

        this.corForce = props.corForce || createVector(0, 0);
        this.centForce = props.centForce || createVector(0, 0);

        this.previousPositions = [props.pos]

        this.stroke = props.stroke || "black";
        this.fill = props.fill || "white";
    }

    move()
    {

        this.corForce = p5.Vector.mult(p5.Vector.cross(this.omega, this.vel), (2 * this.mass));

        this.centForce = p5.Vector.mult(p5.Vector.cross(this.omega, this.pos), this.mass).cross(this.omega)

        this.acc = p5.Vector.add(this.corForce, this.centForce).div(this.mass);

        this.vel.add(this.acc);
        this.pos.add(this.vel);

        if (frameCount % 15 == 0) 
        {
            let newPosition = createVector(this.pos.x, this.pos.y)
            this.previousPositions.push(newPosition)
        }
        
    }

    display()
    {
        push()

        fill(this.fill);
        stroke(this.stroke);

        ellipse(this.pos.x, this.pos.y, this.size.x, this.size.y);
        createArrow(this.pos, p5.Vector.add(this.pos, p5.Vector.mult(this.corForce, 10000)), this.corForce.heading(), "blue", 1);
        createArrow(this.pos, p5.Vector.add(this.pos, p5.Vector.mult(this.centForce, 10000)), this.centForce.heading(), "green", 1);

        pop()

        push()
        stroke(0)

        this.previousPositions.forEach( position => {

            push()

                fill(this.fill);
                stroke(this.stroke);
        
                let size = this.size.x / 10; 
                ellipse(position.x, position.y, size, size);

            pop()
        })
        pop()
    }

    reset()
    {
        roomAngle = 0;
        this.pos = this.startingPos.copy(); 
        this.vel = this.startingVel.copy(); 
        this.pos = this.startingPos.copy(); 

        this.omega = createVector(0, 0, omegaValue)

        this.previousPositions = [this.pos]
    }
}

function menuInput()
{
    spheroids[0].mass = parseInt(document.getElementById("mass").value);
    spheroids[0].startingVel.x = parseInt(document.getElementById("velX").value);
    spheroids[0].startingVel.y = parseInt(document.getElementById("velY").value);
    spheroids[0].startingVel.z = parseInt(document.getElementById("velZ").value);

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

function createArrow(start, end, angle, color, scale)
{
    push();
        stroke(color);
        strokeWeight(scale * 4);
        noFill();
        line(start.x, start.y, end.x, end.y);

        translate(end.x, end.y)
        rotate(angle);
            fill(color);

        triangle(0, 0, -10 * scale, -5 * scale, -10 * scale, 5 * scale);
    pop();
}


// fix vectors
// split screen
// lock 2d perspective 
// change background
// lock background with omega
// check fixeed eq with videos
// apply trajectory to table 
// differential trajectory relative as seen on/ off the table