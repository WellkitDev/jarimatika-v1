function generateRandomOperation() {
  var num1 = Math.floor(Math.random() * 10) + 1;
  var num2 = Math.floor(Math.random() * num1) + 1; // Membatasi num2 agar tidak melebihi num1
  var isAddition = Math.random() < 0.5; // Memilih secara acak antara penjumlahan dan pengurangan

  var result = isAddition ? num1 + num2 : num1 - num2;

  var operationText = isAddition ? "Penjumlahan" : "Pengurangan";

  var mathProblem = document.getElementById("mathProblem");
  mathProblem.innerHTML = `${operationText}: ${num1} ${
    isAddition ? "+" : "-"
  } ${num2} = ${result}`;

  var representation = document.getElementById("representation");
  representation.innerHTML = ""; // Menghapus representasi gambar sebelumnya

  var imgNum1 = document.createElement("img");
  imgNum1.src = `/asset/img/gambarjari_${num1}.png`;
  imgNum1.classList.add("imgJari");
  imgNum1.classList.add("space");

  representation.appendChild(imgNum1);

  var imgNum2 = document.createElement("img");
  imgNum2.src = `/asset/img/gambarjari_${num2}.png`;
  imgNum2.classList.add("imgJari");
  imgNum2.classList.add("space");
  representation.appendChild(imgNum2);

  var imgResult = document.createElement("img");
  imgResult.classList.add("imgJari");
  imgResult.classList.add("space");
  imgResult.src = "/asset/img/gambarjari_" + result + ".png"; // Assuming you have separate images for each sum
  representation.appendChild(imgResult);
}
function backToHome() {
  window.location.href = "/menu/menu.html";
}
function play() {
  window.location.href = "/play/play.html";
}
