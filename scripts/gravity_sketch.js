const CONFIG = {
  gravConst: 1,       // Gravitational constant
  numPlanets: 200,    // Number of planets to generate
  numStars: 1,        // Number of stars to generate
  planetMaxMass: 2,   // Max planet mass
  planetMinMass: 0.5, // Min planet mass
  starMaxMass: 80,    // Max star mass
  starMinMass: 20     // Min star mass
};
const INPUTS = {}, TEXT = {};
var movers;
var visible = false;


function createInputs() {
  Object.keys(CONFIG).map(function(key, i) {
    INPUTS[key] = createInput(CONFIG[key], 'number').style('width', '40px').hide();
    TEXT[key] = createP(key).hide();
  });
  
  Object.keys(INPUTS).map(function(key, i) {
    INPUTS[key].position(10, 10 + 25*i);
  })
  
  Object.keys(TEXT).map(function(key, i) {
    TEXT[key].position(60, 10 + 25*i);
  })
}

function createMovers() {
  movers = [];
  
  for (var i = 0; i < CONFIG.numStars; i++) {
    let mass = random(CONFIG.starMinMass, CONFIG.starMaxMass);
    let s = new Star(random(width), random(height), mass);
    movers.push(s);
  }
  
  for (var i = 0; i < CONFIG.numPlanets; i++) {
    let mass = random(CONFIG.planetMinMass, CONFIG.planetMaxMass);
    let p = new Planet(random(width), random(height), mass);
    movers.push(p);
  }
}


// p5.js built-in functions

function setup() {
  createCanvas(windowWidth, windowHeight);
  createInputs();
  createMovers();
}

function draw() {
  background(255);
  
  for (var i = 0; i < movers.length; i++) {
    // Gravitational attraction
    for (var j = 0; j < movers.length; j++) {
      if (i != j) {
        var f = movers[j].attract(movers[i]);
        movers[i].applyForce(f);
      }
    }
    
    movers[i].update();
    movers[i].checkEdges();
    movers[i].display();
  }
}

// Press the spacebar to reset the simulation
// Press the 'V' key to show/hide variables
function keyPressed() {
  // Spacebar pressed
  if (keyCode === 32) {
    // Updates configuration
    Object.keys(INPUTS).map(function(key, i) {
      CONFIG[key] = Number(INPUTS[key].value());
    });
    
    createMovers();
  }
  
  // 'V' key pressed
  if (keyCode === 86) {
    visible = !visible;
    
    if (visible === true) {
      Object.keys(INPUTS).map(function(key, i) {
        INPUTS[key].show();
      })
      Object.keys(TEXT).map(function(key, i) {
        TEXT[key].show();
      })
    } else {
      Object.keys(INPUTS).map(function(key, i) {
        INPUTS[key].hide();
      })
      Object.keys(TEXT).map(function(key, i) {
        TEXT[key].hide();
      })
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}