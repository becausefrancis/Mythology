/*-------------------------------- Constants --------------------------------*/

const mythologyCategories = require('./data.js');

/*---------------------------- Variables (state) ----------------------------*/

let board;
let timer;
let answer;
let score = 0;
let answerMatched = false;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const displayEl = document.getElementById('display');
const scoreEl = document.getElementById('score');

/*-------------------------------- Functions --------------------------------*/

const init = () => {
    board = [
        '100', '100', '100', '100', '100',
        '200', '200', '200', '200', '200',
        '300', '300', '300', '300', '300',
        '400', '400', '400', '400', '400',
        '500', '500', '500', '500', '500',
    ];
    render();
};

const render = () => {

};



const handleClick = (event) => {
    const squareIdx = event.target.id;
   
};

const startCountdown = (seconds) => {
    let counter = seconds;
    const interval = setInterval(() => {
        counter--;
    if (counter < 0) {
            clearInterval(interval);
        }
    }, 30 * 1000);
};

const updateScore = () => {
    if (answerMatched) {
        score += mythologyCategories.point;
    }
};

init();
/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((squareEl) => {
    squareEl.addEventListener('click', handleClick);
});