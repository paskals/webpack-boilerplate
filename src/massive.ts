import p5 from "p5";

export default class Massive {
  mass: number;
  acceleration: p5.Vector;
  velocity: p5.Vector;
  position: p5.Vector;

  constructor(sk: p5, m: number, x: number, y: number) {
    this.acceleration = sk.createVector(0, 0);
    this.velocity = sk.createVector(0, 0);
    this.position = sk.createVector(x, y);
    this.mass = m;
  }

  applyForce(force: p5.Vector) {
    const f_ = p5.Vector.div(force, this.mass);
    this.acceleration.add(f_);
  }

  step(sk: p5) {
    // Add acceleration to velocity
    this.velocity.add(this.acceleration);

    this.position.add(this.velocity);

    // Reset acceleration at the end of update
    // This enables adding forces before update
    this.acceleration.mult(0);
  }
}
