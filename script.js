// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// DOM elements
const questionsElement = document.getElementById("questions");
const submitBtn        = document.getElementById("submit");
const scoreEl          = document.getElementById("score");

// userAnswers: e.g., ['Paris', undefined, 'Everest', ...]
let userAnswers = [];

// 1. Load previous progress from sessionStorage
function loadProgress() {
  const saved = sessionStorage.getItem("progress");
  if (saved) {
    try {
      const progress = JSON.parse(saved);  // {0: "Paris", 1: "Everest", ...}
      userAnswers = Array.from({ length: questions.length }, (_, i) => progress[i] || undefined);
    } catch (e) {
      userAnswers = [];
    }
  } else {
    userAnswers = [];
  }
}

// 2. Save progress to sessionStorage
function saveProgress() {
  const progress = {};
  questions.forEach((_, i) => {
    if (userAnswers[i] !== undefined) {
      progress[i] = userAnswers[i];
    }
  });
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

// 3. Render the quiz (DO NOT change this function)
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionElement = document.createElement("div");
    const questionText = document.createTextNode(question.question);
    questionElement.appendChild(questionText);

    for (let j = 0; j < question.choices.length; j++) {
      const choice = question.choices[j];
      const choiceElement = document.createElement("input");
      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);
      if (userAnswers[i] === choice) {
        choiceElement.setAttribute("checked", true);
      }
      const choiceText = document.createTextNode(choice);
      questionElement.appendChild(choiceElement);
      questionElement.appendChild(choiceText);
    }

    questionsElement.appendChild(questionElement);
  }
}

// 4. Attach event listeners after render
function attachListeners() {
  questionsElement.addEventListener("change", function (e) {
    if (e.target.type === "radio") {
      const qIndex = Number(e.target.name.split("-")[1]);
      const value  = e.target.value;

      if (userAnswers.length <= qIndex) {
        userAnswers = Array.from({ length: questions.length }, (_, i) => userAnswers[i] || undefined);
      }

      userAnswers[qIndex] = value;
      saveProgress();  // save to session storage on every change
    }
  });

  submitBtn.addEventListener("click", function () {
    let score = 0;
    let total = 0;

    questions.forEach((q, i) => {
      const userAnswer = userAnswers[i];
      if (userAnswer !== undefined) {
        total++;
        if (userAnswer === q.answer) {
          score++;
        }
      }
    });

    scoreEl.textContent = `Your score is ${score} out of ${questions.length}.`;

    // ✅ Fixed: store as JSON object, not just number
    localStorage.setItem(
      "score",
      JSON.stringify({
        score,
        total: questions.length,
        timestamp: Date.now()
      })
    );
  });

  // Show last score on page load if available
  if (localStorage.getItem("score")) {
    try {
      const last = JSON.parse(localStorage.getItem("score"));
      if (!scoreEl.textContent) {
        scoreEl.textContent = `Your score is ${last.score} out of ${last.total}.`;
      }
    } catch (e) { /* ignore */ }
  }
}

// 5. Initialize: load progress, render, attach
document.addEventListener("DOMContentLoaded", function () {
  loadProgress();
  renderQuestions();
  attachListeners();
});