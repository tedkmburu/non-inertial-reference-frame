class Crate
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

        this.previousPositions = []

        this.stroke = props.stroke || "black";
        this.fill = props.fill || "white";

        this.frameVel = props.frameVel || this.canvas.createVector(0, 0); 
    }

    move()
    {
        // this.acc = this.canvas.createVector(0, 0)

        this.vel.add(this.acc)
        this.pos.add(this.vel)

        this.pos.sub(this.frameVel)

        if (this.pos.y > this.startingPos.y + (690 * scale)) 
        {
            this.pos.y = this.startingPos.y + (690 * scale)
        }

        let distance = p5.Vector.dist(this.previousPositions[this.previousPositions.length - 1], this.pos) 
        if (distance > 10) 
        {
            this.previousPositions.push(this.pos.copy())
        }
        
    }

    display()
    {
        this.displayTrails()

        this.canvas.push()
        this.canvas.fill("red")
        this.canvas.ellipse(this.pos.x, this.pos.y, 50, 50)
        this.canvas.pop()
    }

    reset()
    {
        this.pos = this.startingPos.copy(); 
        this.vel = this.startingVel.copy(); 
        this.previousPositions = [this.pos.copy()]
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

    displayTruck()
    {

    }

    displayCannon()
    {
        
    }

    displayEnviroment()
    {

    }
}