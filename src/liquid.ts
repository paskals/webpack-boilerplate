import p5 from "p5";

export default class Liquid {
  x: number;
  y: number;
  w: number;
  h: number;
  c: number;
  // The liquid object includes a variable defining its coefficient of drag
  constructor(x_: number, y_: number, w_: number, h_: number, c_: number) {
    this.x = x_;
    this.y = y_;
    this.w = w_;
    this.h = h_;
    this.c = c_;
  }

  render(sk: p5) {
    sk.noStroke();
    sk.fill(175);
    sk.rect(this.x, this.y, this.w, this.h);
  }
}