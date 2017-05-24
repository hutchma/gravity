const CONFIG = {
  gravAcc: 0.3,       // Gravitational acceleration
  maxMass: 3,         // Max bouncy ball mass
  minMass: 1,         // Min bouncy ball mass
  numBouncyBalls: 5,  // Number of bouncy balls to generate
  windX: 0.2,         // Force of wind in the y-direction
  windY: 0            // Force of wind in the x-direction
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
    INPUTS[key].position(10, 35 + 25*i);
  })
  
  Object.keys(TEXT).map(function(key, i) {
    TEXT[key].position(60, 35 + 25*i);
  })
}

function createMovers() {
  movers = [];
  
  for (var i = 0; i < CONFIG.numBouncyBalls; i++) {
    let mass = random(CONFIG.minMass, CONFIG.maxMass);
    let b = new BouncyBall(random(width), random(height), mass, mass * 20);
    movers.push(b);
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
    // Gravity
    let g = new p5.Vector(0, CONFIG.gravAcc);
    g.mult(movers[i].mass);
    movers[i].applyForce(g);
    
    // Wind
    // Press the 'W' key to make the wind blow
    if (keyIsDown(87)) {
      let w = new p5.Vector(CONFIG.windX, CONFIG.windY);
      movers[i].applyForce(w);
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
  
  // Draw text
  fill(0);
  textSize(20);
  text('Press W to make the wind blow', 10, 25);
}

// Press the spacebar to reset the simulation
// Press the 'B' key to spawn a bouncy ball at mouse
// Press the 'R' key to reset all velocities to 0
// Press the 'V' key to show/hide variables
// Press the 'X' key to update configuration
function keyPressed() {
  // Spacebar pressed
  if (keyCode === 32) {
    // Updates configuration
    Object.keys(INPUTS).map(function(key, i) {
      CONFIG[key] = Number(INPUTS[key].value());
    });
    
    createMovers();
  }
  
  // 'B' key pressed
  if (keyCode === 66) {
    let mass = random(CONFIG.minMass, CONFIG.maxMass);
    let b = new BouncyBall(mouseX, mouseY, mass, mass * 20);
    movers.push(b);
  }
  
  // 'R' key pressed
  if (keyCode === 82) {
    for (var i = 0; i < movers.length; i++) {
      movers[i].velocity.mult(0);
    }
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
  
  // 'X' key pressed
  if (keyCode === 88) {
    // Updates configuration
    Object.keys(INPUTS).map(function(key, i) {
      CONFIG[key] = Number(INPUTS[key].value());
    });
  }
}

function mouseReleased() {
  selectedMover = false;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}