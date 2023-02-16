const leftCanvasObject = canvas => {
    canvas.preload = function() 
    {
        enviroment = canvas.loadImage('images/enviroment.png'); 
        truckImg = canvas.loadImage('images/truck.png'); 
        if (innerWidth > innerHeight) 
        {
            landscape = true;
            canvasHeight = innerHeight;
            canvasWidth = innerWidth / 2;
            canvasPosX = innerWidth / 4
            canvasPosY = innerHeight / 2
            spheroidPosX = innerWidth / 4
            spheroidPosY = (innerHeight / 4) - 50
            tableSize = innerWidth / 3;

            // scale = (innerHeight / 5325) / 2;
        }
        else
        {
            landscape = false;
            canvasHeight = innerHeight / 2;
            canvasWidth = innerWidth;
            canvasPosX = innerWidth / 2
            canvasPosY = innerHeight / 4
            spheroidPosX = innerWidth / 2
            spheroidPosY = (innerHeight / 8) - 50
            tableSize = innerHeight / 3;

            // scale = (innerHeight / 5325) / 2;
        }
    }
    canvas.setup = function()  // This function only runs once when the page first loads. 
    {        
        roomCnv = canvas.createCanvas(canvasWidth, canvasHeight);
        leftCanvas = canvas;
        controlMenu = canvas.select('#controls')


        if (landscape) 
        {
            roomCnv.addClass('left');
        }
        else
        {
            roomCnv.addClass('top');
        }

        trucks[0] = new Truck({
            pos: canvas.createVector(canvas.width/3, canvas.height / 1.5),
            vel: canvas.createVector(truckVel, 0),
            canvas: leftCanvas
        })

        

        canvas.angleMode(canvas.RADIANS);
        canvas.rectMode(canvas.CENTER);
        canvas.ellipseMode(canvas.CENTER);

        
    }
  
    canvas.draw = function() // this function runs every frame. Everything on the left canvas starts here.
    {  
        canvas.background(100); // sets the background color to grey
        canvas.frameRate(theFrameRate);  // the simulation will try limit itself to 60 frames per second. If a device can't maintain 60 fps, it will run at whatever it can
        
        canvas.fill(0);

        if (playState) 
        { 
            trucks[0].move(); 
        }
        trucks[0].display();

        canvas.textSize(36)
        canvas.noStroke()
        canvas.textAlign(canvas.CENTER)
        canvas.fill(0)
        canvas.text("Stationary Frame", canvasWidth / 2, canvasHeight - 30)

        
        

        

    }
  
    canvas.windowResized = function() // inbuilt p5 function. runs everytime the window is resized
    {
        if (innerWidth > innerHeight) 
        {
            landscape = true;
            canvasHeight = innerHeight;
            canvasWidth = innerWidth / 2;
            canvasPosX = innerWidth / 4
            canvasPosY = innerHeight / 2
            spheroidPosX = innerWidth / 4
            spheroidPosY = (innerHeight / 4) - 50
            tableSize = innerWidth / 3;
        }
        else
        {
            landscape = false;
            canvasHeight = innerHeight / 2;
            canvasWidth = innerWidth;
            canvasPosX = innerWidth / 2
            canvasPosY = innerHeight / 4
            spheroidPosX = innerWidth / 2
            spheroidPosY = (innerHeight / 8) - 50
            tableSize = innerHeight / 3;
        }

        if (landscape) 
        {
            roomCnv.removeClass('left');
            roomCnv.removeClass('top');
            roomCnv.addClass('left');
        }
        else
        {
            roomCnv.removeClass('left');
            roomCnv.removeClass('top');
            roomCnv.addClass('top');
        }

        // console.log(canvasHeight);

        canvas.resizeCanvas(canvasHeight, canvasHeight); // resizes the canvas to fit the new window size
        canvas.setup()
    }

    canvas.mouseClicked = function() {
        if (!playState && reseting)
        {
            let mousePosition = canvas.createVector(canvas.mouseX, canvas.mouseY)
            let direction = p5.Vector.sub(mousePosition, spheroids[1].pos)

            theInitVelx = direction.x / 100;
            theInitVely = direction.y / 100;

            spheroids.forEach(spheroid => {
                spheroid.reset()
            })
        
            rectangles.forEach(rectangle => {
                rectangle.reset()
            })

            if (mousePosition.x < (innerWidth / 2) - 50 && landscape)
            {
                playState = true;
                reseting = false;
            }

            if (mousePosition.y < (innerHeight / 2) - 50 && !landscape)
            {
                playState = true;
                reseting = false;
            }
            
        }
    }

    // canvas.mouseDragged = function() { mouseDraggedLeft(canvas); }
}