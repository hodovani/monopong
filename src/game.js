import {Ball} from './ball';
import {PlayArea} from './playArea';
import {Paddle} from './paddle';
import {Vector} from './vector';
import {gameState} from './gameState';

export class Game {
    constructor({size}){
        this.smallerDim = size;
        this.R = this.smallerDim / 2;
        this.x0 = 0.5 * this.smallerDim;
        this.y0 = 0.5 * this.smallerDim;
        this.rightPressed = false;
        this.leftPressed = false;
        this.state = gameState.PLAYING;

        this.ball = new Ball(new Vector(this.x0, this.y0), new Vector(1, 1), this);
        this.playArea = new PlayArea(this.R);
        this.paddle = new Paddle({radius: this.R});
        
        document.addEventListener('keydown', this.keyDownHandler.bind(this), false);
        document.addEventListener('keyup', this.keyUpHandler.bind(this), false);
    }

    update(canvas){
        this.clearCanvas(canvas);
        // Draw current game state
        const ctx = canvas.getContext('2d');
        this.playArea.draw(ctx);
        this.ball.draw(ctx);
        this.paddle.draw(ctx);
        const paddleSector = this.paddle.sector();
        // Calculate next game state
        this.ball.move();
        this.paddle.move({leftPressed: this.leftPressed, rightPressed: this.rightPressed});
        // Check boundaries
        if(this.playArea.center.distanceTo(this.ball.position) > this.playArea.radius - this.ball.radius){
            this.ball.velocity.x *= -1;
            this.ball.velocity.y *= -1;
            if(!ctx.isPointInPath(paddleSector, this.ball.position.x, this.ball.position.x)){
                this.gameState = gameState.GAME_OVER;
            }
        }
    }

    clearCanvas(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }   

    keyDownHandler(event) {
        if(event.keyCode == 39) {
            this.rightPressed = true;
        }
        else if(event.keyCode == 37) {
            this.leftPressed = true;
        }
    }

    keyUpHandler(event) {
        if(event.keyCode == 39) {
            this.rightPressed = false;
        }
        else if(event.keyCode == 37) {
            this.leftPressed = false;
        }
    }
}