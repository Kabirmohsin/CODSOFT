const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Markdown Language", "Home Tool Markup Language"],
    answer: 1
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: 2
  },
  {
    question: "Which is not a JavaScript framework?",
    options: ["React", "Angular", "Vue", "Django"],
    answer: 3
  }
];

function addQuestionForm() {
  const container = document.getElementById("questionsContainer");
  const qIndex = container.children.length + 1;

  const qDiv = document.createElement("div");
  qDiv.className = "question-block";
  qDiv.innerHTML = `
    <h4>Question ${qIndex}</h4>
    <input type="text" placeholder="Enter Question" class="question-text" required>
    <input type="text" placeholder="Option A" class="option-input" required>
    <input type="text" placeholder="Option B" class="option-input" required>
    <input type="text" placeholder="Option C" class="option-input" required>
    <input type="text" placeholder="Option D" class="option-input" required>
    <input type="text" placeholder="Correct Answer (A/B/C/D)" class="correct-answer" required>
  `;
  container.appendChild(qDiv);
}

document.getElementById("quizForm")?.addEventListener("submit", function (e) {
  e.preventDefault();
  const title = document.getElementById("quizTitle").value.trim();
  const blocks = document.querySelectorAll(".question-block");

  const customQuestions = [];
  blocks.forEach(block => {
    const qText = block.querySelector(".question-text").value;
    const options = Array.from(block.querySelectorAll(".option-input")).map(o => o.value);
    const correct = block.querySelector(".correct-answer").value.toUpperCase();
    const correctIndex = ["A", "B", "C", "D"].indexOf(correct);
    if (correctIndex === -1) return alert("Correct answer must be A/B/C/D");

    customQuestions.push({ question: qText, options, answer: correctIndex });
  });

  if (customQuestions.length === 0) return alert("Please add at least one question!");

  const saved = JSON.parse(localStorage.getItem("customQuizzes") || "[]");
  saved.push({ title, questions: customQuestions });
  localStorage.setItem("customQuizzes", JSON.stringify(saved));

  alert("Quiz saved successfully!");
  window.location.href = "index.html";
});

if (document.getElementById("quizList")) {
  const quizList = document.getElementById("quizList");
  const custom = JSON.parse(localStorage.getItem("customQuizzes") || "[]");
  const combined = [...custom, { title: "Default Preloaded Quiz", questions }];

  combined.forEach((quiz, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${quiz.title}</strong>
      <button onclick="startQuizFromList(${i})" class="next-btn">Start</button>
    `;
    quizList.appendChild(li);
  });

  window.startQuizFromList = function (index) {
    localStorage.setItem("currentQuiz", JSON.stringify(combined[index]));
    window.location.href = "quiz.html";
  };
}

if (window.location.pathname.includes("quiz.html")) {
  const loaded = JSON.parse(localStorage.getItem("currentQuiz"));
  if (loaded) {
    questions.length = 0;
    loaded.questions.forEach(q => questions.push(q));
    startQuiz();
  }
}

function startQuiz() {
  let currentIndex = 0;
  let score = 0;
  document.getElementById("totalQ").textContent = questions.length;
  loadQuestion();

  function loadQuestion() {
    const q = questions[currentIndex];
    document.getElementById("qNumber").textContent = currentIndex + 1;
    document.getElementById("questionText").textContent = q.question;

    const optionsBox = document.getElementById("options");
    optionsBox.innerHTML = "";

    q.options.forEach((opt, i) => {
      const div = document.createElement("div");
      div.className = "option";
      div.textContent = String.fromCharCode(65 + i) + ". " + opt;
      div.setAttribute("data-index", i);
      div.addEventListener("click", () => {
        document.querySelectorAll(".option").forEach(o => o.classList.remove("selected"));
        div.classList.add("selected");
      });
      optionsBox.appendChild(div);
    });
  }

  document.getElementById("nextBtn")?.addEventListener("click", () => {
    const selected = document.querySelector(".option.selected");
    if (!selected) return alert("Please select an option!");
    const selectedIndex = parseInt(selected.getAttribute("data-index"));
    if (selectedIndex === questions[currentIndex].answer) score++;
    currentIndex++;
    if (currentIndex < questions.length) {
      loadQuestion();
    } else {
      localStorage.setItem("quizScore", score);
      localStorage.setItem("quizTotal", questions.length);
      window.location.href = "result.html";
    }
  });
}