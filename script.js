const questions = [
  {
    question: "What is the highest mountain in the world?",
    options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"],
    answer: "Mount Everest",
  },
  {
    question: "Which language runs in the browser?",
    options: ["Python", "Java", "C", "JavaScript"],
    answer: "JavaScript",
  },
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Markup Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which method is used to print in the console?",
    options: ["console.log()", "print()", "echo()", "write()"],
    answer: "console.log()",
  },
  {
    question: "Which one is a CSS framework?",
    options: ["React", "Bootstrap", "Node", "Express"],
    answer: "Bootstrap",
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
    qTitle.textContent = q.question;
    qBlock.appendChild(qTitle);

    q.options.forEach((option) => {
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
  localStorage.setItem("score", String(score));
});

function restoreScore() {
  const savedScore = localStorage.getItem("score");
  if (savedScore !== null) {
    scoreDiv.textContent = `Your score is ${savedScore} out of 5.`;
  } else {
    scoreDiv.textContent = "";
  }
}

renderQuestions();
restoreScore();