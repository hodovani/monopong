import { Vector } from './vector.js';

export class Paddle {
    constructor({radius}) {
        this.radius = radius;
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
        paddle.arc(this.radius, this.radius, this.radius, this.angle - this.size, this.angle + this.size);
        ctx.fillStyle = '#000';
        ctx.stroke(paddle);
    }
    sector(){
        const sector = new Path2D();
        sector.moveTo(this.radius, this.radius);
        sector.arc(this.radius, this.radius, this.radius, this.angle - this.size, this.angle + this.size);
        sector.lineTo(this.radius, this.radius);
        return sector;
    }
}
