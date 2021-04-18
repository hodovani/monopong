import {getRandomInt} from './getRandomInt';
import {degToVector} from './helpers';

export class Ball {
    constructor(position, velocity) {
        this.position = position;
        const defaultDegree = getRandomInt(0,360);
        this.velocity = velocity || degToVector({deg: defaultDegree});
        this.radius = 10;
    }
    move(){
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
    draw(ctx){
        ctx.beginPath();
        ctx.fillStyle = '#000';
        ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}
