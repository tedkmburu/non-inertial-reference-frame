class Spheroid
{
    constructor(props)
    {
        this.canvas = props.canvas;
        this.mass = props.mass || 1;

        this.startingPos = props.pos || this.canvas.createVector(0, 0); 
        this.startingVel = props.vel || this.canvas.createVector(0, 0); 
        this.pos = props.pos || this.canvas.createVector(0, 0); 
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
        
        let netAcc = this.canvas.createVector(0,0)

        // calculate the Coriolis and centrifugal forces for a particle
        this.corForce = p5.Vector.mult(p5.Vector.cross(this.vel, this.omega), (-2 * this.mass));
        let rho = p5.Vector.sub(this.pos, rectangles[0].pos);
        this.centForce = p5.Vector.mult(rho, p5.Vector.dot(this.omega, this.omega) * this.mass);

        // combine the Coriolis and centrifugal forces and divide by mass to get net force
        this.acc = p5.Vector.add(this.corForce, this.centForce).div(this.mass);

        netAcc.add(this.acc)

        // this will add points to the trail of the red ball
        if (this.canvas.frameCount % 15 == 0) 
        {
            let newPosition = this.pos.copy()
            this.previousPositions.push(newPosition)
            let rectPosition = newPosition.copy().sub(rectangles[0].pos).rotate(-0.06 * (this.previousPositions.length))
            rectangles[0].previousPositions.push(rectPosition)
        }

        // eulers method with vectors
        this.vel.add(netAcc.div(100));
        this.pos.add(this.vel);
    }

    display()
    {
        this.canvas.push()

        this.canvas.fill(this.fill);
        this.canvas.stroke(this.stroke);

        // this.canvas.ellipse(this.pos.x, this.pos.y, spheroidSize * this.mass, spheroidSize * this.mass);
        this.canvas.ellipse(this.pos.x, this.pos.y, spheroidSize * this.mass, spheroidSize * this.mass);
        this.displayForceVectors()

        this.previousPositions.forEach( position => {
            this.canvas.push()
                
                // this.canvas.rotate(rectangles[0].angle)
                this.canvas.translate(position.x, position.y)
                this.canvas.fill(this.fill);
                this.canvas.stroke(this.stroke);
        
                let size = spheroidSize / 10; 
                this.canvas.ellipse(0, 0, size, size);

            this.canvas.pop()
        })

        this.canvas.pop()
    }

    reset()
    {
        // roomAngle = 0;
        this.pos = this.startingPos.copy(); 
        this.vel = this.startingVel.copy(); 

        this.omega = this.canvas.createVector(0, 0, omegaValue)

        this.previousPositions = [this.pos]
    }

    displayForceVectors()
    {
        let fCorFinalPosition = p5.Vector.add(this.pos, p5.Vector.mult(this.corForce, 5000));
        let fCentFinalPosition = p5.Vector.add(this.pos, p5.Vector.mult(this.centForce, 5000));
        let velFinalPosition = p5.Vector.add(this.pos, p5.Vector.mult(this.vel, 50));
        
        createArrow(this.pos, fCorFinalPosition, this.corForce.heading(), "blue", 1, this.canvas);
        createArrow(this.pos, fCentFinalPosition, this.centForce.heading(), "green", 1, this.canvas);
        createArrow(this.pos, velFinalPosition, this.vel.heading(), "red", 1, this.canvas);

        let scaleCor = 30;
        let scaleCf = 30;
        let scaleV = 1.5;

        // if (this.corForce.mag() > 0) this.canvas.image(fCorImg,fCorFinalPosition.x, fCorFinalPosition.y, 2000/scaleCor, 1320/scaleCor)
        // if (this.centForce.mag() > 0) this.canvas.image(fCfImg,fCentFinalPosition.x, fCentFinalPosition.y, 1656/scaleCf, 1464/scaleCf)
        // if (this.vel.mag() > 0) this.canvas.image(vImg,velFinalPosition.x, velFinalPosition.y, 46/scaleV, 61/scaleV)
    }
}