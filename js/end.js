const levelUser = document.getElementById("level");
const totalScore = document.getElementById("score");
const timeRim = document.getElementById("timeRimining");
const nextElement = document.getElementById("nextBtn");

const nickName = localStorage.getItem("username");
const dataPlayers = JSON.parse(localStorage.getItem("dataPlayers"));

function display() {
  if (dataPlayers) {
    if (dataPlayers[nickName]) {
      totalScore.innerHTML = `${dataPlayers[nickName].score}`;
      timeRim.innerHTML = `Time Rimining: ${dataPlayers[nickName].timeSpant} s`;
      levelUser.innerHTML = `Level ${dataPlayers[nickName].level}`;
    }
  }
}
display();

function nextLevel() {
  let level = dataPlayers[nickName].level;
  let score = dataPlayers[nickName].score;
  let timeSpant = dataPlayers[nickName].timeSpant;

  if (level < 4) {
    level++;
    dataPlayers[nickName] = {
      level: level,
      score: score,
      timeSpant: timeSpant,
    };
    localStorage.setItem("dataPlayers", JSON.stringify(dataPlayers));
    //console.log(`levelUp ${dataPlayers}`);

    window.location.href = "playV2.html";
  } else {
    nextElement.classList.add("d-none");
    alert("You have completed all levels!");
  }
}
