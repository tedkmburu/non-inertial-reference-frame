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

        // this.previousPositions = [p5.Vector.sub(this.pos, this.canvas.createVector(0, 10))]
        // this.previousPositions.push(p5.Vector.sub(this.pos, this.canvas.createVector(-10, 0)))
        // this.previousPositions.push(p5.Vector.sub(this.pos, this.canvas.createVector(0, -10)))
        // this.previousPositions.push(p5.Vector.sub(this.pos, this.canvas.createVector(10, 0)))

        this.previousPositions = []
        // this.previousPositions = [this.canvas.createVector(0, 10)]
        // this.previousPositions.push(this.canvas.createVector(-10, 0))
        // this.previousPositions.push(this.canvas.createVector(0, -10))
        // this.previousPositions.push(this.canvas.createVector(10, 0))


        this.frame = props.frame; 
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
        this.canvas.fill("white");
        this.canvas.stroke(0);

        this.canvas.push();
            this.canvas.translate(this.pos);
            this.canvas.rotate(this.angle);
            this.canvas.fill(this.fill);
            this.canvas.stroke(this.stroke);
            this.canvas.rect(0, 0, tableSize, tableSize);
        this.canvas.pop();

        this.canvas.push();
            this.canvas.translate(this.pos);
            this.canvas.stroke(this.stroke);
        
            this.canvas.fill(0);
            this.previousPositions.forEach(position => {
                this.canvas.rotate(this.angle);
                this.canvas.ellipse(position.x, position.y, 10, 10);
            });
        this.canvas.pop();

        this.canvas.ellipse(this.pos.x, this.pos.y, spheroidSize, spheroidSize);
    }

    reset()
    {
        this.previousPositions = [this.pos];
        this.angle = 0;
    }
}