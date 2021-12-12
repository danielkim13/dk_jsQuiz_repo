// write a function where the btn is clicked and timer starts

const buttonEl = document.querySelector("#startButton");
buttonEl.addEventListener("click", timerStart);

function timerStart() {
  const timerEl = document.getElementById("timer-box");
  let timeLeft = 60;
  timerEl.className = "font-setting";
  const timeInterval = setInterval(function () {
    if (timeLeft > 0) {
      timerEl.textContent = timeLeft;
      timeLeft--;
    } else {
      timerEl.textContent = "Time is Up";
      clearInterval(timeInterval);
      //   TODO send the page to where user can enter name and leads to score
    }
  }, 1000);
}
