const Questions = [
    {
        question: "Why JS is Considered Scripting Language?",
        ansBank: [
            { answer: "JavaScript is designed for server-side programming", isCorrect: false },
            { answer: "JavaScript is used to script the behavior of webpages in the browser", isCorrect: true },
            { answer: "JavaScript is not interpreted and requires compilation", isCorrect: false },
            { answer: "JavaScript runs exclusively on mobile applications", isCorrect: false }
        ]
    }, {
        question: "Is JS completely an OOP language?",
        ansBank: [
            { answer: "Yes, JavaScript is fully Object-Oriented with support for classes and inheritance", isCorrect: false },
            { answer: "No, JavaScript is a multi-paradigm language that supports both Object-Oriented and Functional programming", isCorrect: true },
            { answer: "No, JavaScript lacks object-related features and focuses only on functional programming", isCorrect: false },
            { answer: "No, JavaScript is limited to prototype-based inheritance and cannot be used for OOP", isCorrect: false }
        ]
    }, {
        question: "What is React?",
        ansBank: [
            { answer: "React is a JavaScript library for building user interfaces", isCorrect: true },
            { answer: "React is a backend framework for server-side development", isCorrect: false },
            { answer: "React is a database management system", isCorrect: false },
            { answer: "React is primarily used for creating reusable UI components", isCorrect: false } // Changed to false since there should be only one correct answer
        ]
    }, {
        question: "What is __proto__?",
        ansBank: [
            { answer: "__proto__ is the internal property that references the prototype of an object in JavaScript", isCorrect: true },
            { answer: "__proto__ is used to create new variables in JavaScript", isCorrect: false },
            { answer: "__proto__ is a method to handle DOM events in JavaScript", isCorrect: false },
            { answer: "__proto__ is unrelated to JavaScript and belongs to Python", isCorrect: false }
        ]
    },
    {
        question: "What is the main difference between Rest and Spread in JavaScript?",
        ansBank: [
            { answer: "Rest is used to collect multiple arguments or properties into a single variable, while Spread is used to unpack elements or properties from an array or object", isCorrect: true },
            { answer: "Rest is used only for arrays, while Spread is used only for objects", isCorrect: false },
            { answer: "Rest and Spread are interchangeable and used for the same purpose in JavaScript", isCorrect: false },
            { answer: "Rest is used for server-side programming, while Spread is used for client-side programming", isCorrect: false }
        ]
    }
]

const questionEle = document.querySelector(".question");
const answerBtn = document.querySelector(".inner-div:last-child");
const nextBtn = document.querySelector(".pagebut");
const totalScore = document.querySelector(".total-score");
const obtainedScore = document.querySelector(".obtained-score");

let currentQuestionIndex = 0;
let score = 0;

function startQuizz() {
    currentQuestionIndex = 0;
    score = 0;
    totalScore.textContent = Questions.length;
    obtainedScore.textContent = score;
    nextBtn.textContent = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = Questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionEle.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.ansBank.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.answer;
        button.classList.add("btn");
        answerBtn.appendChild(button);
        if (answer.isCorrect) {
            button.dataset.correct = answer.isCorrect;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextBtn.style.display = 'none';
    while (answerBtn.firstChild) {
        answerBtn.removeChild(answerBtn.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if (isCorrect) {
        score++;
        obtainedScore.textContent = score;
        selectedBtn.classList.add("correct");
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtn.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}

function showScore() {
    resetState();
    questionEle.innerHTML = `You Scored ${score} out of ${Questions.length}`;
    nextBtn.textContent = 'Play Again';
    nextBtn.style.display = "block";
}

function handleNextBtn() {
    currentQuestionIndex++;
    if (currentQuestionIndex < Questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < Questions.length) {
        handleNextBtn();
    } else {
        startQuizz();
    }
});

document.addEventListener("DOMContentLoaded", () => {
    startQuizz();
});