// variables to keep track of quiz state
var time = questions.length * 15;
var timerId;
var currentQuestionIndex = 0;

// variables to reference DOM elements
var startBtn = document.getElementById("start");
var timerEl = document.getElementById("time");
var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

// sound effects
var sfxRight = new Audio("Assets/sfx/correct.wav");
var sfxWrong = new Audio("Assets/sfx/incorrect.wav");

function startQuiz() {
  // hide start screen
  document.getElementById("start-screen").style.display = "none";
  // un-hide questions section
  questionsEl.style.display = "block";
  // questionsEl.removeAttribute("class");
  // start timer 
  timerId = setInterval(clockTick, 1000);
  // and show starting time
  timerEl.textContent = time;
  getQuestion();
}

function getQuestion() {
  // get current question object from array
  var currentQues = questions[currentQuestionIndex];
  // update title with current question
  document.getElementById("question-title").textContent = currentQues.title;
  // // clear out any old question choices
  choicesEl.innerHTML = "";
  // loop over choices
  for (var i = 0; i < currentQues.choices.length; i++) {
    // create new button for each choice
    var btn = document.createElement("button");
    btn.innerHTML = currentQues.choices[i];
    // attach click event listener to each choice
    btn.onclick = questionClick;
    // display on the page
    choicesEl.appendChild(btn);
  }
}

function questionClick() {
  // check if user guessed wrong
  if (this.innerHTML !== questions[currentQuestionIndex].answer) {
    // penalize time
    time = time - 10;
    if (time < 0) {
      time = 0;
    }
    // display new time on page
    timerEl.textContent = time;
    // play "wrong" sound effect
    sfxWrong.play()
    feedbackEl.style.display = "block";
    feedbackEl.textContent = "Wrong!";
    setTimeout(function () {
      feedbackEl.style.display = "none";
    }, 500);
  }
  else {
    // play "right" sound effect
    sfxRight.play()
    feedbackEl.style.display = "block";
    feedbackEl.textContent = "Correct!";
    // flash right/wrong feedback on page for half a second
    setTimeout(function () {
      feedbackEl.style.display = "none";
      // move to next question
      currentQuestionIndex++;
      // check if we've run out of questions
      if (currentQuestionIndex === questions.length) {
        quizEnd();
      } else {
        getQuestion();
      }
    }, 500);
  }
}

function quizEnd() {
  // stop timer
  clearInterval(timerId);
  // show end screen
  document.getElementById("end-screen").style.display = "block";
  // show final score
  document.getElementById("final-score").textContent = time + 1;
  // hide questions section
  questionsEl.style.display = "none";

}

function clockTick() {
  // update time
  timerEl.textContent = time;
  time--;
  // check if user ran out of time
  if (time <= 0) {
    timerEl.textContent = "";
    clearInterval(timerId);
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
  var initials = initialsEl.value;
  // make sure value wasn't empty
  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
    // format new score object for current user
    var newScore = {
      score: time + 1,
      initials: initials,
    };
    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));
    // redirect to next page
    window.location.href = "../../pages/highscores.html"
  }
}

function checkForEnter(event) {
  // check if event key is enter
  // saveHighscore
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;