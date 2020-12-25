import p5, { Vector } from "p5";
import Rotating from "./rotating";

export default class Pendulum extends Rotating {
  r: number;
  gravity: number;
  damping: number;
  constructor(
    sk: p5,
    m: number,
    x: number,
    y: number,
    r = 125,
    gravity = 10,
    angle = 90,
    aVelocity = 0
  ) {
    super(sk, m, x, y, angle, aVelocity);
    this.r = r;
    this.gravity = gravity;
    this.damping = 0.995;
  }

  step(sk: p5) {
    this.aAcceleration = -1 * (this.gravity / this.r) * sk.sin(this.angle);
    super.step(sk);
    this.aVelocity *= this.damping;
  }

  render(sk: p5) {
    const bobLocation = sk.createVector(
      this.r * sk.sin(this.angle),
      this.r * sk.cos(this.angle)
    );
    bobLocation.add(this.position);

    sk.stroke(0);
    // The arm
    sk.line(this.position.x, this.position.y, bobLocation.x, bobLocation.y);
    sk.fill(175);
    // The bob
    sk.ellipse(bobLocation.x, bobLocation.y, 16, 16);
  }
}
