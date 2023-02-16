class Truck
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

        this.previousPositions = []

        this.stroke = props.stroke || "black";
        this.fill = props.fill || "white";

        this.frameVel = props.frameVel || this.canvas.createVector(0, 0); 

        this.crate = new Crate({
            canvas : this.canvas,
            pos: this.startingPos.copy().add(this.canvas.createVector(0, -150 * scale)),
            frameVel: this.frameVel.copy()
        })

        this.reset();

        
    }

    move()
    {
        this.acc = this.canvas.createVector(0, 0)

        this.vel.add(this.acc)
        this.pos.add(this.vel)
        // this.pos.add(this.frameVel)

        if(this.pos.x > this.crate.pos.x + (1200 * scale))
        {
            this.crate.acc = this.canvas.createVector(0, gravity)
        }

        this.crate.move()
    }

    display()
    {
        this.displayEnviroment()

        this.canvas.push()
        // this.canvas.fill(30)

        
        
        // this.canvas.rect(this.pos.x, this.pos.y, 100, 50)
        // this.canvas.rect(this.pos.x + 99, this.pos.y - 25, 100, 100)
        this.canvas.image(truckImg, this.pos.x - (1000 * scale), this.pos.y - (850 * scale), 7272 * scale, 1680 * scale)
        this.canvas.pop()

        this.crate.display()
    }

    reset()
    {
        this.pos = this.startingPos.copy(); 
        this.vel = this.startingVel.copy(); 
        this.previousPositions = [this.pos]

        this.crate.reset()
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

        this.crate.displayTrails()
    }

    displayEnviroment()
    {
        this.canvas.push()
        this.canvas.imageMode(this.canvas.CENTER)
        // this.canvas.fill("red")
        this.canvas.image(enviroment, this.crate.pos.x, (this.canvas.height / 2) - (1800 * scale), 7144 * scale * 4, 2391 * scale * 4)
        // this.canvas.rect(innerWidth / 2, this.pos.y + (1060 * scale), innerWidth, 5)
        this.canvas.pop()

        this.crate.display()
    }
}