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
var movers,
    selectedMover = false,
    visible = false;


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
    let s = new Mover(random(width), random(height), mass, mass * 2);
    movers.push(s);
  }
  
  for (var i = 0; i < CONFIG.numPlanets; i++) {
    let mass = random(CONFIG.planetMinMass, CONFIG.planetMaxMass);
    let p = new Mover(random(width), random(height), mass, mass * 20);
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
    
    // Select a mover
    if (!selectedMover && mouseIsPressed && movers[i].selected()) {
      selectedMover = movers[i];
    } else {
      if (!selectedMover) {
        selectedMover = false;
      }
    }
    
    if (selectedMover) {
      let mousePos = new p5.Vector(mouseX, mouseY);
      let pmousePos = new p5.Vector(pmouseX, pmouseY);
      let mouseVel = p5.Vector.sub(mousePos, pmousePos);
      selectedMover.position = pmousePos;
      selectedMover.velocity = mouseVel;
    }
    
    movers[i].checkEdges();
    movers[i].display();
  }
}

// Press the spacebar to reset the simulation
// Press the 'P' key to spawn a planet at mouse
// Press the 'R' key to randomize all velocities
// Press the 'S' key to spawn a star at mouse
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
  
  // 'P' key pressed
  if (keyCode === 80) {
    let mass = random(CONFIG.planetMinMass, CONFIG.planetMaxMass);
    let p = new Mover(mouseX, mouseY, mass, mass * 20);
    movers.push(p);
  }
  
  // 'R' key pressed
  if (keyCode === 82) {
    for (var i = 0; i < movers.length; i++) {
      movers[i].velocity = new p5.Vector(random(-2, 2), random(-2, 2));
    }
  }
  
  // 'S' key pressed
  if (keyCode === 83) {
    let mass = random(CONFIG.starMinMass, CONFIG.starMaxMass);
    let s = new Mover(mouseX, mouseY, mass, mass * 2);
    movers.push(s);
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

function mouseReleased() {
  selectedMover = false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}