import p5 from "p5";
import Massive from "./massive";

export default class Rotating extends Massive {
  angle: number;
  aAcceleration: number;
  aVelocity: number;

  constructor(
    sk: p5,
    m: number,
    x: number,
    y: number,
    angle = 0,
    aVelocity = 0
  ) {
    super(sk, m, x, y);
    this.angle = angle;
    this.aVelocity = aVelocity;
    this.aAcceleration = 0;
  }

  step(sk: p5) {
    super.step(sk);
    this.aVelocity += this.aAcceleration;
    this.angle += this.aVelocity;
  }
}
