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

let running = true;
const background = "#f6ea50";
let canvas: p5.Renderer;
// let p;
var angle = 0;
const increment = 0.03;
const s = (sk: p5) => {
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
  };
  /// DRAW///
  sk.draw = () => {
    if (!running) {
      return;
    }

    sk.background(background);
    const mouse = sk.createVector(sk.mouseX, sk.mouseY); // get the mouse location
    /////////////////////
    sk.translate(sk.width / 2, sk.height / 2);
    sk.rotate(angle);
    // const center = sk.createVector(sk.width / 2, sk.height / 2);

    sk.strokeWeight(2);

    sk.stroke(150);
    sk.fill(220);
    sk.line(-50, 0, 50, 0);

    sk.ellipse(50, 0, 30, 30);
    sk.ellipse(-50, 0, 30, 30);

    angle += increment;
    ///////////////////////
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
