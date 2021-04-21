/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ball.js":
/*!*********************!*\
  !*** ./src/ball.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ball": () => (/* binding */ Ball)
/* harmony export */ });
/* harmony import */ var _getRandomInt__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getRandomInt */ "./src/getRandomInt.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers */ "./src/helpers.js");



class Ball {
    constructor(position, velocity) {
        this.position = position;
        const defaultDegree = (0,_getRandomInt__WEBPACK_IMPORTED_MODULE_0__.getRandomInt)(0,360);
        this.velocity = velocity || (0,_helpers__WEBPACK_IMPORTED_MODULE_1__.degToVector)({deg: defaultDegree});
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


/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Game": () => (/* binding */ Game)
/* harmony export */ });
/* harmony import */ var _ball__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ball */ "./src/ball.js");
/* harmony import */ var _playArea__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./playArea */ "./src/playArea.js");
/* harmony import */ var _paddle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./paddle */ "./src/paddle.js");
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./vector */ "./src/vector.js");
/* harmony import */ var _gameState__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./gameState */ "./src/gameState.js");
/* harmony import */ var _getRandomInt__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getRandomInt */ "./src/getRandomInt.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./helpers */ "./src/helpers.js");








class Game {
    constructor({size, countDownElement, canvas}){
        this.canvas = canvas;
        this.size = size;
        this.radius = this.size / 2.3;
        this.center = this.size / 2;
        this.x0 = this.center;
        this.y0 = this.center;
        this.rightPressed = false;
        this.leftPressed = false;
        this.isTouch = false;
        this.touchPosition = undefined;
        this.state = _gameState__WEBPACK_IMPORTED_MODULE_4__.gameState.COUNTING_DOWN;
        this.countDown = (0,_helpers__WEBPACK_IMPORTED_MODULE_6__.getNextPlayGameTime)();
        this.countDownElement = countDownElement;

        this.ball = new _ball__WEBPACK_IMPORTED_MODULE_0__.Ball(new _vector__WEBPACK_IMPORTED_MODULE_3__.Vector(this.x0, this.y0), new _vector__WEBPACK_IMPORTED_MODULE_3__.Vector(1, 1), this);
        this.playArea = new _playArea__WEBPACK_IMPORTED_MODULE_1__.PlayArea({center: this.center, radius: this.radius});
        this.paddle = new _paddle__WEBPACK_IMPORTED_MODULE_2__.Paddle({center: this.center, radius: this.radius});
        
        document.addEventListener('keydown', this.keyDownHandler.bind(this), false);
        document.addEventListener('keyup', this.keyUpHandler.bind(this), false);
        document.addEventListener("touchstart", this.touchStart.bind(this), false);
        document.addEventListener("touchmove", this.touchMove.bind(this), false);
        document.addEventListener("touchend", this.touchEnd.bind(this), false);
        document.addEventListener("touchcancel", this.touchEnd.bind(this), false);
        document.addEventListener("scroll", (e) => {
            e.preventDefault();
            window.scrollTo(0, 0);
        });

        this.canvas.classList.add('hidden');
        this.countDownElement.classList.remove('hidden');
    }

    update({canvas}){
        switch(this.state){
            case _gameState__WEBPACK_IMPORTED_MODULE_4__.gameState.COUNTING_DOWN:
                this.updateCountingDownState(canvas);
                break;
            case _gameState__WEBPACK_IMPORTED_MODULE_4__.gameState.INITIAL:
                this.updateInitialState();
                break;
            case _gameState__WEBPACK_IMPORTED_MODULE_4__.gameState.PLAYING:
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
            this.state = _gameState__WEBPACK_IMPORTED_MODULE_4__.gameState.INITIAL;
        }
    }

    updateInitialState(){
        this.ball = new _ball__WEBPACK_IMPORTED_MODULE_0__.Ball(new _vector__WEBPACK_IMPORTED_MODULE_3__.Vector(this.x0, this.y0));
        this.state = _gameState__WEBPACK_IMPORTED_MODULE_4__.gameState.PLAYING;
    }

    updatePlaying(canvas){
        this.clearCanvas(canvas);

        if(this.isTouch){
            this.touchHandler();
        }

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
            const newVelocityDeg = velocityDeg + 180 + (0,_getRandomInt__WEBPACK_IMPORTED_MODULE_5__.getRandomInt)(-20, 20);
            const newVelocity = (0,_helpers__WEBPACK_IMPORTED_MODULE_6__.degToVector)({deg: newVelocityDeg});
            this.ball.velocity = newVelocity;
            if(!ctx.isPointInPath(paddleSector, this.ball.position.x, this.ball.position.y)){
                this.clearCanvas(canvas);
                this.countDown = (0,_helpers__WEBPACK_IMPORTED_MODULE_6__.getNextPlayGameTime)();
                this.canvas.classList.add('hidden');
                this.countDownElement.classList.remove('hidden');
                this.state = _gameState__WEBPACK_IMPORTED_MODULE_4__.gameState.COUNTING_DOWN;
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

        if((event.keyCode === 39 || event.keyCode === 37) && this.state === _gameState__WEBPACK_IMPORTED_MODULE_4__.gameState.INITIAL){
            this.state = _gameState__WEBPACK_IMPORTED_MODULE_4__.gameState.PLAYING;
        }
    }

    touchStart(event){
        console.log('Touch start');
        this.isTouch = true;
        const touchY = event.touches[0].pageY - document.body.scrollHeight/2;
        const touchX = event.touches[0].pageX - document.body.scrollWidth/2;
        this.touchPosition = new _vector__WEBPACK_IMPORTED_MODULE_3__.Vector(touchX, touchY);
        event.preventDefault();
        event.stopPropagation();
    }

    touchEnd(){
        console.log('Touch end');
        this.isTouch = false;
        this.touchPosition = undefined;
        this.leftPressed = false;
        this.rightPressed = false;
    }

    touchMove(event){
        console.log('Touch move');
        const touchY = event.touches[0].pageY - document.body.scrollHeight/2;
        const touchX = event.touches[0].pageX - document.body.scrollWidth/2;
        this.touchPosition = new _vector__WEBPACK_IMPORTED_MODULE_3__.Vector(touchX, touchY);
        event.preventDefault();
        event.stopPropagation();
    }

    touchHandler(){
        console.log('Touch handler');
        const touchY = this.touchPosition.y;
        const touchX = this.touchPosition.x;
        let angle = Math.atan2(touchY, touchX);
        if (angle < 0) { angle += 2 * Math.PI; }
        const touchDeg = (0,_helpers__WEBPACK_IMPORTED_MODULE_6__.radiansToDegrees)(angle);
        let paddleAngle = this.paddle.angle;
        if (paddleAngle < 0) { paddleAngle += 2 * Math.PI; }
        const paddleDeg = (0,_helpers__WEBPACK_IMPORTED_MODULE_6__.radiansToDegrees)(paddleAngle);
        // console.log(touchDeg);
        // console.log(paddleDeg);
        let diff = (touchDeg - paddleDeg + 180) % 360 - 180;
        if(Math.abs(diff) > 1){
            if(Math.sign(diff) < 0){
                this.rightPressed = true;
                this.leftPressed = false;
            } else {
                this.rightPressed = false;
                this.leftPressed = true;
            }
        }else {
            this.leftPressed = false;
            this.leftPressed = true;
        }
        
    }
}

/***/ }),

/***/ "./src/gameState.js":
/*!**************************!*\
  !*** ./src/gameState.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "gameState": () => (/* binding */ gameState)
/* harmony export */ });
const gameState = {
    COUNTING_DOWN: 'COUNTING_DOWN',
    INITIAL: 'INITIAL',
    PLAYING: 'PLAYING',
};


/***/ }),

/***/ "./src/getRandomInt.js":
/*!*****************************!*\
  !*** ./src/getRandomInt.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomInt": () => (/* binding */ getRandomInt)
/* harmony export */ });
const getRandomInt = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}



/***/ }),

/***/ "./src/helpers.js":
/*!************************!*\
  !*** ./src/helpers.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "degToVector": () => (/* binding */ degToVector),
/* harmony export */   "getNextPlayGameTime": () => (/* binding */ getNextPlayGameTime),
/* harmony export */   "radiansToDegrees": () => (/* binding */ radiansToDegrees)
/* harmony export */ });
/* harmony import */ var _vector__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector */ "./src/vector.js");


function degToVector({deg, speed = 1}){
    deg *= Math.PI / 180;
    return new _vector__WEBPACK_IMPORTED_MODULE_0__.Vector(speed * Math.cos(deg), 2 * Math.sin(deg));
};

function getNextPlayGameTime(){
    const date = new Date();
    date.setSeconds(date.getSeconds() + 3);
    return date;
}

function radiansToDegrees(radians){
    return (radians * (180/Math.PI)) % 360;
}



/***/ }),

/***/ "./src/paddle.js":
/*!***********************!*\
  !*** ./src/paddle.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Paddle": () => (/* binding */ Paddle)
/* harmony export */ });
/* harmony import */ var _vector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector.js */ "./src/vector.js");


class Paddle {
    constructor({radius, center}) {
        this.radius = radius;
        this.center = center;
        this.angle = 0;
        this.direction = 0;
        this.size = 0.1;
        this.speed = 0.009;
    }
    move({rightPressed, leftPressed}){
        if(rightPressed && !leftPressed){
            this.direction = -1;
        } else if(!rightPressed && leftPressed){
            this.direction = 1;
        } else {
            this.direction = 0;
        }

        this.angle += this.direction * this.speed * Math.PI;
    }
    draw(ctx){
        const paddle = new Path2D();
        paddle.arc(this.center, this.center, this.radius, this.angle - this.size, this.angle + this.size);
        ctx.fillStyle = '#000';
        ctx.strokeStyle = 'rgba(0,0,0,1)';
        ctx.lineWidth = 3;
        ctx.setLineDash([]);
        ctx.stroke(paddle);
    }
    sector(){
        const sector = new Path2D();
        sector.moveTo(this.center, this.center);
        sector.arc(this.center, this.center, this.radius, this.angle - this.size, this.angle + this.size);
        sector.lineTo(this.center, this.center);
        return sector;
    }
}


/***/ }),

/***/ "./src/playArea.js":
/*!*************************!*\
  !*** ./src/playArea.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PlayArea": () => (/* binding */ PlayArea)
/* harmony export */ });
/* harmony import */ var _vector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./vector.js */ "./src/vector.js");


class PlayArea {
    constructor({center, radius}) {
        this.radius = radius;
        this.center = new _vector_js__WEBPACK_IMPORTED_MODULE_0__.Vector(center, center); 
    }
    draw(ctx){
        ctx.beginPath();
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 16]);
        ctx.lineDashOffset = 5;
        ctx.strokeStyle = 'rgba(0,0,0,0.3)';
        ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI, false);
        ctx.stroke();
    }
}


/***/ }),

/***/ "./src/vector.js":
/*!***********************!*\
  !*** ./src/vector.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Vector": () => (/* binding */ Vector)
/* harmony export */ });
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers */ "./src/helpers.js");


class Vector {
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
        var deg = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.radiansToDegrees)(rad);
        return deg;
    }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ "./src/game.js");


const canvas = document.querySelector('canvas');
const countDownElement = document.querySelector('#counting-down');
const smallerDimension = Math.min(canvas.clientWidth, canvas.clientHeight);
const ctx = canvas.getContext('2d');
const scale = window.devicePixelRatio;

ctx.scale(scale, scale);
canvas.width = smallerDimension;
canvas.height = smallerDimension;

const game = new _game__WEBPACK_IMPORTED_MODULE_0__.Game({
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
})();

/******/ })()
;
//# sourceMappingURL=main.js.map