import {Vector} from './vector';

function degToVector({deg, speed = 1}){
    deg *= Math.PI / 180;
    return new Vector(speed * Math.cos(deg), 2 * Math.sin(deg));
};

export {degToVector};