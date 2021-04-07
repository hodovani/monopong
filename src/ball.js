import { Vector } from './vector.js';

export class Ball {
    constructor(position, velocity) {
        this.position = position;
        this.velocity = velocity || new Vector();
    }
}
