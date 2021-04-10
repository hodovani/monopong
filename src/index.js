import { Game } from './game';

const canvas = document.querySelector('canvas');
const smallerDimension = Math.min(canvas.clientWidth, canvas.clientHeight);
const ctx = canvas.getContext('2d');
const scale = window.devicePixelRatio;

ctx.scale(scale, scale);
canvas.width = smallerDimension;
canvas.height = smallerDimension;

const game = new Game({
    size: smallerDimension,
});

function render(){
    game.update({canvas});
    window.requestAnimationFrame(render);
}

window.onload = function () {
    render();
}