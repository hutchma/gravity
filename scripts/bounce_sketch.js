const NUM_BOUNCY_BALLS = 5;
const OPACITY = 150;
const GRAV = 0.3;   // Strength of gravity
const WIND_X = 0.2; // Horizontal strength of wind
const WIND_Y = 0;   // Vertical strength of wind
const X_MULT = 1;   // Velocity multiplier when ball bounces off sides
const Y_MULT = 1;   // Velocity multiplier when ball bounces off top or bottom
const MIN = 1;      // Minimum bouncy ball mass
const MAX = 3;      // Maximum bouncy ball mass


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