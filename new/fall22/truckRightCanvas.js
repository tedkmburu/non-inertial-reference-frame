const rightCanvasObject = canvas => {
    canvas.preload = function() 
    { 
        
        // fCorImg = canvas.loadImage('images/ref (1).png'); 
        // fCfImg = canvas.loadImage('images/ref (2).png'); 
        // vImg = canvas.loadImage('images/v.png'); 
        // equation = canvas.loadImage('images/equation.png'); 
    }

    canvas.setup = function()  // This function only runs once when the page first loads. 
    {
        tableCnv = canvas.createCanvas(canvasWidth, canvasHeight); // creates the <canvas> that everything runs on.
        if (landscape) 
        {
            tableCnv.addClass('right');
        }
        else
        {
            tableCnv.addClass('bottom');
        }
        rightCanvas = canvas;

        canvas.angleMode(canvas.RADIANS);
        canvas.rectMode(canvas.CENTER);
        canvas.ellipseMode(canvas.CENTER);


        trucks[1] = new Truck({
            pos: canvas.createVector(canvas.width/2, canvas.height / 1.5),
            vel: canvas.createVector(0, 0),
            frameVel: canvas.createVector(truckVel, 0),
            canvas: rightCanvas
        })

    }
  
    canvas.draw = function() // this function runs every frame. Everything on the right canvas starts here.
    {  
        canvas.background(175); // sets the background color to grey
        canvas.frameRate(theFrameRate);  // the simulation will try limit itself to 60 frames per second. If a device can't maintain 60 fps, it will run at whatever it can


        if (playState) 
        { 
            trucks[1].move(); 
        }
        trucks[1].display();

        if (trucks[1].pos.y > canvas.height / 1.5) 
        {
            playState = false;
        }

        canvas.textSize(36)
        canvas.fill("black");
        canvas.noStroke()
        canvas.textAlign(canvas.CENTER)
        canvas.text("Moving Frame", canvasWidth / 2, canvasHeight - 30)

        

        // displayCannon(canvas, p5.Vector.sub(cannonBalls[1].startingPos.copy(), canvas.createVector(140, -40)), canvas.radians(-30), canvas.createVector(2,0), 0.125)


        // canvas.image(equation, 0, 0, 400, 80)
    }
  
    canvas.windowResized = function() // inbuilt p5 function. runs everytime the window is resized
    {
        if (landscape) 
        {
            tableCnv.removeClass('right');
            tableCnv.removeClass('bottom');
            tableCnv.addClass('right');
        }
        else
        {
            tableCnv.removeClass('right');
            tableCnv.removeClass('bottom');
            tableCnv.addClass('bottom');
        }

        canvas.resizeCanvas(canvasHeight, canvasHeight); // resizes the canvas to fit the new window size
        canvas.setup()
    }

    // canvas.mouseDragged = function() { mouseDraggedRight(canvas); }
}