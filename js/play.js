const levelElement = document.getElementById("level");
const nameTag = document.getElementById("userTag");
const levelId = 1;
let input1 = document.getElementById("input1");
let input2 = document.getElementById("input2");
let userInput = document.getElementById("userInput");
const operatorElement = document.getElementById("operator");
const checkAnswerBtn = document.getElementById("check");
let score = document.getElementById("score");
let userScore = 0;
let countDown = 150;
let countDownElement = document.getElementById("progressTimerText");
let progressTimerBar = document.getElementById("progressTimerBar");
let currentQuestion = 0;
let questionElement = document.getElementById("progressText");
let progressBarrFull = document.getElementById("progressBarrFull");
let mathJari = document.getElementById("mathJari");
let mathJariInput = document.getElementById("mathJariInput");
let inputted = false;
const MAX_QUESTIONS = 15;

function checkName() {
  const nickName = localStorage.getItem("username");

  const dataPlayer = JSON.parse(localStorage.getItem("dataPlayers"));

  //cek data player sudah bermain atau belum
  if (dataPlayer) {
    //cek data dengan nickname ada atau tidak
    if (dataPlayer[nickName]) {
      //jika ada maka tampilkan nama dan level
      //   nameTag.innerHTML = `${nickName}`;
      levelElement.innerHTML = `Level ${dataPlayer[nickName].level}`;
    }
    //jika tidak maka
    else {
      //   nameTag.innerHTML = nickName;
      levelElement.innerHTML = `Level ${levelId}`;
    }
  }
}
checkName();

function randomNum() {
  const nickName = localStorage.getItem("username");
  const dataPlayer = JSON.parse(localStorage.getItem("dataPlayers"));

  //cek nickname sudah level berapa
  if (dataPlayer[nickName] == null) {
    return Math.ceil(Math.random() * 10);
  }

  //jika player level lebih dari 1
  if (dataPlayer[nickName].level == 2) {
    return Math.ceil(Math.random() * 20);
  } else if (dataPlayer[nickName].level == 3) {
    return Math.ceil(Math.random() * 40);
  } else if (dataPlayer[nickName].level == 4) {
    return Math.ceil(Math.random() * 50);
  } else {
    return Math.ceil(Math.random() * 10);
  }
}

function randomOperator() {
  const operators = ["+", "-"];
  const randomOp = operators[Math.floor(Math.random() * operators.length)];

  return randomOp;
}
randomOperator();
randomNum();
function display() {
  let num1 = randomNum();
  let num2 = randomNum();
  const operator = randomOperator();
  const finalAnswer = eval(num1 + operator + num2);

  operatorElement.innerHTML = operator;
  questionElement.innerHTML = `Question ${currentQuestion} of 15`;

  input1.innerHTML = num1;
  input2.innerHTML = num2;

  mathJari.innerHTML = "";
  // num1 to img
  let imgNum1 = document.createElement("img");
  imgNum1.src = `asset/img/gambarjari_${num1}.png`;
  mathJari.appendChild(imgNum1);
  // num2 to img
  let imgNum2 = document.createElement("img");
  imgNum2.src = `asset/img/gambarjari_${num2}.png`;
  mathJari.appendChild(imgNum2);

  if (operator == "-" && num1 < num2) {
    input1.innerHTML = num2;
    input2.innerHTML = num1;
  }

  if (finalAnswer > 200 || finalAnswer < 0) {
    display();
  }
}
display();
// menampilkan input img
userInput.addEventListener("input", () => {
  mathJariInput.innerHTML = "";
  let numInput = document.createElement("img");
  numInput.src = `asset/img/gambarjari_${userInput.value}.png`;
  mathJariInput.appendChild(numInput);
  if (userInput.value >= 100) {
    numInput.src = `asset/img/gambarjari_.png`;
  }
  if (userInput.value == "") {
    numInput.src = `asset/img/gambarjari_.png`;
  }
});

function endGame() {
  const players = localStorage.getItem("username");
  const loadData = JSON.parse(localStorage.getItem("dataPlayers"));
  let totalScore = "";
  let levelUp = "";
  let timeSpant = 150 - countDown;

  if (loadData[players]) {
    totalScore = userScore + loadData[players].score;
    levelUp = loadData[players].level;
  } else {
    totalScore = userScore;
    levelUp = levelId;
  }

  loadData[players] = {
    level: levelUp,
    score: totalScore,
    timeSpant: timeSpant,
  };
  localStorage.setItem("dataPlayers", JSON.stringify(loadData));
  window.location.href = "end.html";
}

function gameOver() {
  const players = localStorage.getItem("username");
  const loadData = JSON.parse(localStorage.getItem("dataPlayers"));
  let totalScore = "";
  let levelUp = "";
  let timeSpant = 150 - countDown;

  if (loadData[players]) {
    totalScore = userScore + loadData[players].score;
    levelUp = loadData[players].level;
  } else {
    totalScore = userScore;
    levelUp = levelId;
  }

  loadData[players] = {
    level: levelUp,
    score: totalScore,
    timeSpant: timeSpant,
  };
  localStorage.setItem("dataPlayers", JSON.stringify(loadData));
  window.location.href = "gameover.html";
}
// memvalidasi pemain
function validate() {
  let correctAnswer = eval(
    input1.innerHTML + operatorElement.innerHTML + input2.innerHTML
  );
  let userValue = parseFloat(userInput.value);

  if (userValue == correctAnswer) {
    display();
    currentQuestion++;
    userScore += 100;

    score.innerHTML = `${userScore}`;
    questionElement.innerHTML = `Question ${currentQuestion} of 15`;
    progressBarrFull.style.width = `${
      (currentQuestion / MAX_QUESTIONS) * 100
    }%`;
    if (currentQuestion >= 15) {
      Swal.fire({
        icon: "success",
        title: "Greedt...",
        text: "Good job",
        buttons: true,
      }).then((isOkay) => {
        if (isOkay) {
          endGame();
        }
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Opss...",
      text: `Incorrect, it was answer ${correctAnswer}`,
    });
    // alert(`Incorrect, it was answer ${correctAnswer}`);
    display();
    userScore -= 100;

    score.innerHTML = `${userScore}`;

    if (userScore < 0) {
      alert("Score cant be negative, Game Over!!");
      gameOver();
    }
  }
}

function runInterval() {
  let timerInterval = setInterval(() => {
    countDown--;
    countDownElement.innerHTML = `${countDown} s`;
    progressTimerBar.style.width = `${(countDown / 150) * 100}%`;

    if (countDown <= 0) {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Time Out!!",
      });

      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);
}

checkAnswerBtn.addEventListener("click", validate);

userInput.addEventListener("keyup", (e) => {
  if (!inputted) {
    runInterval();
    inputted = true;
  }
  if (e.key == "Enter") {
    validate();
  }
});
