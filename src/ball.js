import { Vector } from './vector.js';

export class Ball {
    constructor(position, velocity) {
        this.position = position;
        this.velocity = velocity || new Vector();
        this.r = 10;
    }
    move(){
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = '#f0f';
        ctx.arc(this.position.x, this.position.y, this.r, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}
