const questions = [
  {
    question: "What is 2 + 2?",
    options: ["1", "2", "4", "5"],
    answer: "4",
  },
  {
    question: "Which is a frontend language?",
    options: ["Python", "JavaScript", "Java", "C++"],
    answer: "JavaScript",
  },
  {
    question: "Which tag is used for paragraph?",
    options: ["div", "p", "span", "h1"],
    answer: "p",
  },
  {
    question: "Which method converts JSON text to object?",
    options: ["JSON.parse()", "JSON.stringify()", "parseInt()", "Object.create()"],
    answer: "JSON.parse()",
  },
  {
    question: "Which one is a CSS property?",
    options: ["font-size", "push", "pop", "map"],
    answer: "font-size",
  },
];

const questionsDiv = document.getElementById("questions");
const scoreDiv = document.getElementById("score");
const submitBtn = document.getElementById("submit");

let progress = JSON.parse(sessionStorage.getItem("progress")) || {};

function renderQuestions() {
  questionsDiv.innerHTML = "";

  questions.forEach((q, qIndex) => {
    const qBlock = document.createElement("div");

    const qTitle = document.createElement("p");
    qTitle.textContent = `${qIndex + 1}. ${q.question}`;
    qBlock.appendChild(qTitle);

    q.options.forEach((option, oIndex) => {
      const label = document.createElement("label");
      label.style.display = "block";

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.name = `question-${qIndex}`;
      radio.value = option;

      if (progress[qIndex] === option) {
        radio.checked = true;
      }

      radio.addEventListener("change", () => {
        progress[qIndex] = option;
        sessionStorage.setItem("progress", JSON.stringify(progress));
      });

      label.appendChild(radio);
      label.appendChild(document.createTextNode(` ${option}`));
      qBlock.appendChild(label);
    });

    questionsDiv.appendChild(qBlock);
  });
}

function calculateScore() {
  let score = 0;

  questions.forEach((q, index) => {
    if (progress[index] === q.answer) {
      score++;
    }
  });

  return score;
}

submitBtn.addEventListener("click", () => {
  const score = calculateScore();
  scoreDiv.textContent = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});

function restoreScore() {
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreDiv.textContent = `Your score is ${savedScore} out of 5.`;
  }
}

renderQuestions();
restoreScore();