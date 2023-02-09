class CannonBall
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

        this.cannonPos = this.startingPos.copy()

        this.reset();

        this.previousPositions = []

        this.stroke = props.stroke || "black";
        this.fill = props.fill || "white";

        this.frameVel = props.frameVel || this.canvas.createVector(0, 0); 
    }

    move()
    {
        this.acc = this.canvas.createVector(0, gravity)

        // this will add points to the trail of the red ball
        if (this.canvas.frameCount % 15 == 0) 
        {
            let newPosition = this.pos.copy()
            this.previousPositions.push(newPosition.copy())
        }

        // eulers method with vectors
        if (playForward)
        {
            this.vel.add(this.acc);
            this.pos.add(this.vel).sub(this.frameVel);

            this.cannonPos.sub(this.frameVel)
        }
        else
        {
            this.vel.sub(this.acc);
            this.pos.sub(this.vel);
        }
    }

    display()
    {
        this.canvas.push()
        let scale = leftCanvas.width / 3572
        // console.log(scale);
        this.displayEnviroment(0.5)
        this.canvas.fill(this.fill);
        this.canvas.stroke(this.stroke);

        // this.canvas.ellipse(this.pos.x, this.pos.y, spheroidSize * this.mass, spheroidSize * this.mass);
        this.canvas.ellipse(this.pos.x, this.pos.y, spheroidSize * this.mass, spheroidSize * this.mass);
        // this.displayForceVectors()

        this.displayTrails()

        this.displayCannon(p5.Vector.sub(this.cannonPos.copy(), this.canvas.createVector(140, -40)), this.canvas.radians(-30), 0.125)
        

        this.canvas.pop()
    }

    reset()
    {
        this.pos = this.startingPos.copy(); 
        this.vel = this.startingVel.copy(); 
        this.previousPositions = [this.pos]
    }

    displayTrails()
    {
        this.previousPositions.forEach(position => {
            this.canvas.push()
                
                // this.canvas.rotate(rectangles[0].angle)
                this.canvas.translate(position.x, position.y)
                this.canvas.fill(this.fill);
                this.canvas.stroke(this.stroke);
        
                let size = spheroidSize / 10; 
                this.canvas.ellipse(0, 0, size, size);

            this.canvas.pop()
        })
    }

    displayCannon(pos, angle, scale)
    {
        this.canvas.image(cannonImg3, pos.x, pos.y + (60 * scale), 787 * scale, 643 * scale) 
        this.canvas.push()
        this.canvas.translate(pos.x , pos.y)
        this.canvas.rotate(angle)
        this.canvas.image(cannonImg1, -(320 * scale), -(80 * scale), 1568 * scale, 620 * scale) 
        this.canvas.pop()
        this.canvas.image(cannonImg2, pos.x - (290 * scale), pos.y + (60 * scale), 786 * scale, 643 * scale) 
    }

    displayEnviroment(scale)
    {
        this.canvas.push()
        this.canvas.image(enviroment, -this.cannonPos.copy().x, -(560) * scale, 7144 * scale, 4782 * scale) 
        this.canvas.pop()
    }
}