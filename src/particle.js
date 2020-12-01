const multicolor = [
  "#feae34",
  "#0099db",
  "#e43b44",
  "#3e8948",
  "#5a6988",
  "#fee761",
];
const altMulticolor = ["#d32734", "#da7d22", "#e6da29", "#28c641", "#2d93dd"];
const browns = [
  "#be4a2f",
  "#d77643",
  "#ead4aa",
  "#e4a672",
  "#b86f50",
  "#733e39",
  "#3e2731",
];
const redyellow = ["#a22633", "#e43b44", "#f77622", "#feae34", "#fee761"];
const greens = ["#63c74d", "#3e8948", "#265c42", "#193c3e"];
const blues = ["#124e89", "#0099db", "#2ce8f5"];
const lightgreen = ["#f4fbd0", "#68cf68", "#1e9178", "#05241f"];
const crimsonHues = ["#f3deba", "#e1674c", "#cb2233", "#941963", "#420e53"];
const multi3 = ["#ef604a", "#ffd877", "#00cc8b", "#005a75"];
const penny = ["#ffd2a4", "#d38147", "#2f8f9b", "#1b414a"];
const colors = penny;

import { centers } from "./index";

function choose(arr) {
  return arr[floor(random(0, arr.length))];
}

export class Particle {
  constructor(p5, yes) {
    this.p5 = p5;
    this.alpha = 0;
    //this.pos = createVector(random(width), random(height));
    this.pos = p5.createVector(
      p5.randomGaussian(p5.width / 2, p5.width / 4),
      p5.randomGaussian(p5.height / 2, p5.height / 4)
    );
    this.vel = p5.createVector(
      p5.randomGaussian(2, 2),
      p5.randomGaussian(2, 2)
    );
    this.acc = p5.createVector(0, 0);
    this.maxspeed = 4;
    this.prevPos = this.pos.copy();
    //this.color = color(0, random(60,180), random(60,180)/*, 16*/);
    //this.color = color(choose(colors));
    const where = p5.map(this.pos.x, 0, p5.width, 0, 1);
    const from = p5.color(browns[1]);
    const to = p5.color(lightgreen[2]);
    this.color = yes ? "f3deba" : p5.lerpColor(from, to, where);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxspeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  follow() {
    var force = this.directionAt(this.pos.x, this.pos.y);
    this.applyForce(force);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  show() {
    //stroke(220, 220, 220/*, 31*/);
    /*if (++this.alpha < 255) {
      return;
    }*/
    if (this.alpha === 255) {
      this.updatePrev();
    }
    //this.color.setAlpha(Math.min(++this.alpha, 255));
    this.p5.stroke(this.color);
    this.p5.strokeWeight(2);
    this.p5.line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    //point(this.pos.x, this.pos.y);
    this.updatePrev();
  }

  updatePrev() {
    this.prevPos.x = this.pos.x;
    this.prevPos.y = this.pos.y;
  }

  edges() {
    /*if (this.pos.x > width || this.pos.x < 0 || this.pos.y > height || this.pos.y < 0) {
      this.pos = createVector(random(width), random(height));
      this.updatePrev();
    }*/

    if (this.pos.x > width) {
      this.pos.x = 0;
      this.updatePrev();
    }
    if (this.pos.x < 0) {
      this.pos.x = width;
      this.updatePrev();
    }
    if (this.pos.y > height) {
      this.pos.y = 0;
      this.updatePrev();
    }
    if (this.pos.y < 0) {
      this.pos.y = height;
      this.updatePrev();
    }
  }
  directionAt(x, y) {
    const p = this.p5.createVector(x, y);
    let center = centers[0].copy();
    for (const c of centers) {
      if (c.dist(p) < center.dist(p)) {
        center = c.copy();
      }
    }
    const dir = center.sub(p);
    dir.setMag(0.1);
    return dir;
  }
}
