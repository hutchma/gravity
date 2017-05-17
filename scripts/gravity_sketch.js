// Configuration
const CONFIG = {
  num_p: 5,     // Number of planets
  num_s: 1,     // Number of stars
  grav: 1,      // Gravitational constant
  rmin: 5,      // Minimum distance to constrain gravitational force to
  rmax: 25,     // Maximum distance to constrain gravitational force to
  pmin: 0.1,    // Minimum planet mass
  pmax: 2,      // Maximum planet mass
  smin: 20,     // Minimum star mass
  smax: 80      // Maximum star mass
};

const INPUTS = {};
var movers;


function createMovers() {
  movers = [];
  
  for (var i = 0; i < CONFIG.num_p; i++) {
    let mass = random(CONFIG.pmin, CONFIG.pmax);
    let p = new Planet(random(width), random(height), mass);
    movers.push(p);
  }
  
  for (var i = 0; i < CONFIG.num_s; i++) {
    let mass = random(CONFIG.smin, CONFIG.smax);
    let s = new Star(random(width), random(height), mass);
    movers.push(s);
  }
}

function createInputs() {
  // Number of planets and stars
  INPUTS.num_p = createInput(CONFIG.num_p, 'number');
  INPUTS.num_s = createInput(CONFIG.num_s, 'number');
  INPUTS.num_p.position(10, 10);
  INPUTS.num_s.position(10, 35);
  INPUTS.num_p.style('width', '40px');
  INPUTS.num_s.style('width', '40px');
  createP('Planets').position(60, 10);
  createP('Stars').position(60, 35);
  
  // Gravitational constant
  INPUTS.grav = createInput(CONFIG.grav, 'number');
  INPUTS.grav.position(width - 135, 10);
  INPUTS.grav.style('width', '40px');
  createP('Grav const').position(width - 80, 10);
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  
  createInputs();
  createMovers();
}

function draw() {
  background(255);
  
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

// Spacebar resets the simulation
function keyPressed() {
  // Spacebar pressed
  if (keyCode === 32) {
    Object.keys(INPUTS).map(function(key, i) {
      CONFIG[key] = INPUTS[key].value();
    });
    createMovers();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  createInputs();
}