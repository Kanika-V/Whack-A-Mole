const holes = document.querySelectorAll(".hole");
const scoreDisplay = document.querySelector(".score span");
const timerDisplay = document.createElement("h2");
let lastHole;
let score = 0;
let timeLeft = 60;
let gameInterval;
let countdownInterval;
timerDisplay.textContent = `TIME LEFT: ${timeLeft}s`;
timerDisplay.style.marginTop = "1em";
document.body.insertBefore(timerDisplay, document.querySelector(".board"));
function randomHole(holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];
  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function popUp() {
  const hole = randomHole(holes);
  const mole = document.createElement("img");
  mole.src = "mole.png"; // Corrected direct image URL
  mole.classList.add("mole");
  hole.appendChild(mole);
  mole.addEventListener("click", () => {
    score++;
    scoreDisplay.textContent = String(score).padStart(2, "0");
    hole.removeChild(mole);
  });

  setTimeout(() => {
    if (hole.contains(mole)) {
      hole.removeChild(mole);
    }
  }, 1000);
}

function startGame() {
  gameInterval = setInterval(popUp, 1000);
  countdownInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = `TIME LEFT: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(gameInterval);
      clearInterval(countdownInterval);
      timerDisplay.textContent = `TIME LEFT: 0s`;
      alert(`Time's up! Your final score is ${score}!`);
    }
  }, 1000);
}

document.addEventListener("click", function () {
  if (document.body.style.backgroundColor === "rgb(52, 33, 38)") {
    document.body.style.backgroundColor = "#2b0018";
  } else {
    document.body.style.backgroundColor = "#342126";
  }
});

startGame();
