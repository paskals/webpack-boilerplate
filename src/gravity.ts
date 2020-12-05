import p5 from "p5";
import Massive from "./massive";

export default class Gravity {
  G: number;
  constructor(G: number) {
    this.G = G;
  }

  applyAll(sk: p5, objects: Massive[]) {
    objects.forEach((el1) => {
      objects.forEach((el2) => {
        if (el1 !== el2) {
          const force = this.getForce(sk, el2, el1);
          el1.applyForce(force);
        }
      });
    });
  }

  applyAttractor(sk: p5, attractor: Massive, objects: Massive[]) {
    objects.forEach((el) => {
      const force = this.getForce(sk, attractor, el);
      el.applyForce(force);
    });
  }

  getForce(sk: p5, obj1: Massive, obj2: Massive): p5.Vector {
    const force = p5.Vector.sub(obj1.position, obj2.position);
    let distance = force.mag();
    // Remember, we need to constrain the distance so that our circle doesn’t spin out of control.
    distance = sk.constrain(distance, 5.0, 25.0);

    force.normalize();
    const strength = (this.G * obj1.mass * obj2.mass) / Math.pow(distance, 2);
    force.mult(strength);
    return force;
  }
}
