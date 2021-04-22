import { Game } from './game';
import './index.css';

const canvas = document.querySelector('canvas');
const countDownElement = document.querySelector('#counting-down');
const smallerDimension = Math.min(canvas.clientWidth, canvas.clientHeight);
const ctx = canvas.getContext('2d');
const scale = window.devicePixelRatio || 1;

canvas.width = smallerDimension;
canvas.height = smallerDimension;
canvas.width = canvas.width * scale;
canvas.height = canvas.height * scale;
ctx.scale(scale, scale);

const game = new Game({
    size: smallerDimension,
    countDownElement,
    canvas
});

function render(){
    game.update({canvas});
    window.requestAnimationFrame(render);
}

window.onload = function () {
    render();
}