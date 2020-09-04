// variables to keep track of quiz state
var time = questions.length * 15;
var timerId;
var currentQuestionIndex = 0;
var currentQues = questions[currentQuestionIndex];

// variables to reference DOM elements
var startBtn = document.getElementById("start");
var timerEl = document.getElementById("time");
var questionsEl = document.getElementById("questions");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");

// sound effects
var sfxRight = new Audio("assets/sfx/correct.wav");
var sfxWrong = new Audio("assets/sfx/incorrect.wav");

function startQuiz() {
  // hide start screen
  document.getElementById("start-screen").style.display = "none";
  // un-hide questions section
  questionsEl.style.display = "block";
  // questionsEl.removeAttribute("class");
  // start timer and show starting time
  var timeLeft = time;
  var timeInterval = setInterval(function () {
    timerEl.textContent = timeLeft;
    timeLeft--;
    if (timeLeft === 0) {
      timerEl.textContent = "";
      clearInterval(timeInterval);
      quizEnd();
    }
  }, 1000);
  getQuestion();
}

function getQuestion() {
  // get current question object from array
  // var currentQues = questions[currentQuestionIndex];
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
  // // check if user guessed wrong
  // if (this.value !== currentQues.answer) {
  //   // penalize time
  //   time = time - 10;
  //   // display new time on page
  //   timerEl.textContent = time;
  //   // play "wrong" sound effect
  //   sfxWrong.play()
  //   feedbackEl.textContent = "Wrong!";
  // }
  // // else
    // play "right" sound effect
  // flash right/wrong feedback on page for half a second
  // move to next question
  // check if we've run out of questions
  // quizEnd
  // else
  // getQuestion
}

function quizEnd() {
  // stop timer
  // show end screen
  // show final score
  // hide questions section
}

function clockTick() {
  // update time
  // check if user ran out of time
}

function saveHighscore() {
  // get value of input box
  // make sure value wasn't empty
  // get saved scores from localstorage, or if not any, set to empty array
  // format new score object for current user
  // save to localstorage
  // redirect to next page
}

function checkForEnter(event) {
  // check if event key is enter
  // saveHighscore
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

// user clicks button to start quiz
startBtn.onclick = startQuiz;

initialsEl.onkeyup = checkForEnter;
