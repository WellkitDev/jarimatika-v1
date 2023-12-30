const quizElement = document.getElementById("quiz");
const quizElement1 = document.getElementById("quiz1");

const nameTag = document.getElementById("userTag");
const levelElement = document.getElementById("level");
let levelId = 1;

let questionElement = document.getElementById("progressText");
let progressBarrFull = document.getElementById("progressBarrFull");
let currentQuestion = 0;
let MAX_QUESTIONS = 15;

let score = document.getElementById("score");
let userScore = 0;

let input1 = document.getElementById("input1");
let input2 = document.getElementById("input2");
let userInput = document.getElementById("userInput");

let option1 = document.getElementById("option1");
let option2 = document.getElementById("option2");
let option3 = document.getElementById("option3");

let mathJari = document.getElementById("mathJari");
let mathJariInput = document.getElementById("mathJariInput");

const operatorElement = document.getElementById("operator");
const checkAnswerBtn = document.getElementById("check");

let countDownElement = document.getElementById("progressTimerText");
let progressTimerBar = document.getElementById("progressTimerBar");
let countDown = 150;

let finalAnswer = 0;

let inputted = false;

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

randomNum();

function randomOperator() {
  const operators = ["+", "-"];
  const randomOp = operators[Math.floor(Math.random() * operators.length)];

  return randomOp;
}

randomOperator();

questionLevel2 = () => {
  let num1 = randomNum();
  let num2 = randomNum();
  let dummyAnswer1 = randomNum();
  let dummyAnswer2 = randomNum();
  let operator = randomOperator();
  let allAnswer = [];
  let switchAnswer = [];

  finalAnswer = eval(num1 + operator + num2);
  if (operator == "-" && num1 < num2) {
    finalAnswer = eval(num2 - num1);
  }

  questionElement.innerHTML = `Question ${currentQuestion} of 15`;

  mathJari.innerHTML = "";

  // num1 to img
  let imgNum1 = document.createElement("img");
  imgNum1.src = `asset/img/gambarjari_${num1}.png`;
  mathJari.appendChild(imgNum1);

  let operators = document.createElement("h1");
  operators.textContent = `${operator}`;
  mathJari.appendChild(operators);

  // num2 to img
  let imgNum2 = document.createElement("img");
  imgNum2.src = `asset/img/gambarjari_${num2}.png`;
  mathJari.appendChild(imgNum2);

  if (operator == "-" && num1 < num2) {
    imgNum1.src = `asset/img/gambarjari_${num2}.png`;
    imgNum2.src = `asset/img/gambarjari_${num1}.png`;
  }

  allAnswer = [finalAnswer, dummyAnswer1, dummyAnswer2];

  for (i = allAnswer.length; i--; ) {
    switchAnswer.push(
      allAnswer.splice(Math.floor(Math.random() * (i + 1)), 1)[0]
    );
  }

  option1.innerHTML = "";
  let numImg1 = document.createElement("img");
  numImg1.src = `asset/img/gambarjari_${switchAnswer[0]}.png`;
  option1.appendChild(numImg1);

  option2.innerHTML = "";
  let numImg2 = document.createElement("img");
  numImg2.src = `asset/img/gambarjari_${switchAnswer[1]}.png`;
  option2.appendChild(numImg2);

  option3.innerHTML = "";
  let numImg3 = document.createElement("img");
  numImg3.src = `asset/img/gambarjari_${switchAnswer[2]}.png`;
  option3.appendChild(numImg3);

  option1.addEventListener("click", function () {
    checkAnswer(switchAnswer[0]);
  });
  option2.addEventListener("click", function () {
    checkAnswer(switchAnswer[1]);
  });
  option3.addEventListener("click", function () {
    checkAnswer(switchAnswer[2]);
  });
};

questionLevel2();

function checkAnswer(answer) {
  if (answer == finalAnswer) {
    questionLevel2();

    currentQuestion++;
    userScore += 100;

    score.innerHTML = `${userScore}`;
    questionElement.innerHTML = `Question ${currentQuestion} of 15`;
    progressBarrFull.style.width = `${
      (currentQuestion / MAX_QUESTIONS) * 100
    }%`;

    if (currentQuestion > 15) {
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
    userScore -= 100;
    score.innerHTML = `${userScore}`;
    questionLevel2();
  }

  if (userScore < 0) {
    Swal.fire({
      icon: "error",
      title: "Opss...",
      text: "Credit score minus.. ",
      buttons: true,
    }).then((isOkay) => {
      if (isOkay) {
        gameOver();
      }
    });
  }
}

runInterval();

function endGame() {
  const players = localStorage.getItem("username");
  const loadData = JSON.parse(localStorage.getItem("dataPlayers"));
  let totalScore = "";
  let additionalScore = 0;
  let levelUp = "";
  let timeSpant = 150 - countDown;

  if (userScore < 0) {
    additionalScore = 0;
  } else {
    additionalScore = userScore;
  }

  if (loadData[players]) {
    totalScore = additionalScore + loadData[players].score;
    levelUp = loadData[players].level;
  } else {
    totalScore = additionalScore;
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
  let additionalScore = 0;
  let levelUp = "";
  let timeSpant = 150 - countDown;

  if (userScore < 0) {
    additionalScore = 0;
  } else {
    additionalScore = userScore;
  }

  if (loadData[players]) {
    totalScore = additionalScore + loadData[players].score;
    levelUp = loadData[players].level;
  } else {
    totalScore = additionalScore;
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
