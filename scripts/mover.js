class Mover {
  constructor(x, y, mass, diameter) {
    this.position = new p5.Vector(x, y);
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
    this.mass = mass;
    this.diameter = diameter;
    this.color = {
      r: random(256),
      g: random(256),
      b: random(256)
    };
  }
  
  // Display mover on the screen
  display() {
    fill(this.color.r, this.color.g, this.color.b);
    ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
  }
  
  // Behavior for contact with edges of the screen
  // Override
  checkEdges() {}
  
  // Update position and velocity of mover
  // TODO: replace with Velocity Verlet integration
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  
  // Newton's 2nd Law
  // F = ma
  applyForce(f) {
    var a = p5.Vector.div(f, this.mass);
    this.acceleration.add(a);
  }
  
  // Returns the gravitational force on another mover
  // F = (G * m1 * m2) / r^2
  attract(m) {
    // Direction of force
    var f = p5.Vector.sub(this.position, m.position);
    var r = f.mag();
    f.normalize();
    
    // Magnitude of force
    r = constrain(r, 5, 25);  // Reduces erratic behavior
    var magnitude = (CONFIG.gravConst * this.mass * m.mass) / (r * r);
    
    f.mult(magnitude);
    return f;
  }
}
