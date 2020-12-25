import p5 from "p5";
import Massive from "../massive";

export default class Spring {
  // We need to keep track of the spring’s anchor location.
  anchor: p5.Vector;

  // Rest length and spring constant variables
  len: number;
  k: number;

  // The constructor initializes the anchor point and rest length.
  constructor(sk: p5, x: number, y: number, l: number, k = 1) {
    this.anchor = sk.createVector(x, y);
    this.len = l;
    this.k = k;
  }

  // Calculate spring force—our implementation of Hooke’s Law.
  connect(sk: p5, b: Massive) {
    // Get a vector pointing from anchor to Bob location.
    const force = p5.Vector.sub(b.position, this.anchor);
    let d = force.mag();
    // Calculate the displacement between distance and rest length.
    let stretch = d - this.len;

    // Direction and magnitude together!
    force.normalize();
    force.mult(-1 * this.k * stretch);

    // Call applyForce() right here!
    b.applyForce(force);
  }

  // Draw the anchor.
  display(sk: p5) {
    sk.fill(100);
    sk.rectMode(sk.CENTER);
    sk.rect(this.anchor.x, this.anchor.y, 10, 10);
  }

  // Draw the spring connection between Bob location and anchor.
  displayLine(sk: p5, b: Massive) {
    sk.stroke(255);
    sk.line(b.position.x, b.position.y, this.anchor.x, this.anchor.y);
  }
}
