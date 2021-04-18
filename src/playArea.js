import { Vector } from './vector.js';

export class PlayArea {
    constructor({center, radius}) {
        this.radius = radius;
        this.center = new Vector(center, center); 
    }
    draw(ctx){
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 16]);
        ctx.lineDashOffset = 5;
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI, false);
        ctx.stroke();
    }
}
