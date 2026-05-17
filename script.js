const questionsData = [
  {
    question: "What is 2 + 2?",
    options: ["1", "2", "3", "4"],
    answer: "4"
  },
  {
    question: "Capital of India?",
    options: ["Mumbai", "Delhi", "Kolkata", "Chennai"],
    answer: "Delhi"
  },
  {
    question: "HTML stands for?",
    options: [
      "Hyper Trainer Marking Language",
      "Hyper Text Markup Language",
      "Hyper Text Marketing Language",
      "Hyper Tool Markup Language"
    ],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "CSS is used for?",
    options: ["Styling", "Logic", "Database", "Backend"],
    answer: "Styling"
  },
  {
    question: "JS is?",
    options: ["Language", "Framework", "Library", "Tool"],
    answer: "Language"
  }
];

const questionsContainer = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreDiv = document.getElementById("score");

// Load saved progress from sessionStorage
let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

// Load saved score from localStorage
let savedScore = localStorage.getItem("score");
if (savedScore) {
  scoreDiv.textContent = `Your score is ${savedScore} out of 5.`;
}

// Render Questions
function renderQuestions() {
  questionsContainer.innerHTML = "";

  questionsData.forEach((q, index) => {
    const questionDiv = document.createElement("div");

    const title = document.createElement("p");
    title.textContent = `${index + 1}. ${q.question}`;
    questionDiv.appendChild(title);

    q.options.forEach(option => {
      const label = document.createElement("label");

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `q${index}`;
      radio.value = option;

      // Restore checked state
      if (progress[index] === option) {
        radio.checked = true;
      }

      // Save progress on change
      radio.addEventListener("change", () => {
        progress[index] = option;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(option));

      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsContainer.appendChild(questionDiv);
  });
}

renderQuestions();

// Submit Logic
submitBtn.addEventListener("click", () => {
  let score = 0;

  questionsData.forEach((q, index) => {
    if (progress[index] === q.answer) {
      score++;
    }
  });

  scoreDiv.textContent = `Your score is ${score} out of 5.`;

  // Save score in localStorage
  localStorage.setItem("score", score);
});