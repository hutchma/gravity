class Planet extends Mover {
  constructor(x, y, mass) {
    super(x, y, mass);
    this.diameter = this.mass * 20;
  }
}