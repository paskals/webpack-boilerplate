// Test import of a JavaScript function, an SVG, and Sass

import './styles/index.scss'


//const scl = 0.001;
//const zstep = 0.001;
//const cellSize = 15;
import * as p5 from 'p5';
import {
  Particle
} from './particle.js';

const points = [];
export const centers = [];
const numPoints = 10000;
const record = false;
const filePrefix = 'gravity5';
const frames = 360;

let running = true;
let canvas;
let p;
let frame = 1;

const s = (sk) => {
  sk.setup = () => {
    console.log('setup')
    canvas = sk.createCanvas(window.innerWidth, window.innerHeight);
    p = sk.createP();
    sk.background(60);
    const inc = sk.height / numPoints;
    for (let i = 0; i < numPoints; i++) {
      const p = new Particle(sk, i == 1);
      points.push(p);
    }
    /*grav = createVector(0, -1);
    grav.setMag(height / 4);
    const ctr = createVector(width / 2, height / 2);
    ctr.add(grav);
    gravX = ctr.x;
    gravY = ctr.y;*/

    // center
    centers.push(sk.createVector(sk.width / 2, sk.height / 2));

    const v = sk.createVector(0, -1);
    const c = sk.createVector(sk.width / 2, sk.height / 2);

    for (let i = 0; i < 5; i++) {
      v.rotate(sk.TWO_PI / 5);
      const vv = v.copy();
      vv.setMag(sk.width / 4);
      vv.add(c);
      centers.push(vv);
    }

    if (record) {
      sk.frameRate(1);
    }
  }
  sk.draw = () => {
    if (!running) {
      return;
    }
    sk.background(60);

    for (const p of points) {
      p.follow();
      p.update();
      p.show();
    }

    /*const ctr = createVector(width / 2, height / 2);
    grav.rotate(TWO_PI / 360);
    ctr.add(grav);
    gravX = ctr.x;
    gravY = ctr.y;*/

    /*
    stroke(220);
    fill(220);
    for (const c of centers) {
      circle(c.x, c.y, 5);
    }
    noFill();
    circle(width / 2, height / 2, width / 2);*/

    p.html(sk.frameRate().toFixed(2) + ' ' + sk.frameCount);

    if (record) {
      sk.recordFrame();
      if (frame === frames) {
        sk.noLoop();
      }
    }

  }
  sk.mouseClicked = () => {
    running = !running;
  }
  sk.recordFrame = () => {
    const fileName = `${filePrefix}-${frame.toString().padStart(3, '0')}.png`;
    saveCanvas(canvas, fileName, 'png');
    frame++;
  }
}

const P5 = new p5(s);