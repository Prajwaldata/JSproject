const questions = [
  {
    question: "Which one is the largest Animal?",
    answers: [
      {text: "Shark", correct: false},
      {text: "Blue Whale",correct: true},
      {text: "Giraf", correct: false},
      {text: "Elephant",correct: false},
    ],
  },
  {
    question: "Which one is the National Language Of India?",
    answers: [
      {text: "Tamil",correct: false},
      {text: "Hindi",correct: false},
      {text: "None of the Above",correct: false},
      {text: "Dosen't have one",correct: true},
    ],
  },
  {
    question: "WHich one is the largest mamall on the earth?",
    answers: [
      {text: "Shark",correct: false},
      {text: "Blue Whale",correct: true},
      {text: "Giraf",correct: false},
      {text: "Elephant",correct: false},
    ],
  },
  {
    question: "Which one is the largest Largest Bird on the Earth?",
    answers: [
      {text: "Ostrich",correct: true},
      {text: "Emu",correct: false},
      {text: "Penguin",correct: false},
      {text: "Swan", correct: false},
    ],
  },
];

const questionEle = document.getElementById("question");
const answerBtn = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuizz()
{
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML="Next";
    showQuestion();
}

function showQuestion(){
  resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex +1;
   questionEle.innerHTML = questionNo + ", " + currentQuestion.question;

   currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtn.appendChild(button);
    if(answer.correct)
    {
      button.dataset.correct=answer.correct;
    }
    button.addEventListener("click", selectAnswer);
   });
}
function resetState()
{
  nextBtn.style.display='none';
  while(answerBtn.firstChild)
  {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

function selectAnswer(e)
{
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';
  if(isCorrect)
  {
    score++;
    selectedBtn.classList.add("correct");
  }
  else
  {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerBtn.children).forEach(button=>{
    if(button.dataset.correct === "true")
    {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
}

function showScore()
{
  resetState();
  questionEle.innerHTML= `You Scored ${score} out of ${questions.length} `
  nextBtn.innerHTML='Play Again';
  nextBtn.style.display = "block";
}

function handleNextBtn()
{
  currentQuestionIndex++;
  if(currentQuestionIndex<questions.length)
  {
    showQuestion();
  }
  else
  {
    showScore();
  }
}

nextBtn.addEventListener('click',()=>{
  if(currentQuestionIndex < questions.length)
  {
    handleNextBtn();
  }
  else{
    startQuizz();
  }
})
document.addEventListener("DOMContentLoaded", () => {
  startQuizz(); // Make sure this function runs only after the DOM loads
});