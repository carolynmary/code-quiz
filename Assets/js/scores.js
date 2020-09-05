function printHighscores() {
  // either get scores from localstorage or set to empty array
  var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  console.log(highscores);
  
  // (optional) sort highscores by score property in descending order
  highscores.sort(function (a, b) {
    return b.score - a.score;
  });
  // for each score
  for (var i = 0; i < highscores.length; i++) {
    // create li tag for each high score
    var liTag = document.createElement("li");
    liTag.innerHTML = highscores[i].initials + " - " + highscores[i].score;
    // display on page
    document.getElementById("highscores").appendChild(liTag);
  }
}

function clearHighscores() {
  window.localStorage.removeItem("highscores");
  // (and reload)
  window.location.reload();
}

// attache clear event to clear score button
document.getElementById("clear").onclick = clearHighscores;

// run print highscore when page loads
printHighscores();