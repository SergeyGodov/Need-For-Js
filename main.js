'use strict';
const score = document.querySelector('.score');
const game = document.querySelector('.game');
const gameArea = document.querySelector('.gameArea'),
car = document.createElement('div');
car.classList.add('car');
const start = document.querySelector('.start');
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};
const setting = {
    start: false,
    score: 0,
    speed: 3
};

function playGame(){
    console.log('Play game');
    if(setting.start) {
        requestAnimationFrame(playGame);

    }
}

function startGame(){
    start.classList.add('hide');
    setting.start = true;
    gameArea.appendChild(car);
    requestAnimationFrame(playGame);
   }

function startRun(event){
    event.preventDefault();
    keys[event.key] = true;
}

function stopRun(event){
    event.preventDefault();
    keys[event.key] = false;
}

start.addEventListener('click', startGame); 
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

