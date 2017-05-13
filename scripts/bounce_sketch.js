// Configuration
var NUM_BOUNCY_BALLS = 5;
var OPACITY = 150;
var GRAV = 0.3;   // Strength of gravity
var WIND_X = 0.2; // Horizontal strength of wind
var WIND_Y = 0;   // Vertical strength of wind
var X_MULT = 1;   // Velocity multiplier when ball bounces off sides
var Y_MULT = 1;   // Velocity multiplier when ball bounces off top or bottom
var MIN = 1;      // Minimum bouncy ball mass
var MAX = 3;      // Maximum bouncy ball mass


var movers = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(242, 241, 239);
  
  for (var i = 0; i < NUM_BOUNCY_BALLS; i++) {
    var b = new BouncyBall(random(width), random(height), random(MIN, MAX));
    movers.push(b);
  }
}

function draw() {
  fill(242, 241, 239, OPACITY);
  rect(0, 0, width, height);
  
  fill(34, 49, 63);
  textSize(20);
  text('Press the mouse to make the wind blow', 30, 40);
  
  for (var i = 0; i < movers.length; i++) {
    var gravity = new p5.Vector(0, GRAV);
    gravity.mult(movers[i].mass);
    movers[i].applyForce(gravity);
    
    if (mouseIsPressed) {
      var wind = new p5.Vector(WIND_X, WIND_Y);
      movers[i].applyForce(wind);
    }
    
    movers[i].update();
    movers[i].checkEdges();
    movers[i].display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}