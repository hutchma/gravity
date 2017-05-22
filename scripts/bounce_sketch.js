const CONFIG = {
  gravAcc: 0.3,       // Gravitational acceleration
  maxMass: 3,         // Max bouncy ball mass
  minMass: 1,         // Min bouncy ball mass
  numBouncyBalls: 5,  // Number of bouncy balls to generate
  windX: 0.2,         // Force of wind in the y-direction
  windY: 0            // Force of wind in the x-direction
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
    let b = new BouncyBall(random(width), random(height), mass);
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
    if (mouseIsPressed) {
      let w = new p5.Vector(CONFIG.windX, CONFIG.windY);
      movers[i].applyForce(w);
    }
    
    movers[i].update();
    movers[i].checkEdges();
    movers[i].display();
  }
  
  // Draw text
  fill(0);
  textSize(20);
  text('Press the mouse to make the wind blow', 10, 25);
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