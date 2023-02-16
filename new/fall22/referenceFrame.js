// class ReferenceFrame
// {
//     constructor(props)
//     {
//         this.pos = props.pos || new p5.Vector(0, 0);
//         this.vel = props.vel || new p5.Vector(0, 0);
//         this.acc = props.acc || new p5.Vector(0, 0);

//         this.angle = props.angle || 0;
//         this.omega = props.omega || 0;
//         this.alpha = props.alpha || 0;

//         this.startingPos = props.startingPos || new p5.Vector(0, 0);
//         this.startingVel = props.startingVel || new p5.Vector(0, 0);

//         let screenPos = props.screenPos || new p5.Vector(0, 0);
//         let screenSize = props.screenSize || new p5.Vector(innerWidth, innerHeight);
//         let canvasShapes = []

//         const canvasObject = (canvas) => {
//             canvas.preload = function() 
//             {
//                 // console.log("pre load");
//             }

//             canvas.setup = function() 
//             {
//                 // this.setup()
//                 console.log(screenPos);
//                 let frameCanvas = canvas.createCanvas(screenSize.x, screenSize.y);
//                 let className = "canvas" + referenceFrames.length
//                 frameCanvas.addClass(className)

//             }

//             canvas.draw = function() 
//             {
//                 // console.log("draw");
//                 canvas.background(120)
//                 // this.draw()
//             }

//         }

//         // this.canvas = props.canvas;
//         new p5(canvasObject);
//     }

//     preload()
//     {
//         console.log("preload");
//     }

//     setup()
//     {
//         console.log("setup");
//     }

//     move()
//     {

//     }

//     draw()
//     {

//     }
// }