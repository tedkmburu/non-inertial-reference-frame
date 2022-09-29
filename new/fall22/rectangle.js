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

        this.previousPositions = []

        this.frame = props.frame; 
    }

    move()
    {
        if(playForward)
        {
            this.omega += this.angularAcceleration;
            this.angle += this.omega;

            this.vel.add(this.acc);
            this.pos.add(this.vel);
        }
        else
        {
            this.omega -= this.angularAcceleration;
            this.angle -= this.omega;
            
            this.vel.sub(this.acc);
            this.pos.sub(this.vel);
        }
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
            this.canvas.rotate(this.angle);
            this.canvas.stroke(this.stroke);
        
            this.canvas.fill(0);
            this.previousPositions.forEach(position => {
                this.canvas.ellipse(position.x, position.y, 5, 5);
            });
        this.canvas.pop();

        this.canvas.ellipse(this.pos.x, this.pos.y, spheroidSize, spheroidSize);
    }

    reset()
    {
        this.previousPositions = [];
        this.angle = 0;
    }
}