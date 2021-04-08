import {Ball} from './ball';
import {PlayArea} from './playArea';
import {Vector} from './vector';

export class Game {
    constructor({size}){
        this.smallerDim = size;
       
        this.R = this.smallerDim / 2;
        this.x0 = 0.5 * this.smallerDim;
        this.y0 = 0.5 * this.smallerDim;
        this.ball = new Ball(new Vector(this.x0, this.y0), new Vector(1, 1), this);
        this.playArea = new PlayArea(this.R);
    }

    update(canvas){
        this.clearCanvas(canvas);
        // Draw current game state
        const ctx = canvas.getContext('2d');
        this.playArea.draw(ctx);
        this.ball.draw(ctx);
        // Calculate next game state
        this.ball.move();
        // Check boundaries
        if(this.playArea.center.distanceTo(this.ball.position) > this.playArea.radius){
            this.ball.velocity.x *= -1;
            this.ball.velocity.y *= -1;
        }
    }

    clearCanvas(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }   
}