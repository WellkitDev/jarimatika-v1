const alertElement1 = document.getElementById("alertNull");
const alertElement2 = document.getElementById("alertCreate");
const alertElement3 = document.getElementById("alertLogin");
const alertElement4 = document.getElementById("alertCheck");
const alertElement5 = document.getElementById("alertInfo");

function createAccount() {
  const nickName = document.getElementById("username").value;
  const dataPlayer = localStorage.getItem("dataPlayers");

  //cek data pleyer ada atau tidak
  if (dataPlayer == null) {
    localStorage.setItem("dataPlayers", JSON.stringify({}));
  }

  //validasi inputan
  if (nickName.trim() != "") {
    const displayName = JSON.parse(dataPlayer);

    //cek player dengan nama inputan ada atau tidak
    if (displayName[nickName]) {
      alertElement4.classList.remove("d-none");
    } else {
      localStorage.setItem("username", nickName);
      alertElement2.classList.remove("d-none");
      window.location.href = "/menu.html";
    }
  } else {
    alertElement1.classList.remove("d-none");
  }
}

function handleLogin() {
  const nickName = document.getElementById("username").value;
  //validasi inputan kosong atau tidak
  if (nickName.trim() != "") {
    const dataPlayer = localStorage.getItem("dataPlayers");
    const displayName = JSON.parse(dataPlayer);

    //cek nickname ada atau tidak
    if (displayName[nickName]) {
      alertElement3.classList.remove("d-none");
      localStorage.setItem("username", nickName);
      window.location.href = "/menu.html";
    } else {
      alertElement5.classList.remove("d-none");
    }
  } else {
    alertElement1.classList.remove("d-none");
  }
}
