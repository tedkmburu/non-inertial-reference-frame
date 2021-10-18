let previousMousePosition;

let boxes = [];

let rectangles = [];
let spheroids = [];
let arrows = [];
let myCamera;


function setup()
{
    createCanvas(innerWidth, innerHeight, WEBGL);

    rectMode(CENTER)
    myCamera = {
        pos: createVector(0, 0, (innerHeight/2) / tan(Math.PI/6)),
        vel: createVector(0, 0, 0), 
        acc: createVector(0, 0, 0), 
        center: createVector(0, 0, 0), 
        up: createVector(0, 1, 0),
        angle: createVector(0, 0, 0),
        omega: createVector(0, 0, 0),
        angle: 0.01,
        angularAcceleration: createVector(0, 0, 0)};

    // rectangles.push(new Rectangle({size: createVector(400, 400, 10), pos: createVector(0, 0, 0), omega: createVector(0, 0, 0)}));
    rectangles.push(new Rectangle({size: createVector(200, 200, 10), pos: createVector(0, 0, 0), omega: createVector(0, 0, 0.01)}));

    spheroids.push(new Spheroid({size: createVector(25, 25, 25), pos: createVector(0, -250, 100), vel: createVector(0, 0, 0), omega: createVector(0, 0, 0.01), fill: "red"}));

    // arrows.push(new Arrow({startPos: createVector(0, 0, 0), endPos: createVector(100,100,100) }));

    // spheroids.push(new Spheroid({size: createVector(50, 50, 50), pos: createVector(-200, 0, 200), omega: createVector(0, 0.05, 0), fill: "red"}));
    // spheroids.push(new Spheroid({size: createVector(50, 50, 50), pos: createVector(200, 0, 200), omega: createVector(0, 0, 0.05), fill: "green"}));
    // spheroids.push(new Spheroid({size: createVector(50, 50, 50), pos: createVector(200, 0, -200), omega: createVector(0.05, 0), fill: "blue"}));
}

function draw() 
{
    // angleMode(DEGREES); 
    // frameRate(5)
    mousePosition = createVector(mouseX, mouseY);
    previousMousePosition = createVector(pmouseX, pmouseY);
    background(175);
    frameRate(60);

    // line(30, 20, 85, 75) 

    calibrateCamera();
    // orbitControl();

    rectangles.forEach(rectangle => {
        rectangle.move()
        rectangle.display()
    });

    spheroids.forEach(spheroid => {
        spheroid.move()
        spheroid.display()
    });

    arrows.forEach(arrow => {
        arrow.display()
    });
}

function calibrateCamera() 
{
    // myCamera.vel.add(myCamera.acc);
    // myCamera.pos.add(myCamera.vel);
    // myCamera.angle.add(myCamera.omega);
    // myCamera.up.add(myCamera.omega);
    // myCamera.omega.add(myCamera.angularAcceleration);

    myCamera.up.rotate(myCamera.angle);

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
        this.startPos = props.startPos;
        this.endPos = props.endPos;
        this.color = props.color || "red";
        this.text = props.text;
    }

    display()
    {
        push()
        translate(this.endPos)
        fill(this.color)
        cone(20, 30)
        

        // translate(p5.Vector.div(this.startPos, 2))
        cylinder(10, p5.Vector.sub(this.endPos, this.startPos).mag())

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
        this.pos = props.pos || createVector(0, 0, 0); 
        this.vel = props.vel || createVector(0, 0, 0); 
        this.acc = props.acc || createVector(0, 0, 0); 
        this.angle = props.angle || createVector(0, 0, 0)
        this.omega = props.omega || createVector(0, 0, 0); 
        this.angularAcceleration = props.angularAcceleration || createVector(0, 0, 0);

        this.corAcc = props.corAcc || createVector(0, 0, 0);
        this.centAcc = props.centAcc || createVector(0, 0, 0);

        this.arrow = new Arrow({startPos: this.pos, endPos: this.acc});

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
        this.corAcc = p5.Vector.mult(this.vel, -2).cross(this.omega)

        this.centAcc = p5.Vector.mult(createVector(this.pos.x, this.pos.y, 0) , p5.Vector.dot(this.omega, this.omega))

        this.acc.add(p5.Vector.div(this.corAcc, 1));
        this.acc.add(p5.Vector.div(this.centAcc, 1));

        this.vel.add(this.acc);
        this.pos.add(this.vel);

        console.log(frameCount);
        console.table(this);

        // this.arrow.display()

        // if (frameCount % 30 == 0) 
        // {
        //     let newPosition = createVector(this.pos.z, this.pos.y, this.pos.x)
        //     this.previousPositions.push(newPosition)
        // }
        
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

        ellipsoid(this.size.x, this.size.y, this.size.z);

        rotateX(this.omega.x);
        rotateY(this.omega.y);
        rotateZ(this.omega.z);

        pop()

        push()
        stroke(0)

        // for (let i = 0; i < this.previousPositions.length - 1; i++) 
        // {
        //     let thisPoint = this.previousPositions[i].copy().add(createVector(10, 0, 10));
        //     let nextPoint = this.previousPositions[i + 1].copy().add(createVector(10, 0, 10));
        //     drawLine(thisPoint.x, thisPoint.y, thisPoint.z, nextPoint.x, nextPoint.y, nextPoint.z)
            
        // }
        // this.previousPositions.forEach((position, i) => {
            
        //     if


        // })
        pop()
    }
}

function drawLine(x1, y1, z1, x2,y2, z2)
{
    beginShape();
    vertex(x1,y1,z1);
    vertex(x2,y2,z2);  
    endShape();
  }