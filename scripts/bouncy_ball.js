class BouncyBall extends Mover {
  checkEdges() {
    if (this.position.x > width) {
      this.position.x = width;
      this.velocity.x *= -1;
    }
    if (this.position.y > height) {
      this.position.y = height;
      this.velocity.y *= -1;
    }
    if (this.position.x < 0) {
      this.position.x = 0;
      this.velocity.x *= -1;
    }
    if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.y *= -1;
    }
  }
}