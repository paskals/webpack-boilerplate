// Test import of a JavaScript function, an SVG, and Sass

import "./styles/index.scss";
import "./gravity.ts";
import p5 from "p5";
import Liquid from "./liquid";
import Mover from "./mover";
import Gravity from "./gravity";

const record = false;
const filePrefix = "chapter-2";
let frame = 1;
const frames = 360;

const gravity = new Gravity(0.1);

let running = true;
const background = "#f6ea50";
let canvas: p5.Renderer;
// let p;
let angle = 0;
let r = 0;
const increment = 0.03;

let attractor: Mover;
const movers: Mover[] = [];

const s = (sk: p5) => {
  sk.frameRate(120);
  sk.preload = () => {
    // shader = sk.loadShader("./shaders/shader.vert", "./shaders/shader.frag");
  };
  sk.setup = () => {
    console.log("setup");
    canvas = sk.createCanvas(window.innerWidth, window.innerHeight);
    // p = sk.createP();
    sk.background(background);
    if (record) {
      sk.frameRate(1);
    }

    attractor = new Mover(sk, 100, sk.width / 2, sk.height / 2, 50);
    attractor.step(sk);
    const middle = sk.createVector(sk.width / 2, sk.height / 2);
    for (let i = 0; i < 50; i++) {
      const mover = new Mover(
        sk,
        sk.random(0.01, 3),
        sk.random(sk.width / 4, sk.width / 2 + sk.width / 4),
        sk.random(sk.height / 4, sk.height / 2 + sk.height / 4)
      );
      // const force = p5.Vector.sub(mover.position, middle);
      // force.normalize();
      // force.rotate(90);
      // force.mult(0.5);
      // mover.applyForce(force);
      movers.push(mover);
    }
  };
  /// DRAW///
  sk.draw = () => {
    if (!running) {
      return;
    }

    // sk.background(background);
    const mouse = sk.createVector(sk.mouseX, sk.mouseY); // get the mouse location
    let x = r * sk.cos(angle);
    let y = r * sk.sin(angle);

    sk.noStroke();
    sk.fill(0);
    sk.ellipse(x + sk.width / 2, y + sk.height / 2, 10, 10);

    angle += 0.01;
    r += 0.03;
    //   gravity.applyAll(sk, movers);
    //   attractor.step(sk);
    //   attractor.render(sk);
    //   movers.forEach((el) => {
    //     el.step(sk);
    //     el.render(sk);
    //   });

    //   /////////////////////
    //   // sk.translate(sk.width / 2, sk.height / 2);
    //   // sk.rotate(angle);
    //   // // const center = sk.createVector(sk.width / 2, sk.height / 2);

    //   // sk.strokeWeight(2);

    //   // sk.stroke(150);
    //   // sk.fill(220);
    //   // sk.line(-50, 0, 50, 0);

    //   // sk.ellipse(50, 0, 30, 30);
    //   // sk.ellipse(-50, 0, 30, 30);

    //   // angle += increment;
    //   ///////////////////////
    //   if (record) {
    //     recordFrame();
    //     if (frame === frames) {
    //       sk.noLoop();
    //     }
    //   }
  };

  sk.mouseClicked = () => {
    running = !running;
  };
  sk.windowResized = () => {
    sk.resizeCanvas(sk.windowWidth, sk.windowHeight);
  };
  const recordFrame = () => {
    const fileName = `${filePrefix}-${frame.toString().padStart(3, "0")}.png`;
    sk.saveCanvas(canvas, fileName, "png");
    frame++;
  };
};

const P5 = new p5(s);
