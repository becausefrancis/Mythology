/*-------------------------------- Constants --------------------------------*/

const mythologyCategories = require('./data.js');

/*---------------------------- Variables (state) ----------------------------*/

let timer;
let score = 0;
let currentQuestionIndex = null;
let squareIndex = null;

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
const displayEl = document.getElementById('display');
const scoreEl = document.getElementById('score');
const timerEl = document.getElementById('timer');
const answerInput = document.querySelector('#inputarea input');

/*-------------------------------- Functions --------------------------------*/

const init = () => {
    scoreEl.textContent = `Score: ${score}`;
    squareEls.forEach((squareEl, index) => {
      squareEl.dataset.index = index;
      squareEl.addEventListener('click', handleClick);
    });
    render();
};

const render = () => {
    if (currentQuestionIndex !== null) {
        displayEl.textContent = mythologyCategories[currentQuestionIndex].question;
    } else {
        displayEl.textContent = 'Click a square to start';
    }
};

const handleClick = (event) => {
    const index = event.target.dataset.index;
    if (mythologyCategories[index]) {
        currentQuestionIndex = index;
        render();
    }
};

const checkAnswer = () => {
    const userAnswer = answerInput.value.toLowerCase();
    const correctAnswer = mythologyCategories[currentQuestionIndex].answer.toLowerCase();
    if (userAnswer === correctAnswer) {
        score += mythologyCategories[currentQuestionIndex].point;
    } else {
        score -= mythologyCategories[currentQuestionIndex].point;
    }
    scoreEl.textContent = `Score: ${score}`;
    answerInput.value = '';
}

const startCountdown = (seconds) => {
    let counter = seconds;
    timer = setInterval(() => {
        counter--;
    if (counter <= 0) {
            clearInterval(timer);
            checkAnswer();
        }
    }, 30 * 1000);
    timerEl.textContent = `Time left: ${counter}`;
};


init();
/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((squareEl) => {
    squareEl.addEventListener('click', handleClick);
});

answerInput.addEventListener('change', checkAnswer);