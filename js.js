const questions = [
  {
      question: "What is the capital of France?",
      answers: [
          { text: "Paris", correct: true },
          { text: "London", correct: false },
          { text: "Berlin", correct: false },
          { text: "Madrid", correct: false }
      ]
  },
  // Add more questions here, ensuring to have at least 50 questions
  {
      question: "Who wrote 'Hamlet'?",
      answers: [
          { text: "William Shakespeare", correct: true },
          { text: "Charles Dickens", correct: false },
          { text: "Mark Twain", correct: false },
          { text: "Jane Austen", correct: false }
      ]
  },
  {
      question: "What is the largest planet in our solar system?",
      answers: [
          { text: "Jupiter", correct: true },
          { text: "Earth", correct: false },
          { text: "Mars", correct: false },
          { text: "Saturn", correct: false }
      ]
  },
  {
      question: "What is the chemical symbol for water?",
      answers: [
          { text: "H2O", correct: true },
          { text: "O2", correct: false },
          { text: "CO2", correct: false },
          { text: "H2", correct: false }
      ]
  },
  {
      question: "What is the tallest mountain in the world?",
      answers: [
          { text: "Mount Everest", correct: true },
          { text: "K2", correct: false },
          { text: "Kangchenjunga", correct: false },
          { text: "Lhotse", correct: false }
      ]
  }
  // ... add more questions up to at least 50
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;

const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');
const correctAnswersElement = document.getElementById('correct-answers');
const restartButton = document.getElementById('restart-btn');
const timeElement = document.getElementById('time');

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
      setNextQuestion();
  } else {
      showResult();
  }
});

restartButton.addEventListener('click', restartQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.classList.remove('hidden');
  resultElement.classList.add('hidden');
  questionContainerElement.classList.remove('hidden');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
  startTimer();
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('btn');
      button.addEventListener('click', () => selectAnswer(answer));
      answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add('hidden');
  while (answerButtonsElement.firstChild) {
      answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
  timeLeft = 30;
  timeElement.innerText = timeLeft;
}

function selectAnswer(answer) {
  if (answer.correct) {
      score++;
  }
  Array.from(answerButtonsElement.children).forEach(button => {
      setStatusClass(button, button.innerText === answer.text);
  });
  clearInterval(timer);
  nextButton.classList.remove('hidden');
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
      element.classList.add('correct');
  } else {
      element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

function showResult() {
  questionContainerElement.classList.add('hidden');
  resultElement.classList.remove('hidden');
  scoreElement.innerText = score;
  correctAnswersElement.innerHTML = '';
  questions.forEach((question, index) => {
      const div = document.createElement('div');
      div.innerHTML = `<strong>Q${index + 1}:</strong> ${question.question}<br><strong>A:</strong> ${question.answers.find(answer => answer.correct).text}`;
      correctAnswersElement.appendChild(div);
  });
  nextButton.classList.add('hidden');
}

function restartQuiz() {
  startQuiz();
}

function startTimer() {
  timer = setInterval(() => {
      timeLeft--;
      timeElement.innerText = timeLeft;
      if (timeLeft <= 0) {
          clearInterval(timer);
          nextButton.classList.remove('hidden');
      }
  }, 1000);
}

startQuiz();
