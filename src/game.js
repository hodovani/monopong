import {Ball} from './ball';
import {PlayArea} from './playArea';
import {Paddle} from './paddle';
import {Vector} from './vector';
import {gameState} from './gameState';
import {getRandomInt} from './getRandomInt';
import {degToVector} from './helpers';

export class Game {
    constructor({size}){
        this.size = size;
        this.radius = this.size / 2.3;
        this.center = this.size / 2;
        this.x0 = this.center;
        this.y0 = this.center;
        this.rightPressed = false;
        this.leftPressed = false;
        this.state = gameState.INITIAL;

        this.ball = new Ball(new Vector(this.x0, this.y0), new Vector(1, 1), this);
        this.playArea = new PlayArea({center: this.center, radius: this.radius});
        this.paddle = new Paddle({center: this.center, radius: this.radius});
        
        document.addEventListener('keydown', this.keyDownHandler.bind(this), false);
        document.addEventListener('keyup', this.keyUpHandler.bind(this), false);
    }

    update({canvas}){
        switch(this.state){
            case gameState.INITIAL:
                this.updateInitialState();
                break;
            case gameState.PLAYING:
                this.updatePlaying(canvas);
                break;
        }
    }

    updateInitialState(){
        this.ball = new Ball(new Vector(this.x0, this.y0));
    }

    updatePlaying(canvas){
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
            const velocityDeg = this.ball.velocity.toDeg();
            const newVelocityDeg = velocityDeg + 180 + getRandomInt(-20, 20);
            const newVelocity = degToVector({deg: newVelocityDeg});
            this.ball.velocity = newVelocity;
            if(!ctx.isPointInPath(paddleSector, this.ball.position.x, this.ball.position.y)){
                this.state = gameState.INITIAL;
            }
        }
    }

    clearCanvas(canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }   

    keyDownHandler(event) {
        if(event.keyCode === 39) {
            this.rightPressed = true;
        }
        else if(event.keyCode === 37) {
            this.leftPressed = true;
        }
    }

    keyUpHandler(event) {
        if(event.keyCode === 39) {
            this.rightPressed = false;
        }
        else if(event.keyCode === 37) {
            this.leftPressed = false;
        }

        if((event.keyCode === 39 || event.keyCode === 37) && this.state === gameState.INITIAL){
            this.state = gameState.PLAYING;
        }
    }
}