import { Game } from './game';

const canvas = document.querySelector('canvas');

const game = new Game({
    size: canvas.width
});

function render(){
    game.update(canvas);
    window.requestAnimationFrame(render);
}

window.onload = function () {
    render();
}