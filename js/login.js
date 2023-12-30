const dataPlayer = localStorage.getItem("dataPlayers");

//cek data pleyer ada atau tidak
if (dataPlayer == null) {
  localStorage.setItem("dataPlayers", JSON.stringify({}));
}

function createAccount() {
  const nickName = document.getElementById("username").value;
  //validasi inputan
  if (nickName.trim() != "") {
    localStorage.setItem("username", nickName);
    const displayName = JSON.parse(dataPlayer);
    //cek player dengan nama inputan ada atau tidak
    if (!displayName[nickName]) {
      Swal.fire({
        icon: "success",
        title: "WOW...",
        text: "Nice nickname ",
      }).then((isOkay) => {
        if (isOkay) {
          window.location.href = "menu.html";
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Opss...",
        text: "Nickname already in use ",
      });
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Opss...",
      text: "Nickname dont empty",
    });
  }
}

function handleLogin() {
  const nickName = document.getElementById("username").value;
  //validasi inputan kosong atau tidak
  if (nickName.trim() != "") {
    const dataPlayer = localStorage.getItem("dataPlayers");
    const displayName = JSON.parse(dataPlayer);
    let user = localStorage.getItem("username");

    if (user == nickName) {
      window.location.href = "menu.html";
    } else {
      //cek nickname ada atau tidak
      if (displayName[nickName]) {
        localStorage.setItem("username", nickName);
        window.location.href = "menu.html";
      } else {
        Swal.fire({
          icon: "error",
          title: "Opss...",
          text: "Your Nickname does not exist",
        });
      }
    }
  } else {
    Swal.fire({
      icon: "error",
      title: "Opss...",
      text: "Nickname dont empty",
    });
  }
}
