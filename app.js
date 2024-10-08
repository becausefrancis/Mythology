/*-------------------------------- Constants --------------------------------*/

const correctAudio = new Audio('audio/correct.wav');
const wrongAudio = new Audio('audio/wrong.mp3');

/*---------------------------- Variables (state) ----------------------------*/

let timer;
let score = 0;
let currentQuestionIndex = null;

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
        startCountdown(30);
    } else {
        displayEl.textContent = 'Click a square to start';
        timerEl.textContent = '';
        clearTimer();
    }
    checkGameOver();
};

const handleClick = (event) => {
    const index = event.target.dataset.index;
    if (mythologyCategories[index]) {
        currentQuestionIndex = index;
        render();
    }
    event.target.innerText = '';
};

const checkAnswer = () => {
    if (currentQuestionIndex === null) return;
    const userAnswer = answerInput.value.toLowerCase();
    const correctAnswer = mythologyCategories[currentQuestionIndex].answer.toLowerCase();
    if (userAnswer === correctAnswer) {
        score += mythologyCategories[currentQuestionIndex].point;
        correctAudio.play();
    } else {
        score -= mythologyCategories[currentQuestionIndex].point;
        wrongAudio.play();
    }
    scoreEl.textContent = `Score: ${score}`;
    answerInput.value = '';
    currentQuestionIndex = null
    render();
}

const startCountdown = (seconds) => {
    let counter = seconds;
    timerEl.textContent = `Time left: ${counter}`
    timer = setInterval(() => {
        counter--;
        timerEl.textContent = `Time left: ${counter}`
    if (counter <= 0) {
            clearInterval(timer);
            checkAnswer();
        }
    }, 1000);
};

const clearTimer = () => {
    if (timer) {
        clearInterval(timer);
        timer = null;
    }
};

const checkGameOver = () => {
    const allSquaresEmpty = Array.from(squareEls).every(squareEl => squareEl.textContent === '');
    if (allSquaresEmpty) {
        if (score >= 0) {
            displayEl.textContent = `Congrats, you have scored: ${score}.`;
        } else {
            displayEl.textContent = `Better luck next time! You have scored: ${score}.`;
        }
    }
};


init();
/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach((squareEl) => {
    squareEl.addEventListener('click', handleClick);
});

answerInput.addEventListener('change', checkAnswer);