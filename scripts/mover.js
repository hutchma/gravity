class Mover {
  constructor(x, y, mass) {
    this.position = new p5.Vector(x, y);
    this.velocity = new p5.Vector(0, 0);
    this.acceleration = new p5.Vector(0, 0);
    this.mass = mass;
    this.color = {
      r: random(63, 256),
      g: random(63, 256),
      b: random(63, 256)
    };
    this.diameter = 0;
  }
  
  display() {
    fill(this.color.r, this.color.g, this.color.b);
    noStroke();
    ellipse(this.position.x, this.position.y, this.diameter, this.diameter);
  }
  
  // Override
  checkEdges() {
    ;
  }
  
  // TODO: Velocity Verlet integration
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  
  // Newton's 2nd Law (F = ma)
  applyForce(force) {
    var a = p5.Vector.div(force, this.mass);
    this.acceleration.add(a);
  }
  
  // Returns gravitational force on other mover
  // F = (G * m1 * m2) / (r * r)
  attract(m) {
    var force = p5.Vector.sub(this.position, m.position);
    var r = force.mag();
    r = constrain(r, 5, 25);
    force.normalize();
    
    var strength = (GRAVITY_CONSTANT*this.mass*m.mass) / (r*r);
    force.mult(strength);
    
    return force;
  }
}