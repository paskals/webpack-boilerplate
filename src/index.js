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

// let position;
// let velocity;
let walker;
const s = sk => {
  sk.setup = () => {
    console.log("setup");
    canvas = sk.createCanvas(window.innerWidth, window.innerHeight);
    // p = sk.createP();
    sk.background(background);

    walker = new Walker(sk);
    if (record) {
      sk.frameRate(1);
    }
  };
  /// DRAW///
  sk.draw = () => {
    if (!running) {
      return;
    }
    sk.background(background, 5);
    walker.step(sk);
    // walker.checkEdges(sk);
    walker.render(sk);

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
const getPerlinV = (sk, offset, range, center) => {
  return sk.map(sk.noise(offset), 0, 1, center - range / 2, center + range / 2);
};

class Walker {
  constructor(sk) {
    this.position = sk.createVector(sk.random(sk.width), sk.random(sk.height));
    this.oldPosition = sk.createVector(-1, -1);
    // for (let i = 0; i < samples; i++) {
    //   heights.push(0);
    // }
    this.noff = sk.createVector(sk.random(1000), sk.random(1000));
    this.range = 1000;
  }

  render(sk) {
    sk.stroke(250);
    if (this.oldPosition.x != -1 && this.y != -1) {
      sk.noFill();
      sk.curve(
        getPerlinV(sk, this.noff.x - 3 * perlinStep, this.range, sk.width / 2),
        getPerlinV(sk, this.noff.y - 3 * perlinStep, this.range, sk.height / 2),
        getPerlinV(sk, this.noff.x - 2 * perlinStep, this.range, sk.width / 2),
        getPerlinV(sk, this.noff.y - 2 * perlinStep, this.range, sk.height / 2),
        getPerlinV(sk, this.noff.x - 1 * perlinStep, this.range, sk.width / 2),
        getPerlinV(sk, this.noff.y - 1 * perlinStep, this.range, sk.height / 2),
        getPerlinV(sk, this.noff.x, this.range, sk.width / 2),
        getPerlinV(sk, this.noff.y, this.range, sk.height / 2)
      );
    }
  }

  step(sk) {
    if (this.position.x != -1 && this.y != -1)
      this.oldPosition.set(this.position);

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
