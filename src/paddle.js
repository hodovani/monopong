import { Vector } from './vector.js';

export class Paddle {
    constructor({radius, center}) {
        this.radius = radius;
        this.center = center;
        this.angle = 0;
        this.direction = 0;
        this.size = 0.1;
        this.speed = 0.009;
    }
    move({rightPressed, leftPressed}){
        if(rightPressed && !leftPressed){
            this.direction = -1;
        } else if(!rightPressed && leftPressed){
            this.direction = 1;
        } else {
            this.direction = 0;
        }

        this.angle += this.direction * this.speed * Math.PI;
    }
    draw(ctx){
        const paddle = new Path2D();
        paddle.arc(this.center, this.center, this.radius, this.angle - this.size, this.angle + this.size);
        ctx.fillStyle = '#000';
        ctx.strokeStyle = 'rgba(0,0,0,1)';
        ctx.lineWidth = 3;
        ctx.setLineDash([]);
        ctx.stroke(paddle);
    }
    sector(){
        const sector = new Path2D();
        sector.moveTo(this.center, this.center);
        sector.arc(this.center, this.center, this.radius, this.angle - this.size, this.angle + this.size);
        sector.lineTo(this.center, this.center);
        return sector;
    }
}
