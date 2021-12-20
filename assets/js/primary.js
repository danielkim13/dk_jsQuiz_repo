const buttonEl = document.querySelector("#startButton");
let timeLeft = 60;
let questionArrayIndex = 0; //without this the loop only displays the last question on the page.
let timeInterval;
let score;

// write a function where the btn is clicked and timer starts
let timerEl = document.getElementById("timerBox");
function timerStart() {
  //   ! ensure the timeLeft value back 60 seconds!!
  timerEl.className = "timer-box";
  timeInterval = setInterval(function () {
    if (timeLeft > 0) {
      timerEl.textContent = "Time:  " + timeLeft;
      timeLeft--;
    } else {
      timerEl.textContent = "Time is Up";
      clearInterval(timeInterval);
      //   TODO send the page to where user can enter name and leads to score
    }
  }, 1000);

  quizPrompt(questionArrayIndex); //as timer begin, it calls for quizPrompt function
}

buttonEl.addEventListener("click", timerStart); //timer start event
buttonEl.addEventListener("click", wipeIt); //wiping the first page info event

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

const quizTitleEl = document.getElementById("quizContainer"); //using it for end page as well
const quizQEl = document.createElement("h2"); //using this var in different function
const answerEl = document.createElement("ul"); //using this var in different function
const selectionListEl1 = document.createElement("li"); //if i make this to local var, questions get added onto the page. need to be global to remove
const selectionListEl2 = document.createElement("li"); //if i make this to local var, questions get added onto the page. need to be global to remove
const selectionListEl3 = document.createElement("li"); //if i make this to local var, questions get added onto the page. need to be global to remove
// Giving credit to Rhea Malviya for helping me with not doing for loop method but the call on the function as arrayIndex increase. Initial attempt was to do it with for loop method but couldn't figure it out.
function quizPrompt(questionArrayIndex) {
  // create h2 element in the quiz container div
  quizTitleEl.appendChild(quizQEl);
  quizQEl.setAttribute("class", "quiz-title"); // for styling purpose
  quizQEl.textContent = quizArray[questionArrayIndex].question; //display the question on the page

  quizTitleEl.appendChild(answerEl); // in quiz container div, create ul element where list of answers to go into
  //   creating the list of answer option elements
  answerEl.appendChild(selectionListEl1); // first answer option
  selectionListEl1.setAttribute("class", "answer-selection"); //styling purpose
  selectionListEl1.textContent = quizArray[questionArrayIndex].options[0]; // first answer option

  answerEl.appendChild(selectionListEl2); // second answer option
  selectionListEl2.setAttribute("class", "answer-selection"); //styling purpose
  selectionListEl2.textContent = quizArray[questionArrayIndex].options[1]; // second answer option

  answerEl.appendChild(selectionListEl3); // third answer option
  selectionListEl3.setAttribute("class", "answer-selection"); //styling purpose
  selectionListEl3.textContent = quizArray[questionArrayIndex].options[2]; // third answer option

  // create eventListener in order for the answer options behaves when clicked.
  selectionListEl1.addEventListener("click", answerHandler);
  selectionListEl2.addEventListener("click", answerHandler);
  selectionListEl3.addEventListener("click", answerHandler);
}

// make the list clickable and compare answers.
function answerHandler(event) {
  const answerResultEl = document.createElement("p"); //need to remove it so made it global
  const targetEl = event.target;
  const sectionEl = document.querySelector(".quiz-overall-container");

  answerResultEl.setAttribute("class", "answer-result");
  sectionEl.appendChild(answerResultEl);
  // comparing answers to see if it was correct or wrong.
  if (targetEl.textContent == quizArray[questionArrayIndex].answer) {
    answerResultEl.textContent = "Correct Answer!";
  }
  if (targetEl.textContent !== quizArray[questionArrayIndex].answer) {
    answerResultEl.textContent = "Wrong Answer!";
    timeLeft += -5;
  }

  setTimeout(() => {
    answerResultEl.style.display = "none";
  }, 400);

  // increase the index so another question can be presented
  questionArrayIndex++;
  // if and else statement to figure out if more quiz left or finish.
  if (questionArrayIndex <= quizArray.length - 1) {
    quizQEl.remove();
    answerEl.remove();

    quizPrompt(questionArrayIndex);
  }
  if (questionArrayIndex === quizArray.length) {
    done();
  }
}
// end of the quiz page
function done() {
  clearInterval(timeInterval);
  timerEl.style.display = "none";
  quizQEl.remove();
  answerEl.remove();

  const endTitle = document.createElement("h1");
  const yourScore = document.createElement("p");

  endTitle.className = "quiz-title";
  yourScore.className = "quiz-body";

  quizTitleEl.appendChild(endTitle);
  quizTitleEl.appendChild(yourScore);

  //   page displays
  endTitle.textContent = "You are finished. Good job!";
  yourScore.textContent = "Score: " + timeLeft;

  //   initials area for local storage
  const initialContainer = document.createElement("div");
  quizTitleEl.appendChild(initialContainer);
  initialContainer.className = "quiz-body";

  initialBox = document.createElement("input");
  initialContainer.appendChild(initialBox);
  initialBox.setAttribute("placeholder", "Your Initials");
  initialBox.setAttribute("type", "text");
  initialBox.setAttribute("class", "initial");

  const submitBtn = document.createElement("button");
  initialContainer.appendChild(submitBtn);
  submitBtn.setAttribute("class", "start-btn");
  submitBtn.setAttribute("type", "submit");
  submitBtn.textContent = "Submit";

  submitBtn.addEventListener("click", addScore);
}

let initialBox;

function addScore() {
  let initials = initialBox.value;

  if (initials === "" || initials === null) {
    alert("You need to enter a valid initials");
    return;
  } else {
    // Class instructor and TA provided below info
    let highScore = JSON.parse(localStorage.getItem("highScore"));
    if (highScore === null) {
      highScore = [];
    } else {
      let score = {
        initials: initials,
        score: timeLeft,
      };
      highScore.push(score);
    //   console.log(highScore);
    }

    localStorage.setItem("highScore", JSON.stringify(highScore));
  }

  highScorePage();
}

function highScorePage() {
    window.open
}

