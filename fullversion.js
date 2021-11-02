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

let omegaValue = 0.005


function setup()
{
    createCanvas(innerWidth - 300, innerHeight, WEBGL);

    rectMode(CENTER);
    ellipseMode(CENTER);
    myCamera = {
        pos: createVector(0, 0, (innerHeight/2) / tan(Math.PI/6)),
        vel: createVector(0, 0, 0), 
        acc: createVector(0, 0, 0), 
        center: createVector(0, 0, 0), 
        up: createVector(0, 1, 0),
        angle: createVector(0, 0, 0),
        omega: createVector(0, 0, 0),
        angle: 0.0,
        angularAcceleration: createVector(0, 0, 0)};

    // rectangles.push(new Rectangle({size: createVector(400, 400, 10), pos: createVector(0, 0, 0), omega: createVector(0, 0, 0)}));
    rectangles.push(new Rectangle({size: createVector(200, 200, 10), pos: createVector(0, 0, 0), omega: createVector(0, 0, 0.0)}));

    spheroids.push(new Spheroid({size: createVector(25, 25, 25), pos: createVector(0, -250, 30), vel: createVector(1, 1, 0), omega: createVector(0, 0, omegaValue), fill: "red"}));

    document.getElementById("mass").value = spheroids[0].mass;
    document.getElementById("velX").value = spheroids[0].startingVel.x;
    document.getElementById("velY").value = spheroids[0].startingVel.y;
    document.getElementById("velZ").value = spheroids[0].startingVel.z;
}

function draw() 
{
    // angleMode(DEGREES); 
    // frameRate(5)
    mousePosition = createVector(mouseX, mouseY);
    previousMousePosition = createVector(pmouseX, pmouseY);
    background(175);
    frameRate(60);

    displayCheckBoxes();

    // line(30, 20, 85, 75) 

    //calibrateCamera();
    orbitControl();

    rectangles.forEach(rectangle => {
        // rectangle.move()
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

    // push()
    //     fill("red")
    //     rect(100,100,100,100)
    // pop()


    document.getElementById("cent").innerHTML = "<" + spheroids[0].centForce.x.toFixed(3) + ", " + spheroids[0].centForce.y.toFixed(3) + ", " + spheroids[0].centForce.z.toFixed(3) + ">";
    document.getElementById("cor").innerHTML =  "<" + spheroids[0].corForce.x.toFixed(3) + ", " + spheroids[0].corForce.y.toFixed(3) + ", " + spheroids[0].corForce.z.toFixed(3) + ">";
}

function calibrateCamera() 
{
    // myCamera.vel.add(myCamera.acc);
    // myCamera.pos.add(myCamera.vel);
    // myCamera.angle.add(myCamera.omega);
    // myCamera.up.add(myCamera.omega);
    // myCamera.omega.add(myCamera.angularAcceleration);

    // myCamera.up.rotate(myCamera.angle);

    // console.log(myCamera.up);


    camera(myCamera.pos.x, 
        myCamera.pos.y, 
        myCamera.pos.z, 
        myCamera.center.x, 
        myCamera.center.y, 
        myCamera.center.z, 
        myCamera.up.x, 
        myCamera.up.y, 
        myCamera.up.z)
}

class Arrow
{
    constructor(props)
    {
        this.arrow = props.arrow;
        this.mag = this.arrow.mag()
        this.color = props.color || "red";
        this.text = props.text;
    }

    display()
    {
        push()
        translate(createVector(0,mag,0))
        fill(this.color)
        cone(20, 30)
        pop()


        push()
        fill(this.color)
        // translate(this.endPos)

        // translate(createVector(0, - this.startPos.y / 2, 0))
        cylinder(5, this.mag, 4, 1)

        pop()
    }
}

class Rectangle
{
    constructor(props)
    {
        this.size = props.size || createVector(0, 0, 0);
        this.pos = props.pos || createVector(0, 0, 0); 
        this.vel = props.vel || createVector(0, 0, 0); 
        this.acc = props.acc || createVector(0, 0, 0); 
        this.angle = props.angle || createVector(0, 0, 0)
        this.omega = props.omega || createVector(0, 0, 0); 
        this.angularAcceleration = props.angularAcceleration || createVector(0, 0, 0);

        this.stroke = props.stroke || "black";
        this.fill = props.fill || "white";
    }

    move()
    {
        this.omega.add(this.angularAcceleration);
        this.angle.add(this.omega);

        this.vel.add(this.acc);
        this.pos.add(this.vel);
    }

    display()
    {
        push()

        rotateX(this.angle.x);
        rotateY(this.angle.y);
        rotateZ(this.angle.z);

        translate(this.pos);

        fill(this.fill);
        stroke(this.stroke)
        
        box(this.size.x, this.size.y, this.size.z);

        pop()
    }
}

class Spheroid
{
    constructor(props)
    {
        this.size = props.size || createVector(0, 0, 0);
        this.mass = props.mass || 1;

        this.startingPos = props.pos || createVector(0, 0, 0); 
        this.startingVel = props.vel || createVector(0, 0, 0); 
        this.startingAcc = props.acc || createVector(0, 0, 0); 

        this.reset();
        this.angle = props.angle || createVector(0, 0, 0)
        this.omega = props.omega || createVector(0, 0, 0); 
        this.angularAcceleration = props.angularAcceleration || createVector(0, 0, 0);

        this.corForce = props.corForce || createVector(0, 0, 0);
        this.centForce = props.centForce || createVector(0, 0, 0);

        // this.arrow = new Arrow({startPos: this.pos, endPos: this.corAcc, color: "blue"});
        // this.arrow = new Arrow({startPos: this.pos, endPos: this.centAcc, color: "green"});

        this.previousPositions = [props.pos]

        this.stroke = props.stroke || "black";
        this.fill = props.fill || "white";
    }

    move()
    {
        // this.omega.add(this.angularAcceleration);
        // this.angle.add(this.omega);
        

        // a_cor = 2v x omega
        // a_cent = (omega)^2 rho rho_hat
        this.corForce = p5.Vector.mult(p5.Vector.cross(this.omega, this.vel), (2 * this.mass));

        this.centForce = p5.Vector.mult(p5.Vector.cross(this.omega, this.pos), this.mass).cross(this.omega)

        // this.acc.add(p5.Vector.div(this.corAcc, 10000));
        // this.acc.add(p5.Vector.div(this.centAcc, 10000));

        this.acc = p5.Vector.add(this.corForce, this.centForce).div(this.mass);
        // this.acc.div(1)

        this.vel.add(this.acc);
        this.pos.add(this.vel);

        // this.arrow.display()

        if (frameCount % 15 == 0) 
        {
            let newPosition = createVector(this.pos.x, this.pos.y, this.pos.z)
            this.previousPositions.push(newPosition)
        }

        // console.log(frameCount);
        // console.log([this.acc.x, this.acc.y, this.acc.z]);
        // console.table(this);
        
    }

    display()
    {
        push()

        rotateX(this.angle.x);
        rotateY(this.angle.y);
        rotateZ(this.angle.z);

        translate(this.pos);

        fill(this.fill);
        stroke(this.stroke);

        ellipsoid(this.size.x, this.size.y, this.size.z);

        new Arrow({arrow: p5.Vector.mult(this.corForce, 10000), color: "blue"}).display();
        new Arrow({arrow: p5.Vector.mult(this.centForce, 10000), color: "green"}).display();

        rotateX(this.omega.x);
        rotateY(this.omega.y);
        rotateZ(this.omega.z);

        pop()

        push()
        stroke(0)

        this.previousPositions.forEach( position => {
            // let thisPoint = this.previousPositions[i].copy().add(createVector(10, 0, 10));
            // let nextPoint = this.previousPositions[i + 1].copy().add(createVector(10, 0, 10));
            // drawLine(thisPoint.x, thisPoint.y, thisPoint.z, nextPoint.x, nextPoint.y, nextPoint.z)

            push()
                translate(position);

                fill(this.fill);
                stroke(this.stroke);
        
                let size = this.size.x / 10; 
                ellipsoid(size, size, size);

                // console.log(position);
            pop()
        })
        // for (let i = 0; i < this.previousPositions.length - 1; i++) 
        // {
            
        // }
        // this.previousPositions.forEach((position, i) => {
            
        //     if


        // })

        // new Arrow({startPos: this.pos, endPos: this.acc}).display()

        pop()
    }

    reset()
    {
        this.pos = this.startingPos.copy(); 
        this.vel = this.startingVel.copy(); 
        this.pos = this.startingPos.copy(); 

        this.omega = createVector(0, 0, omegaValue)

        this.previousPositions = [this.pos]
    }
}

function drawLine(x1, y1, z1, x2,y2, z2)
{
    beginShape();
    vertex(x1,y1,z1);
    vertex(x2,y2,z2);  
    endShape();
}

function menuInput()
{
    spheroids[0].mass = parseInt(document.getElementById("mass").value);
    spheroids[0].startingVel.x = parseInt(document.getElementById("velX").value);
    spheroids[0].startingVel.y = parseInt(document.getElementById("velY").value);
    spheroids[0].startingVel.z = parseInt(document.getElementById("velZ").value);

    omegaValue = parseFloat(document.getElementById("omega").value);
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