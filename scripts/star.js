class Star extends Mover {
  constructor(x, y, mass) {
    super(x, y, mass);
    this.diameter = mass * 2;
  }
}