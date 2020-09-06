import "./styles/index.scss";

//const scl = 0.001;
//const zstep = 0.001;
//const cellSize = 15;
import * as p5 from "p5";
import { inherits } from "util";

const record = false;
// const filePrefix = 'chapter-1';
// let frame = 1;
// const frames = 360;

let running = true;
const background = 6;
let canvas;

let walker;
let spiral;
const s = sk => {
  sk.setup = () => {
    console.log("setup");
    canvas = sk.createCanvas(window.innerWidth, window.innerHeight);
    // p = sk.createP();
    sk.background(background);

    walker = new Walker(sk);
    spiral = new Spiral(sk);
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
    // walker.step(sk);
    // walker.render(sk);

    spiral.render(sk);

    if (record) {
      sk.recordFrame();
      if (frame === frames) {
        sk.noLoop();
      }
    }
  };

  sk.mouseClicked = () => {
    // running = !running;
  };

  sk.recordFrame = () => {
    const fileName = `${filePrefix}-${frame.toString().padStart(3, "0")}.png`;
    saveCanvas(canvas, fileName, "png");
    frame++;
  };
};

const P5 = new p5(s);

const perlinStep = 0.1;
const getPerlinV = (sk, offset, range, center) => {
  return sk.map(sk.noise(offset), 0, 1, center - range / 2, center + range / 2);
};

class Spiral {
  constructor(sk) {
    this.center = sk.createVector(sk.width / 2, sk.height / 2);
    this.limit = Math.sqrt(Math.pow(sk.height, 2) + Math.pow(sk.width, 2)) / 2;
    this.rStep = 0.1;
    this.gap = 10; // how much the radius grows per revolution
  }
  render(sk) {
    sk.stroke("red");
    this.rStep = sk.map(sk.mouseX, 0, sk.width, 0.0001, 0.1);

    // sk.circle(this.center.x, this.center.y, this.limit * 2);
    let r = 0.1;
    let radiusPosition = sk.createVector(0, 1);
    let oldRadiusPosition = radiusPosition;
    while (r < this.limit) {
      let position = this.center.copy().add(radiusPosition);
      let oldPosition = this.center.copy().add(oldRadiusPosition);

      sk.line(oldPosition.x, oldPosition.y, position.x, position.y);

      oldRadiusPosition = radiusPosition.copy();
      radiusPosition = radiusPosition.rotate(this.rStep);
      radiusPosition = radiusPosition.setMag(radiusPosition.mag() + 0.1);
      r = radiusPosition.mag();
    }
  }
}

class Walker {
  constructor(sk) {
    this.position = sk.createVector(sk.random(sk.width), sk.random(sk.height));
    this.oldPosition = sk.createVector(-1, -1);

    this.noff = sk.createVector(sk.random(1000), sk.random(1000));
    this.range = 1000;
  }

  render(sk) {
    sk.colorMode(sk.HSB, 255);
    sk.stroke(sk.color(getPerlinV(sk, this.noff.x + 1000, 255, 127), 220, 255));
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
}
