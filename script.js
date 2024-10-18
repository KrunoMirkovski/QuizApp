const startBtn = document.querySelector(".btn_start");
const popUp = document.querySelector(".popup");
const exitBtn = document.querySelector(".btn_exit");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".btn_continue");
const quiz = document.querySelector(".quiz");

startBtn.onclick = () => {
  popUp.classList.add("active");
  main.classList.add("active");
};

exitBtn.onclick = () => {
  popUp.classList.remove("active");
  main.classList.remove("active");
};

continueBtn.onclick = () => {
  quiz.classList.add("active");
  popUp.classList.remove("active");
  main.classList.remove("active");
};
