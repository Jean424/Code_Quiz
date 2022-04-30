var questionArray = [
  {
    questionTitle: "What is JavaScript",
    a: "Programming Language",
    b: "Stylish Question Language",
    c: "Statement Question Language",
    correctAnswer: "a",
  },
  {
    questionTitle: "What is HTML?",
    a: "Cascading Style Sheet",
    b: "Colorful Style Sheet",
    c: "Hyper Text Markup Language",
    correctAnswer: "c",
  },
  {
    questionTitle: "What does CSS stand for?",
    a: "Common Style Sheet",
    b: "Cascading Style Sheet",
    c: "Computer Style Sheet",
    correctAnswer: "b",
  },
  {
    questionTitle: "Which language is used for styling web pages?",
    a: "HTML",
    b: "JQuery",
    c: "CSS",
    correctAnswer: "c",
  },
];

let quiz = document.getElementById("quiz");
let answerEls = document.querySelectorAll(".answer");
let questionEl = document.querySelector(".question");
let a_text = document.getElementById("a_text");
let b_text = document.getElementById("b_text");
let c_text = document.getElementById("c_text");
let submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("Start");
var timePara = document.querySelector("#timePara");
var myScoreBox = document.querySelector(".scoreBox");
var myFinalBox = document.querySelector("#finalBox");
var isPlaying = false;

let currentQuiz = 0;
let score = 0;
// need to add addEventlistener + my function
startBtn.addEventListener("click", startGame);

function startGame() {
  console.log(startGame);
  if (isPlaying) {
    return;
  }
  isPlaying = true;
  userGuessArray = [];
  timeLeft = 60;
  startTimer();
  loadQuiz();
}
function startTimer() {
  timePara.textContent = timeLeft;
  timer = setInterval(function () {
    if (isPlaying == false) {
      endTimer();
      clearInterval(timer);
      console.log("clearInterval");
    }
    console.log(timeLeft);
    timeLeft--;
    timePara.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      gameOver();
      isPlaying = false;
    }
  }, 1000);
}


function loadQuiz() {
  deselectAnswers();

  var currentQuizData = questionArray[currentQuiz];
  console.log(currentQuizData);
  console.log(questionEl);
  questionEl.innerText = currentQuizData.questionTitle;

  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
}

function deselectAnswers() {
  answerEls.forEach((answerEl) => (answerEl.checked = false));
}

function getSelected() {
  let answer;
  answerEls.forEach((answerEl) => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

submitBtn.addEventListener("click", () => {
  const answer = getSelected();
  if (answer) {
    if (answer === questionArray[currentQuiz].correctAnswer) {
      score++;
    }
    currentQuiz++;

    if (currentQuiz < questionArray.length) {
      loadQuiz();
    } else {
      gameOver();

    }
  }
});

function gameOver() {
  quiz.innerHTML = `
  <h2> You answered ${score}/${questionArray.length} question correctly </h2>
  <button onclick="location.reload()"> Restart Quiz</button>
  `;
  clearInterval(timer);
  myScoreBox.style.display = "block";

  myFinalBox.style.display = "block";
}

function storeData() {
  //build array
  //display  on the page
  //grabbing array from the local  storage
  var myScore = JSON.parse(localStorage.getItem("highScore")) || [];
  
  var takeInit = document.querySelector("#myInput").value;
  console.log(myScore);
  var currentScore = `Initials: ${takeInit}, Score: ${score}`;
  myScore.push(currentScore);
  console.log(currentScore);
  //add new data to array

  //storing new array in local storage
  localStorage.setItem("highScore", JSON.stringify(myScore));
  //displaying data on the page

  let text = JSON.parse(localStorage.getItem("highScore")) || [];
  console.log(text);
  document.getElementById("finalBox").innerHTML = text;
}