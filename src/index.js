// Test import of a JavaScript function, an SVG, and Sass

import "./styles/index.scss";

import * as p5 from "p5";

const record = false;
// const filePrefix = 'chapter-1';
// let frame = 1;
// const frames = 360;

let running = true;
const background = 60;
let canvas;
// let p;

let position;
let velocity;
let walker;
let walkers = [];
let wind;
let normalF = 1;
let frictionC = 0.3;
let gravity;

let liquid;

const s = (sk) => {
  sk.setup = () => {
    console.log("setup");
    canvas = sk.createCanvas(window.innerWidth, window.innerHeight);
    // p = sk.createP();
    sk.background(background);

    for (let i = 0; i < 10; i++) {
      walkers.push(
        new Walker(
          sk,
          sk.random(0.5, 10),
          sk.random(sk.width),
          sk.random(sk.height / 2)
        )
      );
    }
    // walker = new Walker(sk);
    position = sk.createVector(100, 100);
    velocity = sk.createVector(2, 3);
    ////////
    if (record) {
      sk.frameRate(1);
    }
    wind = sk.createVector(0.01, 0);
    gravity = sk.createVector(0, 1);

    liquid = new Liquid(0, sk.height / 2, sk.width, sk.height / 2, 0.1);
  };
  /// DRAW///
  sk.draw = () => {
    if (!running) {
      return;
    }
    sk.background(background);
    liquid.render(sk);
    walkers.forEach((walker) => {
      let mouse = sk.createVector(sk.mouseX, sk.mouseY); // get the mouse location

      //Compute direction
      let dir = p5.Vector.sub(mouse, walker.position);
      // normalize direction vector (set to mag 1)
      dir.normalize();

      //Apply direction as a force toward the mouse pointer
      // walker.applyForce(dir.mult(0.2));

      // Calculate drag
      let drag = sk.createVector().set(walker.velocity); // equal to current velocity
      drag.normalize();
      drag.mult(-0.001); // multiply by negative drag coefficient

      // walker.applyForce(drag);

      // walker.applyForce(wind);
      walker.applyGravity(gravity);
      walker.applyFriction(frictionC);
      if (walker.isInside(liquid)) {
        walker.applyDrag(liquid.c);
      }

      walker.step(sk);
      walker.checkEdges(sk);
      // walker.checkEdges(sk);
      walker.render(sk);
    });

    if (record) {
      sk.recordFrame();
      if (frame === frames) {
        sk.noLoop();
      }
    }
  };

  sk.mouseClicked = () => {
    running = !running;
  };

  sk.recordFrame = () => {
    const fileName = `${filePrefix}-${frame.toString().padStart(3, "0")}.png`;
    saveCanvas(canvas, fileName, "png");
    frame++;
  };
};

const P5 = new p5(s);

const samples = 1000;

class Walker {
  constructor(sk, m, x, y) {
    this.acceleration = sk.createVector(0, 0);
    this.velocity = sk.createVector(0, 0);
    this.position = sk.createVector(x, y);
    this.oldPosition = sk.createVector(-1, -1);

    this.sampleStep = Math.floor(sk.width / samples);
    this.topSpeed = 50;

    this.mass = m;
  }

  render(sk) {
    sk.stroke(220);
    if (this.oldPosition.x != -1 && this.y != -1) {
      sk.stroke(200);
      sk.fill(220);
      sk.line(
        this.oldPosition.x,
        this.oldPosition.y,
        this.position.x,
        this.position.y
      );
      sk.ellipse(
        this.position.x,
        this.position.y,
        this.mass * 10,
        this.mass * 10
      );
    }
  }

  applyForce(force) {
    let f_ = p5.Vector.div(force, this.mass);
    this.acceleration.add(f_);
  }

  applyGravity(force) {
    // Gravity does not depend on mass
    this.acceleration.add(force);
  }

  applyFriction(c) {
    let friction = this.velocity.copy();
    friction.normalize();
    friction.mult(-1);
    friction.mult(c);
    this.applyForce(friction);
  }

  applyDrag(c) {
    let speed = this.velocity.mag();
    //The force’s magnitude: Cd * v~2~
    let dragMagnitude = c * speed * speed;

    let drag = this.velocity.copy();
    drag.mult(-1);
    //The force's direction: -1 * velocity
    drag.normalize();

    //Finalize the force: magnitude and direction together.
    drag.mult(dragMagnitude);

    //Apply the force.
    this.applyForce(drag);
  }

  isInside(obj) {
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

  step(sk) {
    // update oldPosition
    if (this.position.x != -1 && this.y != -1) {
      this.oldPosition.set(this.position);
    }
    //Add acceleration to velocity
    this.velocity.add(this.acceleration);

    // Limit top speed
    this.velocity.limit(this.topSpeed);
    this.position.add(this.velocity);

    // Reset acceleration at the end of update
    // This enables adding forces before update
    this.acceleration.mult(0);
  }

  checkEdges(sk) {
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

class Liquid {
  // The liquid object includes a variable defining its coefficient of drag
  constructor(x_, y_, w_, h_, c_) {
    this.x = x_;
    this.y = y_;
    this.w = w_;
    this.h = h_;
    this.c = c_;
  }

  render(sk) {
    sk.noStroke();
    sk.fill(175);
    sk.rect(this.x, this.y, this.w, this.h);
  }
}
