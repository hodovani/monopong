import {radiansToDegrees} from './helpers';

export class Vector {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    distanceTo(vector) {
        return Math.sqrt((this.x - vector.x) * (this.x - vector.x) + (this.y - vector.y) * (this.y - vector.y));
    }
    toDeg(){
        var deltaX = this.x;
        var deltaY = this.y;
        var rad = Math.atan2(deltaY, deltaX); 
        var deg = radiansToDegrees(rad);
        return deg;
    }
}