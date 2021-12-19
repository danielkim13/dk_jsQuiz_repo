const buttonEl = document.querySelector("#startButton");

// write a function where the btn is clicked and timer starts
function timerStart() {
  const timerEl = document.getElementById("timerBox");
  //   ! ensure the timeLeft value back 60 seconds!!
  let timeLeft = 5;
  timerEl.className = "timer-box";
  const timeInterval = setInterval(function () {
    if (timeLeft > 0) {
      timerEl.textContent = "Time:  " + timeLeft;
      timeLeft--;
    } else {
      timerEl.textContent = "Time is Up";
      clearInterval(timeInterval);
      //   TODO send the page to where user can enter name and leads to score
    }
  }, 1000);

  quizPrompt();
}

buttonEl.addEventListener("click", timerStart); //timer start event
buttonEl.addEventListener("click", wipeIt); //wiping the first page info event
// buttonEl.addEventListener("click", quizPrompt); //prompting quiz event

// function that removes the h2 and p and button from the page after the start btn is pressed

function wipeIt() {
  const titleEl = document.getElementById("quizTitle");
  const bodyEl = document.getElementById("quizBody");
  const btnEl = document.getElementById("btnContainer");

  titleEl.remove();
  bodyEl.remove();
  btnEl.remove();
}

// quiz questions in array format. object of arrays might work. let's try try it.
const quizArray = [
  {
    question: "Which is not valid data type in javascript?",
    options: ["Undefined", "Number", "Float"],
    answer: "Float",
  },
  {
    question: "Which tag is used to write the javascript code?",
    options: ["<script>", "<javascript>", "<java>"],
    answer: "<script>",
  },
  {
    question: "Why so JavaScript and Java have similar name?",
    options: ["They both originated on the island of Java", "JavaScript's syntax is loosely based on Java's", "Both a and b"],
    answer: "JavaScript's syntax is loosely based on Java's",
  },
  {
    question: "JavaScript is a ______-side programming language.",
    options: ["Client", "Server", "Both a and b"],
    answer: "Both a and b",
  },
  {
    question: "Which of the dialog box display a message and a data entry field?",
    options: ["alert()", "prompt()", "confirm()"],
    answer: "prompt()",
  },
];

// prompting the page after clicking the begin btn.
let questionArrayIndex = 0; //without this the loop only displays the last question on the page.

function quizPrompt() {
  const quizTitleEl = document.getElementById("quizContainer");
  const quizQEl = document.createElement("h2");
  const answerEl = document.createElement("ul");
  const firstAnswer = document.createElement("li");
  const secondAnswer = document.createElement("li");
  const thirdAnswer = document.createElement("li");

  quizQEl.setAttribute("class", "quiz-title");
  //   answerEl.setAttribute("class", "answer-selection");
  quizTitleEl.appendChild(quizQEl); //quiz question in h2 tag in the quiz container div
  quizTitleEl.appendChild(answerEl); // in quiz container div, create ul element where list of answers to go into
  firstAnswer.setAttribute("class", "answer-selection");
  secondAnswer.setAttribute("class", "answer-selection");
  thirdAnswer.setAttribute("class", "answer-selection");

  for (let i = 0; i < quizArray.length; i++) {
    let currentQuestion = quizArray[questionArrayIndex].question;
    quizQEl.textContent = currentQuestion;

    answerEl.appendChild(firstAnswer);
    answerEl.appendChild(secondAnswer);
    answerEl.appendChild(thirdAnswer);

    firstAnswer.textContent = quizArray[questionArrayIndex].options[0];
    secondAnswer.textContent = quizArray[questionArrayIndex].options[1];
    thirdAnswer.textContent = quizArray[questionArrayIndex].options[2];
  }

  answerHandler();
  questionArrayIndex++;
}

var answerHandler = function () {
     
};
