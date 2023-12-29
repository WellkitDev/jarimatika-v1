function play() {
  const nickName = localStorage.getItem("username");
  const dataPlayers = localStorage.getItem("dataPlayers");
  if (dataPlayers) {
    let data = JSON.parse(dataPlayers);
    if (data[nickName] == null) {
      data[nickName] = [(level = 0)];
    }
    if (data[nickName].level > 1) {
      window.location.href = "playV2.html";
      console.log("true");
    } else {
      window.location.href = "play.html";
    }
  }
}

function tryAgain() {
  if (dataPlayers[nickName].level > 1) {
    window.location.href = "playV2.html";
  } else {
    window.location.href = "play.html";
  }
}

function highScore() {
  window.location.href = "highscore.html";
}

function tutorial() {
  window.location.href = "tutor.html";
}

function closeWin() {
  window.location.href = "index.html";
}

function backToHome() {
  window.location.href = "menu.html";
}
