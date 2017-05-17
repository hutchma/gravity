class Mover {
  constructor(x, y, mass) {
    this.position = new p5.Vector(x, y);
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
    this.mass = mass;
    this.color = {
      r: random(256),
      g: random(256),
      b: random(256)
    };
    this.diameter = 0;
  }
  
  // Displays mover on the screen
  display() {
    fill(this.color.r, this.color.g, this.color.b);
    ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
  }
  
  // Behavior for contact with edge of screen
  // Override
  checkEdges() {
    ;
  }
  
  // Behavior each tick
  // TODO: Velocity Verlet integration
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  
  // Return a new mover that is a combination of this and another mover
  // TODO
  absorb() {
    ;
  }
  
  // Newton's 2nd Law (F = ma)
  applyForce(f) {
    var a = p5.Vector.div(f, this.mass);
    this.acceleration.add(a);
  }
  
  // Returns gravitational force on other mover
  // F = (G * m1 * m2) / r^2
  attract(m) {
    // Direction of the force
    var f = p5.Vector.sub(this.position, m.position);
    var r = f.mag();
    f.normalize();
    r = constrain(r, CONFIG.rmin, CONFIG.rmax);
    
    var magnitude = (CONFIG.grav * this.mass * m.mass) / (r * r);
    f.mult(magnitude);
    
    return f;
  }
  
  // Checks if a mover is inside this mover
  // TODO
  contains(m) {
    ;
  }
}