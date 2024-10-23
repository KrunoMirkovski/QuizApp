const startBtn = document.querySelector(".btn_start");
const popUp = document.querySelector(".popup");
const exitBtn = document.querySelector(".btn_exit");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".btn_continue");
const quiz = document.querySelector(".quiz");
const quizBox = document.querySelector(".quizBox");
const nextBtn = document.querySelector(".next_btn");
const resultBox = document.querySelector(".results_wrap");

// Event listener for "Start" button to open the quiz guide popup
startBtn.onclick = () => {
  popUp.classList.add("active"); // Show the popup
  main.classList.add("active"); // Blur the main content
};
// Event listener for "Exit" button to close the popup and return to the main screen
exitBtn.onclick = () => {
  popUp.classList.remove("active"); // Hide the popup
  main.classList.remove("active"); // Unblur the main content
};
// Event listener for "Continue" button to begin the quiz
continueBtn.onclick = () => {
  quiz.classList.add("active"); // Show the quiz
  popUp.classList.remove("active"); // Hide the popup
  main.classList.remove("active"); // Unblur the main content
  quizBox.classList.add("active"); // Display the quiz box

  showQuestions(0); // Load the first question
  questionCounter(1);
  Score();
};

let questionCount = 0; // Track the current question index
let questionNumb = 1;
let userScore = 0;

// Event listener for "Next" button to move to the next question
nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++; // If there are more questions, increment the question count
    showQuestions(questionCount); // Load the next question

    questionNumb++;
    questionCounter(questionNumb);

    nextBtn.classList.remove("active");
  } else {
    showResultBox();
  }
};

const optionList = document.querySelector(".option_list");

// Function to display a question and its options based on the index
function showQuestions(index) {
  const questionText = document.querySelector(".question_txt");
  questionText.textContent = `${questions[index].number} ${questions[index].question}`;

  let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
                    <div class="option"><span>${questions[index].options[1]}</span></div>
                    <div class="option"><span>${questions[index].options[2]}</span></div>
                    <div class="option"><span>${questions[index].options[3]}</span></div>`;

  optionList.innerHTML = optionTag;

  const option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

function optionSelected(answer) {
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;
  let allOptions = optionList.children.length;

  if (userAnswer == correctAnswer) {
    console.log("answer is correct");
    answer.classList.add("correct");
    userScore += 1;
    Score();
  } else {
    console.log("wrong answer");
    answer.classList.add("incorrect");
    //if answer is incorrect, auto select the corrected answer
    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAnswer) {
        optionList.children[i].setAttribute("class", "option correct");
      }
    }
  }
  //when user select an answer, disable all options
  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
  }

  nextBtn.classList.add("active");
}

function questionCounter(index) {
  const questionTotal = document.querySelector(".totalQuestion");
  questionTotal.textContent = `${index} of ${questions.length} questions`;
}

function Score() {
  const scoreText = document.querySelector(".score");
  scoreText.textContent = `Score:${userScore} / ${questions.length}`;
}

function showResultBox() {
  quizBox.classList.remove("active");
  resultBox.classList.add("active");
}
