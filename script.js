const startBtn = document.querySelector(".btn_start");
const popUp = document.querySelector(".popup");
const exitBtn = document.querySelector(".btn_exit");
const main = document.querySelector(".main");

startBtn.onclick = () => {
  popUp.classList.add("active");
  main.classList.add("active");
};

exitBtn.onclick = () => {
  popUp.classList.remove("active");
  main.classList.remove("active");
};
