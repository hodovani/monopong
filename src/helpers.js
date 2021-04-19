import {Vector} from './vector';

function degToVector({deg, speed = 1}){
    deg *= Math.PI / 180;
    return new Vector(speed * Math.cos(deg), 2 * Math.sin(deg));
};

function getNextPlayGameTime(){
    const date = new Date();
    date.setSeconds(date.getSeconds() + 3);
    return date;
}

function radiansToDegrees(radians){
    return (radians * (180/Math.PI)) % 360;
}

export {degToVector, getNextPlayGameTime, radiansToDegrees};