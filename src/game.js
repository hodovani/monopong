import {Ball} from './ball.js';
import {Vector} from './vector.js';

export class Game {
    constructor({size}){
        this.smallerDim = size;
       
        this.R = this.smallerDim / 2;
        this.x0 = 0.5 * this.smallerDim;
        this.y0 = 0.5 * this.smallerDim;
        this.ball = new Ball(new Vector(this.x0, this.y0), new Vector(0, 0), this)
    }

    update(canvas){
        this.clearCanvas(canvas);

        const ctx = canvas.getContext('2d');

        ctx.beginPath();
        ctx.fillStyle = '#f0f';
        ctx.arc(this.ball.position.x, this.ball.position.y, this.ball.size, 0, 2 * Math.PI, false);
        ctx.fill();
    }

    clearCanvas(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }   
}