class BouncyBall extends Mover {
  constructor(x, y, mass) {
    super(x, y, mass);
    this.color = {
      r: random(256),
      g: random(256),
      b: random(256)
    };
    this.diameter = this.mass * 20;
  }
  
  checkEdges() {
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1 * X_MULT;
    }
    if (this.position.y > height) {
      this.position.y = height;
      this.velocity.y *= -1 * Y_MULT;
    }
    if (this.position.x < 0) {
      this.position.x = 0;
      this.velocity.x *= -1 * X_MULT;
    }
    if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.y *= -1 * Y_MULT;
    }
  }
}