const levelElement = document.getElementById("level");
const questionElement = document.getElementById("progressText");
const score = document.getElementById("score");
let userScore = 0;
let progressBarrFull = document.getElementById("progressBarrFull");
let currentQuestions = 0;

let countDownElement = document.getElementById("progressTimerText");
let progressTimerBar = document.getElementById("progressTimerBar");
let countDown = 150;

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

// Fungsi untuk menghasilkan angka acak antara min dan max (inklusif)
function getRandomInt() {
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

// random oprator
function randomOperator() {
  const operators = ["+", "-"];
  const randomOp = operators[Math.floor(Math.random() * operators.length)];

  return randomOp;
}

// Fungsi untuk menghasilkan pertanyaan
function generateQuestion() {
  let num1, num2, correctAnswer;

  do {
    num1 = getRandomInt();
    num2 = getRandomInt();
    operator = randomOperator();

    correctAnswer = eval(num1 + operator + num2);
  } while (correctAnswer < 0);

  let quest = `<img src="asset/img/gambarjari_${num1}.png" alt="gambarjari${num1}"> ${operator} <img src="asset/img/gambarjari_${num2}.png" alt="gambarjari${num2}">`;

  if (operator === "-" && num1 < num2) {
    quest = `<img src="asset/img/gambarjari_${num2}.png" alt="gambarjari${num2}"> ${operator} <img src="asset/img/gambarjari_${num1}.png" alt="gambarjari${num1}">`;
  }

  const unshuffledAnswers = [
    `<button class= "btn1 mb-2 py-2 px-2"><img src="asset/img/gambarjari_${getRandomInt()}.png" alt="gambarjari${getRandomInt()}"></button>`,
    `<button class= "btn2 mb-2 py-2 px-2"><img src="asset/img/gambarjari_${getRandomInt()}.png" alt="gambarjari${getRandomInt()}"></button>`,
    `<button class= "btn3 mb-2 py-2 px-2"><img src="asset/img/gambarjari_${correctAnswer}.png" alt="gambarjari_${correctAnswer}"></button>`,
  ];

  const shuffledAnswers = shuffleArray(unshuffledAnswers);

  return {
    question: quest,
    answers: shuffledAnswers,
    correctIndex: shuffledAnswers.indexOf(
      `<button class= "btn3 mb-2 py-2 px-2"><img src="asset/img/gambarjari_${correctAnswer}.png" alt="gambarjari_${correctAnswer}"></button>`
    ),
  };
}

function shuffleArray(array) {
  const shuffled = array.slice(); // Duplicasi array agar tidak merubah array asli
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Menukar elemen
  }
  return shuffled;
}

// Tentukan pertanyaan kuis
const questions = [
  generateQuestion(),

  // Tambahkan pertanyaan lebih banyak sesuai kebutuhan
];

let currentQuestionIndex = 0;

// Fungsi untuk menginisialisasi kuis
function initializeQuiz() {
  generateQuestions();
  showQuestion();
}

function generateQuestions() {
  questions.length = 0; // Kosongkan array pertanyaan
  const numberOfQuestions = 16; // Tentukan jumlah pertanyaan yang diinginkan

  for (let i = 0; i < numberOfQuestions; i++) {
    questions.push(generateQuestion());
  }
}

// Fungsi untuk menampilkan pertanyaan saat ini
function showQuestion() {
  const questionContainer = document.getElementById("question-container");
  const optionsContainer = document.getElementById("options-container");

  const currentQuestion = questions[currentQuestionIndex];
  questionContainer.innerHTML = currentQuestion.question;

  questionElement.innerHTML = `Question ${currentQuestions} of 15`;

  optionsContainer.innerHTML = "";
  currentQuestion.answers.forEach((option, index) => {
    const button = document.createElement("div");
    button.innerHTML = option;
    button.onclick = () => checkAnswer(index);
    optionsContainer.appendChild(button);
  });
}

// Fungsi untuk memeriksa jawaban yang dipilih
function checkAnswer(selectedIndex) {
  const correctIndex = questions[currentQuestionIndex].correctIndex;

  if (selectedIndex === correctIndex) {
    // alert("Benar!");
    userScore += 100;
    currentQuestions++;
    score.innerHTML = `${userScore}`;
    questionElement.innerHTML = `Question ${currentQuestions} of 15`;
    progressBarrFull.style.width = `${(currentQuestions / 15) * 100}%`;

    if (currentQuestions >= 15) {
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
    // alert(
    //   `Salah. Jawaban yang benar adalah: ${questions[currentQuestionIndex].answers[correctIndex]}`
    // );
    Swal.fire({
      icon: "error",
      title: "Opss...",
      text: `Incorrect, Try Again`,
    });

    userScore -= 100;
    score.innerHTML = `${userScore}`;
  }

  if (userScore < 0) {
    Swal.fire({
      icon: "error",
      title: "Sorry...",
      text: "Credit score minus.. ",
      buttons: true,
    }).then((isOkay) => {
      if (isOkay) {
        gameOver();
      }
    });
  }
  nextQuestion();
}

// Fungsi untuk beralih ke pertanyaan berikutnya
function nextQuestion() {
  currentQuestionIndex++;
  showQuestion();
  // if (currentQuestionIndex <= 16) {

  // } else {
  //   alert("Kuis selesai!");
  //   currentQuestionIndex = 0; // Reset kuis untuk mencoba lagi
  //   generateQuestions();
  //   showQuestion();
  // }
}

runInterval();

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

function runInterval() {
  let timerInterval = setInterval(() => {
    countDown--;
    countDownElement.innerHTML = `${countDown} S`;
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

// Inisialisasi kuis saat halaman dimuat
window.onload = initializeQuiz;
