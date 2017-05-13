// Configuration
var NUM_PLANETS = 200;
var NUM_STARS = 1;
var OPACITY = 150;
var GRAVITY_CONSTANT = 1;
var PMIN = 0.1;   // Minimum planet mass
var PMAX = 2;     // Maximum planet mass
var SMIN = 20;    // Minimum star mass
var SMAX = 80;    // Maximum star mass


var movers = [];


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(25, 29, 30);
  
  for (var i = 0; i < NUM_PLANETS; i++) {
    var p = new Planet(random(width), random(height), random(PMIN, PMAX));
    movers.push(p);
  }
  
  for (var i = 0; i < NUM_STARS; i++) {
    var s = new Star(random(width), random(height), random(SMIN, SMAX));
    movers.push(s);
  }
}

function draw() {
  fill(25, 29, 30, OPACITY);
  rect(0, 0, width, height);
  
  for (var i = 0; i < movers.length; i++) {
    for (var j = 0; j < movers.length; j++) {
      if (i != j) {
        var force = movers[j].attract(movers[i]);
        movers[i].applyForce(force);
      }
    }
    movers[i].update();
    movers[i].display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}