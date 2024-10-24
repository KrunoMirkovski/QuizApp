const startBtn = document.querySelector(".btn_start");
const popUp = document.querySelector(".popup");
const exitBtn = document.querySelector(".btn_exit");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".btn_continue");
const quiz = document.querySelector(".quiz");
const quizBox = document.querySelector(".quizBox");
const nextBtn = document.querySelector(".next_btn");
const resultBox = document.querySelector(".results_wrap");
const tryAgainBtn = document.querySelector(".tryAgain_btn");
const goHomeBtn = document.querySelector(".goHome_btn");

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
  questionCounter(1); // Display question count
  Score(); // Show the initial score
};

// Variables to track quiz progress and score
let questionCount = 0; // Track the current question index
let questionNumb = 1; // Question number (for display)
let userScore = 0; // User's score

// Event listener for "Next" button to move to the next question
nextBtn.onclick = () => {
  if (questionCount < questions.length - 1) {
    questionCount++; // If there are more questions, increment the question count
    showQuestions(questionCount); // Load the next question

    questionNumb++;
    questionCounter(questionNumb); // Update question counter

    nextBtn.classList.remove("active"); // Disable "Next" button until answered
  } else {
    showResultBox(); // Show the result box when the quiz is completed
  }
};

// Event listener to restart the quiz when "Try Again" is clicked
tryAgainBtn.onclick = () => {
  quizBox.classList.add("active");
  resultBox.classList.remove("active");
  nextBtn.classList.remove("active");

  // Reset quiz variables
  questionCount = 0;
  questionNumb = 1;
  userScore = 0;
  showQuestions(questionCount); // Reload first question
  questionCounter(questionNumb); // Reset question counter
  Score(); // Reset score display
};

// Event listener to return to home page when "Go Home" is clicked
goHomeBtn.onclick = () => {
  quiz.classList.remove("active");
  resultBox.classList.remove("active");
  nextBtn.classList.remove("active");

  questionCount = 0;
  questionNumb = 1;
  userScore = 0;
  showQuestions(questionCount);
  questionCounter(questionNumb);
};

// Select the list of options for each question
const optionList = document.querySelector(".option_list");

// Function to display a question and its options based on the index
function showQuestions(index) {
  const questionText = document.querySelector(".question_txt");
  questionText.textContent = `${questions[index].number} ${questions[index].question}`;

  // Create options dynamically
  let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
                    <div class="option"><span>${questions[index].options[1]}</span></div>
                    <div class="option"><span>${questions[index].options[2]}</span></div>
                    <div class="option"><span>${questions[index].options[3]}</span></div>`;

  optionList.innerHTML = optionTag; // Insert options into the HTML

  const option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)"); // Add click event for options
  }
}

// Handle logic for when an option is selected
function optionSelected(answer) {
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer; // Correct answer for the current question
  let allOptions = optionList.children.length;

  if (userAnswer == correctAnswer) {
    console.log("answer is correct");
    answer.classList.add("correct"); // Highlight correct answer
    userScore += 1; // Increase score
    Score(); // Update score display
  } else {
    console.log("wrong answer");
    answer.classList.add("incorrect"); // Highlight wrong answer
    //if answer is incorrect, auto select the corrected answer
    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAnswer) {
        optionList.children[i].setAttribute("class", "option correct");
      }
    }
  }
  //when user select an answer, disable all other options
  for (let i = 0; i < allOptions; i++) {
    optionList.children[i].classList.add("disabled");
  }

  nextBtn.classList.add("active"); // Activate "Next" button
}

// Function to display the current question number and total questions
function questionCounter(index) {
  const questionTotal = document.querySelector(".totalQuestion");
  questionTotal.textContent = `${index} of ${questions.length} questions`;
}

// Function to display the user's score
function Score() {
  const scoreText = document.querySelector(".score");
  scoreText.textContent = `Score:${userScore} / ${questions.length}`;
}

// Function to show the final result box with progress visualization
function showResultBox() {
  quizBox.classList.remove("active");
  resultBox.classList.add("active");

  const finalScoreText = document.querySelector(".final_score");
  finalScoreText.textContent = `Your Score: ${userScore} out of ${questions.length}`; // Final score display

  const progress = document.querySelector(".progress");
  const progressValue = document.querySelector(".progress_value");
  let progressStartValue = -1;
  let progressEndValue = (userScore / questions.length) * 100; // Calculate percentage score
  let progressSpeed = 10; // Speed of progress animation

  // Animate circular progress bar
  let circularProgress = setInterval(() => {
    progressStartValue++;
    console.log(progressStartValue);
    progressValue.textContent = `${progressStartValue}%`; // Display progress percentage
    progress.style.background = `conic-gradient(#f4f4f4 ${
      progressStartValue * 3.6
    }deg, #c71616 0deg )`; // Visualize progress using conic gradient

    if (progressStartValue == progressEndValue) {
      clearInterval(circularProgress); // Stop animation when complete
    }
  }, progressSpeed);
}
