const leftCanvasObject = canvas => {
    canvas.preload = function() { leftGrid = canvas.loadImage('images/grid2.png'); }
    canvas.setup = function()  // This function only runs once when the page first loads. 
    {
        canvas.createCanvas(innerWidth / 2, innerHeight); // creates the <canvas> that everything runs on.
        let cnv = canvas.createCanvas(innerWidth / 2, innerHeight);
        cnv.addClass('left');
        leftCanvas = canvas;
        canvas.angleMode(canvas.RADIANS);
    
        canvas.rectMode(canvas.CENTER);
        canvas.ellipseMode(canvas.CENTER);
        rectangles[0] = new Rectangle({
            size: canvas.createVector(tableSize, tableSize), 
            pos: canvas.createVector((innerWidth) / 4, innerHeight / 2), 
            omega: -omegaValue,
            frame: "room",
            canvas: leftCanvas});

        spheroids[0] = new Spheroid({
            pos: canvas.createVector((innerWidth) / 4, (innerHeight / 4) - 50), 
            vel: canvas.createVector(theInitVelx, theInitVely), 
            omega: canvas.createVector(0, 0, omegaValue), 
            fill: "red",
            frame: "room",
            canvas: leftCanvas});

            document.getElementById("mass").value = spheroids[0].mass;
            document.getElementById("velX").value = spheroids[0].vel.x;
            document.getElementById("velY").value = spheroids[0].vel.y;

            spheroids[0].reset()
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

        if (play) { rectangles[0].move(); }
        rectangles[0].display();

        if (play) { spheroids[0].move(); }
        spheroids[0].display();

        canvas.fill(0);
        canvas.rect(canvas.width - 5, canvas.height / 2, 10, canvas.height)

        canvas.textSize(36)
        canvas.noStroke()
        canvas.textAlign(canvas.CENTER)
        canvas.text("Room Frame", canvas.width / 2, innerHeight - 30)

        let forceScale = 100;
        let centForceText = "<" + spheroids[0].centForce.copy().mult(forceScale).x.toFixed(2) + ", " + spheroids[0].centForce.copy().mult(forceScale).y.toFixed(2) + ">";
        let corForceText = "<" + spheroids[0].corForce.copy().mult(forceScale).x.toFixed(2) + ", " + spheroids[0].corForce.copy().mult(forceScale).y.toFixed(2) + ">";
        document.getElementById("cent").innerHTML = centForceText;
        document.getElementById("cor").innerHTML =  corForceText;
    }
  
    canvas.windowResized = function() // inbuilt p5 function. runs everytime the window is resized
    {
        canvas.resizeCanvas(innerWidth / 2, innerHeight); // resizes the canvas to fit the new window size
        canvas.setup()
    }

    canvas.mouseDragged = function() { mouseDraggedLeft(canvas); }
}