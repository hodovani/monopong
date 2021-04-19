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

export {degToVector, getNextPlayGameTime};