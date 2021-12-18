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
}

buttonEl.addEventListener("click", timerStart);
buttonEl.addEventListener("click", wipeIt);

// function that removes the h2 and p and button from the page after the start btn is pressed

function wipeIt() {
  const titleEl = document.getElementById("quizTitle");
  const bodyEl = document.getElementById("quizBody");
  const btnEl = document.getElementById("startButton");

  titleEl.remove();
  bodyEl.remove();
  btnEl.remove();
}
