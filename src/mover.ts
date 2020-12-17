import p5 from "p5";
import Liquid from "./liquid";
import Massive from "./massive";

const colors = [
  "#feae34",
  "#0099db",
  "#e43b44",
  "#3e8948",
  "#5a6988",
  "#fee761",
];

export default class Mover extends Massive {
  oldPositions: p5.Vector[];
  topSpeed: number;
  fill: string;
  radius: number;
  shader: p5.Shader;

  constructor(
    sk: p5,
    m: number,
    x: number,
    y: number,
    shader: p5.Shader,
    radius?: number
  ) {
    super(sk, m, x, y);
    this.shader = shader;

    this.oldPositions = [sk.createVector(x, y)];

    this.topSpeed = 50;

    this.fill = colors[Math.floor(sk.random(0, colors.length))];

    if (radius) {
      this.radius = radius;
    }
  }

  render(sk: p5) {
    // sk.shader(this.shader);
    // this.drawLine(sk);

    sk.strokeWeight(2);

    sk.stroke(200);
    sk.fill(this.fill);

    const radius = this.radius ? this.radius : this.mass * 10;

    sk.ellipse(this.position.x, this.position.y, radius, radius);

    // sk.rect(0, 0, sk.width, sk.height);
  }
  drawLine(sk: p5) {
    const length = 30;
    if (this.oldPositions.length > length) {
      this.oldPositions.shift();
    }
    sk.stroke(220, 255 / length + 10);
    let el = null;
    for (let i = 0; i < this.oldPositions.length; i++) {
      el = this.oldPositions[i];
      if (i + 1 < this.oldPositions.length) {
        sk.strokeWeight(1);
        sk.line(
          el.x,
          el.y,
          this.oldPositions[i + 1].x,
          this.oldPositions[i + 1].y
        );
      }
      sk.stroke(220, 255 / (length - i) + 10);
    }
    sk.line(el.x, el.y, this.position.x, this.position.y);
  }

  applyGravity(force: p5.Vector) {
    // Gravity does not depend on mass
    this.acceleration.add(force);
  }

  applyFriction(c: number) {
    const friction = this.velocity.copy();
    friction.normalize();
    friction.mult(-1);
    friction.mult(c);
    this.applyForce(friction);
  }

  applyDrag(c: number) {
    const speed = this.velocity.mag();
    // The force’s magnitude: Cd * v~2~
    const dragMagnitude = c * speed * speed;

    const drag = this.velocity.copy();
    drag.mult(-1);
    // The force's direction: -1 * velocity
    drag.normalize();

    // Finalize the force: magnitude and direction together.
    drag.mult(dragMagnitude);

    // Apply the force.
    this.applyForce(drag);
  }

  isInside(obj: Liquid) {
    try {
      if (
        this.position.x > obj.x &&
        this.position.x < obj.x + obj.w &&
        this.position.y > obj.y &&
        this.position.y < obj.y + obj.h
      ) {
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.log(e);

      return false;
    }
  }

  step(sk: p5) {
    // update oldPosition

    this.oldPositions.push(this.position.copy());

    // Add acceleration to velocity
    this.velocity.add(this.acceleration);

    // Limit top speed
    this.velocity.limit(this.topSpeed);
    this.position.add(this.velocity);

    // Reset acceleration at the end of update
    // This enables adding forces before update
    this.acceleration.mult(0);
  }

  checkEdges(sk: p5) {
    if (this.position.x > sk.width) {
      this.position.x = sk.width;
      this.velocity.x *= -1;
    } else if (this.position.x < 0) {
      this.position.x = 0;
      this.velocity.x *= -1;
    }

    if (this.position.y > sk.height) {
      this.position.y = sk.height;
      this.velocity.y *= -1;
    } else if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.x *= -1;
    }
  }
}
