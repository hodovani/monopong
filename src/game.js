import {Ball} from './ball';
import {PlayArea} from './playArea';
import {Paddle} from './paddle';
import {Vector} from './vector';
import {gameState} from './gameState';
import {getRandomInt} from './getRandomInt';
import {degToVector, getNextPlayGameTime} from './helpers';

export class Game {
    constructor({size, countDownElement, canvas}){
        this.canvas = canvas;
        this.size = size;
        this.radius = this.size / 2.3;
        this.center = this.size / 2;
        this.x0 = this.center;
        this.y0 = this.center;
        this.rightPressed = false;
        this.leftPressed = false;
        this.state = gameState.COUNTING_DOWN;
        this.countDown = getNextPlayGameTime();
        this.countDownElement = countDownElement;

        this.ball = new Ball(new Vector(this.x0, this.y0), new Vector(1, 1), this);
        this.playArea = new PlayArea({center: this.center, radius: this.radius});
        this.paddle = new Paddle({center: this.center, radius: this.radius});
        
        document.addEventListener('keydown', this.keyDownHandler.bind(this), false);
        document.addEventListener('keyup', this.keyUpHandler.bind(this), false);
        this.canvas.classList.add('hidden');
        this.countDownElement.classList.remove('hidden');
    }

    update({canvas}){
        switch(this.state){
            case gameState.COUNTING_DOWN:
                this.updateCountingDownState(canvas);
                break;
            case gameState.INITIAL:
                this.updateInitialState();
                break;
            case gameState.PLAYING:
                this.updatePlaying(canvas);
                break;
        }
    }

    updateCountingDownState(){
        const currentDate = new Date();
        const diffMiliseconds = currentDate - this.countDown;
        const seconds = parseInt(Math.floor(diffMiliseconds / 1000));
        if(currentDate < this.countDown){
            this.countDownElement.innerHTML = `${'😢'.repeat(Math.abs(seconds))}`;
        } else {
            this.canvas.classList.remove('hidden');
            this.countDownElement.classList.add('hidden');
            this.state = gameState.INITIAL;
        }
    }

    updateInitialState(){
        this.ball = new Ball(new Vector(this.x0, this.y0));
        this.state = gameState.PLAYING;
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
                this.clearCanvas(canvas);
                this.countDown = getNextPlayGameTime();
                this.canvas.classList.add('hidden');
                this.countDownElement.classList.remove('hidden');
                this.state = gameState.COUNTING_DOWN;
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