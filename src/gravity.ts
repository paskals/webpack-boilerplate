import p5 from "p5";
import Mover from './mover';

export default class Gravity {
  constructor(p5: p5.Vector){

  }

  apply(sk:p5, objects: Mover[]){
    objects.forEach(el => {
      el.applyForce(sk.createVector(0,1))
    });
  }
}