// Test import of a JavaScript function, an SVG, and Sass

import "./styles/index.scss";
import "./gravity.ts";
import p5 from "p5";
import Liquid from "./liquid";
import Mover from "./mover";
import Gravity from "./gravity";

const gravity = new Gravity(1);

const record = false;
const filePrefix = "chapter-2";
let frame = 1;
const frames = 360;

let running = true;
const background = 60;
let canvas: p5.Renderer;
// let p;

const movers: Mover[] = [];
let attractor: Mover;
let wind: p5.Vector;
const normalF = 1;
const frictionC = 0.3;
// let gravity: p5.Vector;

let liquid: Liquid;

const s = (sk: p5) => {
  sk.setup = () => {
    console.log("setup");
    canvas = sk.createCanvas(window.innerWidth, window.innerHeight, sk.WEBGL);
    // p = sk.createP();
    sk.background(background);
    attractor = new Mover(sk, 100, sk.width / 2, sk.height / 2, 50);
    attractor.step(sk);

    for (let i = 0; i < 50; i++) {
      movers.push(
        new Mover(
          sk,
          sk.random(0.01, 3),
          sk.random(sk.width),
          sk.random(sk.height)
        )
      );
    }
    if (record) {
      sk.frameRate(1);
    }
    // wind = sk.createVector(0.01, 0);
    // gravity = sk.createVector(0, 1);

    liquid = new Liquid(0, sk.height / 2, sk.width, sk.height / 2, 0.1);
  };
  /// DRAW///
  sk.draw = () => {
    if (!running) {
      return;
    }
    sk.background(background);
    const mouse = sk.createVector(sk.mouseX, sk.mouseY); // get the mouse location

    // liquid.render(sk);
    gravity.applyAttractor(sk, attractor, movers);
    // gravity.applyAll(sk, movers.concat(attractor));
    attractor.position = mouse;
    attractor.step(sk);
    attractor.render(sk);

    movers.forEach((mover) => {
      // Compute direction
      // const dir = p5.Vector.sub(mouse, mover.position);
      // normalize direction vector (set to mag 1)
      // dir.normalize();

      // Apply direction as a force toward the mouse pointer
      // mover.applyForce(dir.mult(1));

      // Calculate drag
      // const drag = sk.createVector().set(mover.velocity); // equal to current velocity
      // drag.normalize();
      // drag.mult(-0.001); // multiply by negative drag coefficient

      // mover.applyForce(drag);

      // mover.applyForce(wind);
      // mover.applyGravity(gravity);
      // mover.applyFriction(frictionC);
      // if (mover.isInside(liquid)) {
      //   mover.applyDrag(liquid.c);
      // }
      mover.step(sk);
      // mover.checkEdges(sk);
      // mover.checkEdges(sk);
      mover.render(sk);
    });

    if (record) {
      recordFrame();
      if (frame === frames) {
        sk.noLoop();
      }
    }
  };

  sk.mouseClicked = () => {
    running = !running;
  };

  const recordFrame = () => {
    const fileName = `${filePrefix}-${frame.toString().padStart(3, "0")}.png`;
    sk.saveCanvas(canvas, fileName, "png");
    frame++;
  };
};

const P5 = new p5(s);
