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

        this.previousPositions = [this.pos]

        this.frame = props.frame; 
    }

    move()
    {
        this.omega += this.angularAcceleration;
        this.angle += this.omega;

        // console.log(this.angle);

        this.vel.add(this.acc);
        this.pos.add(this.vel);
    }

    display()
    {
        this.canvas.fill("white");
        this.canvas.stroke(0)

        this.canvas.push()
            this.canvas.translate(this.pos);
            this.canvas.rotate(this.angle);
            this.canvas.fill(this.fill);
            this.canvas.stroke(this.stroke)
            this.canvas.rect(0, 0, tableSize, tableSize);
        this.canvas.pop()
        
        this.canvas.ellipse(this.pos.x, this.pos.y, spheroidSize, spheroidSize);

        // if (this.frame == "room") 
        // {
        //     this.canvas.push()
        //         this.canvas.stroke(0)
        //         this.canvas.translate(this.pos)
                
        //         this.canvas.rotate(this.angle);

        //         spheroids[0].previousPositions.forEach( (position, i) => {
    
        //             this.canvas.push()
        
        //                 this.canvas.fill(i == 0 ? "red" : this.fill);
        //                 this.canvas.stroke(this.stroke);
                
        //                 let size = spheroidSize / 10; 
        //                 let thePoint = p5.Vector.sub(position, this.pos)

        //                 if (i == 0) 
        //                 {
        //                     this.canvas.ellipse(thePoint.x, thePoint.y, spheroidSize * spheroids[0].mass, spheroidSize * spheroids[0].mass);

                        
        //                     // let presetVel = this.canvas.createVector(theInitVelx, theInitVely);
        //                     // this.canvas.push()
        //                     // let velFinalPosition = p5.Vector.add(thePoint, p5.Vector.mult(presetVel, 100)).rotate(this.angle);
        //                     // createArrow(thePoint, velFinalPosition, spheroids[0].vel.heading(), "red", 1, this.canvas);
        //                     // let scaleV = 1.5;
                            
        //                     // this.canvas.image(vImg,velFinalPosition.x, velFinalPosition.y, 46/scaleV, 61/scaleV)

        //                     // this.canvas.pop()
                        
        //                 }
        //                 else
        //                 {
        //                     this.canvas.ellipse(thePoint.x,  thePoint.y, size, size); 
        //                 }

                    
        //             this.canvas.pop()
        //         })
        //     this.canvas.pop()     
        // }
    }

    reset()
    {
        this.previousPositions = [this.pos];
        this.angle = 0;
    }
}