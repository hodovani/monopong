import { Vector } from './vector.js';

export class PlayArea {
    constructor(radius) {
        this.radius = radius;
        this.center = new Vector(radius, radius); 
    }
    draw(ctx){
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.arc(this.radius, this.radius, this.radius, 0, 2 * Math.PI, false);
        ctx.stroke();
    }
}
