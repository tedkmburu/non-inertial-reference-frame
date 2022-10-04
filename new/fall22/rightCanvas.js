const rightCanvasObject = canvas => {
    canvas.preload = function() 
    { 
        rightGrid = canvas.loadImage('images/grid2.png'); 
        fCorImg = canvas.loadImage('images/ref (1).png'); 
        fCfImg = canvas.loadImage('images/ref (2).png'); 
        vImg = canvas.loadImage('images/v.png'); 
    }
    canvas.setup = function()  // This function only runs once when the page first loads. 
    {
        let cnv = canvas.createCanvas(innerWidth / 2, innerHeight); // creates the <canvas> that everything runs on.
        cnv.addClass('right');
        rightCanvas = canvas;

        canvas.angleMode(canvas.RADIANS);
        canvas.rectMode(canvas.CENTER);
        canvas.ellipseMode(canvas.CENTER);

        rectangles[1] = new Rectangle({
            size: canvas.createVector(tableSize, tableSize), 
            pos: canvas.createVector((innerWidth) / 4, innerHeight / 2), 
            omega: 0,
            frame: "table",
            canvas: rightCanvas});

        spheroids[1] = new Spheroid({
            pos: canvas.createVector((innerWidth) / 4, (innerHeight / 4) - 50), 
            vel: canvas.createVector(theInitVelx, theInitVely), 
            // omega: canvas.createVector(0, 0, omegaValue), 
            fill: "red",
            frame: "table",
            canvas: rightCanvas});

        spheroids[1].reset()
    }
  
    canvas.draw = function() // this function runs every frame. Everything on the right canvas starts here.
    {  
        canvas.background(175); // sets the background color to grey
        canvas.frameRate(theFrameRate);  // the simulation will try limit itself to 60 frames per second. If a device can't maintain 60 fps, it will run at whatever it can
        canvas.push();
            let smallerSide = (innerHeight > innerWidth) ?  innerWidth: innerHeight;
            
            canvas.translate(smallerSide / 4, smallerSide / 2)
            canvas.rotate(-rectangles[0].angle)
            canvas.image(leftGrid,-smallerSide, -smallerSide, smallerSide * 2, smallerSide * 2)
        canvas.pop();

        // console.log(rectangles[0].angle);
        if (playState) 
        { 
            spheroids[1].move(); 
            rectangles[1].move(); 
            // roomAngle += omegaValue
        }
        rectangles[1].display();
        spheroids[1].display();

        // if (spheroids[1].pos.x < 0 || spheroids[1].pos.x > innerWidth / 2) 
        // {
        //     togglePlay(false);
        // }

        canvas.textSize(36)
        canvas.fill("black");
        canvas.noStroke()
        canvas.textAlign(canvas.CENTER)
        canvas.text("Table Frame", canvas.width / 2, innerHeight - 30)
    }
  
    canvas.windowResized = function() // inbuilt p5 function. runs everytime the window is resized
    {
        canvas.resizeCanvas(innerWidth / 2, innerHeight); // resizes the canvas to fit the new window size
        canvas.setup()
    }

    // canvas.mouseDragged = function() { mouseDraggedRight(canvas); }
}