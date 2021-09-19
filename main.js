let previousMousePosition;

let boxes = [];

let rectangles = [];
let spheroids = [];
let myCamera;


function setup()
{
    createCanvas(innerWidth, innerHeight, WEBGL);

    myCamera = {
        pos: createVector(0, 0, (innerHeight/2) / tan(Math.PI/6)),
        vel: createVector(0, 0, 0), 
        acc: createVector(0, 0, 0), 
        center: createVector(0, 0, 0), 
        up: createVector(0, 1, 0),
        angle: createVector(0, 0, 0),
        omega: createVector(0, 0, 0),
        angularAcceleration: createVector(0, 0, 0)};

    // rectangles.push(new Rectangle({size: createVector(400, 400, 10), pos: createVector(0, 0, 0), omega: createVector(0, 0, 0.00)}));
    rectangles.push(new Rectangle({size: createVector(200, 200, 10), pos: createVector(0, 0, 0), omega: createVector(0, 0, 0.01)}));

    spheroids.push(new Spheroid({size: createVector(25, 25, 25), pos: createVector(00, -250, 100), vel: createVector(0, 0.5, 0), fill: "green"}));

    // spheroids.push(new Spheroid({size: createVector(50, 50, 50), pos: createVector(-200, 0, 200), omega: createVector(0, 0.05, 0), fill: "red"}));
    // spheroids.push(new Spheroid({size: createVector(50, 50, 50), pos: createVector(200, 0, 200), omega: createVector(0, 0, 0.05), fill: "green"}));
    // spheroids.push(new Spheroid({size: createVector(50, 50, 50), pos: createVector(200, 0, -200), omega: createVector(0.05, 0), fill: "blue"}));
}

function draw() 
{
    mousePosition = createVector(mouseX, mouseY);
    previousMousePosition = createVector(pmouseX, pmouseY);
    background(175);

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
}

function calibrateCamera() 
{
    myCamera.vel.add(myCamera.acc);
    myCamera.pos.add(myCamera.vel);
    myCamera.angle.add(myCamera.omega);
    myCamera.up.add(myCamera.omega);
    myCamera.omega.add(myCamera.angularAcceleration);

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

        ellipsoid(this.size.x, this.size.y, this.size.z);

        rotateX(this.omega.x);
        rotateY(this.omega.y);
        rotateZ(this.omega.z);

        pop()
    }
}