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
const s = sk => {
  sk.setup = () => {
    console.log("setup");
    canvas = sk.createCanvas(window.innerWidth, window.innerHeight);
    // p = sk.createP();
    sk.background(background);

    for (let i = 0; i < 10; i++) {
      walkers.push(new Walker(sk));
    }
    // walker = new Walker(sk);
    position = sk.createVector(100, 100);
    velocity = sk.createVector(2, 3);
    ////////
    if (record) {
      sk.frameRate(1);
    }
  };
  /// DRAW///
  sk.draw = () => {
    if (!running) {
      return;
    }
    sk.background(background);
    walkers.forEach(walker => {
      walker.step(sk);
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
  constructor(sk) {
    this.acceleration = sk.createVector(0.001, -0.01);
    this.velocity = sk.createVector(0, 0);
    this.position = sk.createVector(sk.random(sk.width), sk.random(sk.height));
    this.oldPosition = sk.createVector(-1, -1);
    
    this.sampleStep = Math.floor(sk.width / samples);
    this.topSpeed = 20;
    this.drag = 0.01;
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
      sk.ellipse(this.position.x, this.position.y, 16, 16);
    }
  }

  step(sk) {
    let mouse = sk.createVector(sk.mouseX, sk.mouseY);// get the mouse location

    //Compute direction
    let dir = p5.Vector.sub(mouse, this.position);

    // normalize direction vector (set to mag 1)
    dir.normalize();
    // Scale (down) direction magnitude
    dir.mult(0.5);
    // dir.mult(1 / dir.mag());

    // update oldPosition
    if (this.position.x != -1 && this.y != -1)
      this.oldPosition.set(this.position);
    
    // Calculate drag
    let drag = sk.createVector().set(this.velocity);// equal to current velocity
    drag.normalize();
    drag.mult(-this.drag); // multiply by negative drag coefficient

    // accelartion equal to direction
    this.acceleration = dir;
    // Add drag to acceleration
    this.acceleration.add(drag);
    //Add acceleration to velocity
    this.velocity.add(this.acceleration);

    // Limit top speed
    this.velocity.limit(this.topSpeed);
    this.position.add(this.velocity);

  }

  checkEdges(sk) {
    if (this.position.x > sk.width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = sk.width;
    }

    if (this.position.y > sk.height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = sk.height;
    }
  }
}
