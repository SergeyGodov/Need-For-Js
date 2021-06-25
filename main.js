'use strict';
const MAX_ENEMY = 7;
const HEIGHT_ELEM = 100;
const score = document.querySelector('.score');
const game = document.querySelector('.game');
const gameArea = document.querySelector('.gameArea'),
car = document.createElement('div');
const music = new Audio('audio.mp3');
const music2 = new Audio('audio2.mp3');
car.classList.add('car');
const start = document.querySelector('.start');
const traffic = document.querySelector('.traffic');
const speed = document.querySelector('.speed');
let valueSpeed = document.querySelector('.value_speed');
valueSpeed = Number.parseInt(valueSpeed);
console.log(valueSpeed);
const keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
};
const setting = {
    start: false,
    score: 0,
    speed: 6,
    traffic: 2.5,
};


function getQuantityElements(heightElement) {
   return (gameArea.offsetHeight / heightElement) + 1;
}

function playGame(){
    if(setting.start) {
        setting.score += setting.speed;
        score.innerHTML = 'SCORE<br>' + setting.score;
        
       
        moveRoad();
        moveEnemy();
        if(keys.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed;
        }
        
        if(keys.ArrowRight && setting.x < (gameArea.offsetWidth - car.offsetWidth)) {
setting.x += setting.speed;
        }
        if(keys.ArrowUp && setting.y > 0){
setting.y -=setting.speed;
        }
        if(keys.ArrowDown && setting.y < (gameArea.offsetHeight - car.offsetHeight)){
            setting.y += setting.speed; 
        }
        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';


        requestAnimationFrame(playGame);
    }

}

const getRandomEnemy = (max) => Math.floor((Math.random() * max) + 1); 

function startGame(){
    gameArea.style.minWidth = 300 + 'px';
    start.classList.add('hide');
    traffic.classList.add('hide');
    speed.classList.add('hide');
    gameArea.innerHTML = '';
    car.style.left = '125px';
    car.style.top = 'auto';
    car.style.bottom = '10px';
music.play();
    for (let i = 0; i < getQuantityElements(HEIGHT_ELEM); i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.top = (i * HEIGHT_ELEM) + 'px';
        line.style.height = (HEIGHT_ELEM / 2) + 'px';
        line.y = i * HEIGHT_ELEM;
        gameArea.appendChild(line);
    }
    
    for (let i = 0; i < getQuantityElements(HEIGHT_ELEM * setting.traffic); i++) {
        const enemy = document.createElement('div');
        enemy.classList.add('enemy');
        enemy.y = -HEIGHT_ELEM * setting.traffic * (i + 1);
        enemy.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        enemy.style.top = enemy.y + 'px';
        enemy.style.background = `transparent url(./image/enemy${getRandomEnemy(MAX_ENEMY)}.png) center / cover 
        no-repeat`;
        gameArea.appendChild(enemy);
    }
    setting.score = 0;
    setting.start = true;
    gameArea.appendChild(car);
    setting.x = car.offsetLeft;
    setting.y = car.offsetTop;
    requestAnimationFrame(playGame);
   }

function startRun(event){
    if (keys.hasOwnProperty(event.key)) {
        event.preventDefault();
        keys[event.key] = true;
    }
   
}

function stopRun(event){
    if (keys.hasOwnProperty(event.key)) {
        event.preventDefault();
        keys[event.key] = false;
    }
   
}
function moveRoad() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function(line) {
line.y += setting.speed;
line.style.top = line.y + 'px';

if(line.y >= gameArea.offsetHeight) {
    line.y = -HEIGHT_ELEM;
}
    });
}

function moveEnemy() {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function(item){
        let carReact = car.getBoundingClientRect();
        let enemyReact = item.getBoundingClientRect();

        if (carReact.top <= enemyReact.bottom && 
            carReact.right >= enemyReact.left && 
            carReact.left <= enemyReact.right &&
            carReact.bottom >= enemyReact.top) {
    music.pause();
music2.play();
    
setting.start = false;
start.classList.remove('hide');
traffic.classList.remove('hide');
speed.classList.remove('hide');

        }
      item.y += setting.speed / 2;
      item.style.top = item.y + 'px';
      if (item.y >= gameArea.offsetHeight){
        item.y = -100 * setting.traffic;
        item.style.left = Math.floor(Math.random() * (gameArea.offsetWidth - 50)) + 'px';
        
    }
    });

   
}


start.addEventListener('click', startGame); 
document.addEventListener('keydown', startRun);
document.addEventListener('keyup', stopRun);

