const leftCanvasObject = canvas => {
    canvas.preload = function() { leftGrid = canvas.loadImage('images/grid2.png'); }
    canvas.setup = function()  // This function only runs once when the page first loads. 
    {
        let cnv = canvas.createCanvas(innerWidth / 2, innerHeight);
        cnv.addClass('left');
        leftCanvas = canvas;

        canvas.angleMode(canvas.RADIANS);
        canvas.rectMode(canvas.CENTER);
        canvas.ellipseMode(canvas.CENTER);

        rectangles[0] = new Rectangle({
            size: canvas.createVector(tableSize, tableSize), 
            pos: canvas.createVector((innerWidth) / 4, innerHeight / 2), 
            frame: "room",
            omega: omegaValue,
            canvas: leftCanvas
        });

        spheroids[0] = new Spheroid({
            pos: canvas.createVector((innerWidth) / 4, (innerHeight / 4) - 50), 
            vel: canvas.createVector(theInitVelx, theInitVely),  
            fill: "red",
            frame: "room",
            canvas: leftCanvas});
    }
  
    canvas.draw = function() // this function runs every frame. Everything on the left canvas starts here.
    {  
        canvas.background(100); // sets the background color to grey
        canvas.frameRate(theFrameRate);  // the simulation will try limit itself to 60 frames per second. If a device can't maintain 60 fps, it will run at whatever it can
        canvas.push();
            let smallerSide = (innerHeight > innerWidth) ?  innerWidth: innerHeight;
            canvas.translate(smallerSide / 4, smallerSide / 2)
            canvas.image(leftGrid,-smallerSide, -smallerSide, smallerSide * 2, smallerSide * 2)
        canvas.pop();

        canvas.fill(0);
        canvas.rect(canvas.width - 5, canvas.height / 2, 10, canvas.height)

        if (playState) 
        { 
            spheroids[0].move(); 
            rectangles[0].move();
        }
        rectangles[0].display();
        spheroids[0].display();

        canvas.textSize(36)
        canvas.noStroke()
        canvas.textAlign(canvas.CENTER)
        canvas.fill(0)
        canvas.text("Room Frame", canvas.width / 2, innerHeight - 30)

        if(!playState)
        {
            let mousePosition = canvas.createVector(canvas.mouseX, canvas.mouseY)
            let angle = p5.Vector.sub(mousePosition, spheroids[1].pos).heading()
            createArrow(spheroids[1].pos, mousePosition, angle, "red", 1, canvas)
        }
    }
  
    canvas.windowResized = function() // inbuilt p5 function. runs everytime the window is resized
    {
        canvas.resizeCanvas(innerWidth / 2, innerHeight); // resizes the canvas to fit the new window size
        canvas.setup()
    }

    canvas.mouseClicked = function() {
        if (!playState)
        {
            let mousePosition = canvas.createVector(canvas.mouseX, canvas.mouseY)
            let direction = p5.Vector.sub(mousePosition, spheroids[1].pos)

            theInitVelx = direction.x / 50;
            theInitVely = direction.y / 50;

            spheroids.forEach(spheroid => {
                spheroid.reset()
            })
        
            rectangles.forEach(rectangle => {
                rectangle.reset()
            })

            
            if (mousePosition.x < (innerWidth / 2) - 50)
            {
                playState = true;
            }
            
        }
    }

    // canvas.mouseDragged = function() { mouseDraggedLeft(canvas); }
}