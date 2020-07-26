// Test import of a JavaScript function, an SVG, and Sass

import "./styles/index.scss";

//const scl = 0.001;
//const zstep = 0.001;
//const cellSize = 15;
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
    // sk.background(background);
    walkers.forEach(walker => {
      walker.step(sk);
      // walker.checkEdges(sk);
      walker.render(sk);
    });
    // position.add(velocity);

    // if ((position.x > sk.width) || (position.x < 0)) {
    //   velocity.x = velocity.x * -1;
    // }
    // if ((position.y > sk.height) || (position.y < 0)) {
    //   velocity.y = velocity.y * -1;
    // }

    // // Display circle at x position
    // sk.stroke(255);
    // sk.strokeWeight(2);
    // sk.fill(127);
    // sk.ellipse(position.x, position.y, 48, 48);

    // p.html(sk.frameRate().toFixed(2) + ' ' + sk.frameCount);

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

const heights = [];
const samples = 1000;
const perlinStep = 0.1;
const getPerlinV = (sk, offset, range) => {
  return sk.map(sk.noise(offset), 0, 1, 0, range);
};

class Walker {
  constructor(sk) {
    this.acceleration = sk.createVector(0.001, -0.01);
    this.velocity = sk.createVector(0, 0);
    this.position = sk.createVector(sk.random(sk.width), sk.random(sk.height));
    this.oldPosition = sk.createVector(-1, -1);
    // for (let i = 0; i < samples; i++) {
    //   heights.push(0);
    // }
    this.noff = sk.createVector(sk.random(1000), sk.random(1000));
    this.sampleStep = Math.floor(sk.width / samples);
    this.topSpeed = 20;
    this.drag = 0.01;
  }

  render(sk) {
    sk.stroke(220);
    if (this.oldPosition.x != -1 && this.y != -1) {
      // sk.stroke(200);
      // // sk.fill(220);
      // sk.line(
      //   this.oldPosition.x,
      //   this.oldPosition.y,
      //   this.position.x,
      //   this.position.y
      // );
      // sk.ellipse(this.position.x, this.position.y, 16, 16);

      sk.noFill();
      sk.curve(
        getPerlinV(sk, this.noff.x - 3 * perlinStep, sk.width),
        getPerlinV(sk, this.noff.y - 3 * perlinStep, sk.height),
        getPerlinV(sk, this.noff.x - 2 * perlinStep, sk.width),
        getPerlinV(sk, this.noff.y - 2 * perlinStep, sk.height),
        getPerlinV(sk, this.noff.x - 1 * perlinStep, sk.width),
        getPerlinV(sk, this.noff.y - 1 * perlinStep, sk.height),
        getPerlinV(sk, this.noff.x, sk.width),
        getPerlinV(sk, this.noff.y, sk.height)
      );
    }
  }

  step(sk) {
    // let mouse = sk.createVector(sk.mouseX, sk.mouseY);
    // let dir = p5.Vector.sub(mouse, this.position);

    // dir.mult(0.1);
    // dir.mult(1 / dir.mag());
    if (this.position.x != -1 && this.y != -1)
      this.oldPosition.set(this.position);
    // let step = sk.random(0, 4);
    // step = step * step;

    // this.position.x += sk.random(-step, step);
    // this.position.y += sk.random(-step, step);
    /// test
    // let posT = sk.width / 2 + sk.random(-step, step);
    // let bucket = Math.floor(posT / this.sampleStep);
    // heights[bucket]++;

    // sk.noStroke()
    // sk.fill(255, 90);
    // sk.ellipse(posT, sk.height - heights[bucket], 2, 2);

    ///

    // this.acceleration.x = getPerlinV(sk, this.noff.x, 0.1);
    // this.acceleration.y = getPerlinV(sk, this.noff.y, 0.1);
    // let drag = sk.createVector().set(this.velocity);
    // drag.normalize();
    // drag.mult(-this.drag);

    // this.acceleration = dir;
    // this.acceleration.add(drag);
    // this.velocity.add(this.acceleration);

    // this.velocity.limit(this.topSpeed);
    // this.position.add(this.velocity);

    this.noff.add(perlinStep, perlinStep, 0);
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
