const highScoresList = document.querySelector("#highScoreList");
const userScoresList = document.querySelector("#scoreUser");

const dataPlayers = localStorage.getItem("dataPlayers");

if (dataPlayers) {
  const player = JSON.parse(dataPlayers);
  const dataArray = Object.entries(player).map(([nama, data]) => ({
    nama,
    data,
  }));
  // validasi data rangking
  dataArray.sort(
    (a, b) => b.data.score - a.data.score && b.data.level - a.data.level
  );
  //menampilkan rangking 1-10
  highScoresList.innerHTML = dataArray
    .slice(0, 10)
    .map(
      (item, index) =>
        `<tr><th scope = "row">${index + 1}</th><th>${item.nama}</th><th>Lv ${
          item.data.level
        }<th>${item.data.score} P</th></th></tr>`
    )
    .join("");
  const userName = localStorage.getItem("username"); // ganti ini dengan nama user yang ada pada localhost
  const dataPlayer = dataArray.find((item) => item.nama === userName);
  userScoresList.innerHTML = `${dataPlayer.nama} - Lv ${dataPlayer.data.level} - ${dataPlayer.data.score} p`;
}
function backToHome() {
  window.location.href = "menu.html";
}
