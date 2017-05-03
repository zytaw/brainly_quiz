function showElement(id) {
  document.getElementById(id).classList.remove('sg-layout__container--hidden');
}

function hideElement(id) {
  document.getElementById(id).classList.add('sg-layout__container--hidden');
}

function showStartButton() {
  showElement('start-button-container');
}

function startQuiz() {
  hideElement('start-button-container');
  config.result = 0;
  config.currentQuestion = -1;
  config.timeLeft = config.timeLimit;
  config.timerId = setInterval(updateTimer, 1000);
}

function displayQuestion() {
  const question = getNextQuestion();
  if (!question) {
    finishQuiz();
    return;
  }
  setQuestion(question.question);
  const answersContainer = document.getElementById('answers');
  answersContainer.innerHTML = '';
  question.answers.forEach(answer => {
    answersContainer.innerHTML += buildAnswer(answer.answer, answer.id);
  });
  question.answers.forEach(answer => {
    document.getElementById(`answer-${answer.id}`).addEventListener('click', checkAnswer, {once: true});
  });
  showElement('question-container');
}

function getNextQuestion() {
  config.currentQuestion++;
  return config.questions[config.currentQuestion];
}

function checkAnswer(e) {
  const answerId = e.target.dataset.id;
  config.questions[config.currentQuestion].answers.forEach(answer => {
    const answerElement = document.getElementById(`answer-${answer.id}`);
    answerElement.classList.remove('sg-media--clickable');
    answerElement.removeEventListener('click', checkAnswer, {once: true});
  });
  const chosenAnswerElement = document.getElementById(`answer-${answerId}`);
  if (config.questions[config.currentQuestion].answers[answerId - 1].correct){
    chosenAnswerElement.classList.add('sg-box__container--correct-answer');
    config.result++;
  }
  else {
    chosenAnswerElement.classList.add('sg-box__container--wrong-answer');
  }
  setTimeout(displayQuestion, 500);
}

function finishQuiz() {
  clearInterval(config.timerId);
  hideElement('question-container');
  const resultElement = document.getElementById('result');
  const resultMsgElement = document.getElementById('result-msg');
  if (config.result/config.questions.length >= 0.5) {
    resultElement.classList.remove('sg-text-bit--warning');
    resultMsgElement.innerHTML = config.successMsg;
  }
  else {
    resultElement.classList.add('sg-text-bit--warning');
    resultMsgElement.innerHTML = config.failMsg;
  }
  resultElement.innerHTML = `${config.result}/${config.questions.length}`;
  showElement('result-container');
  showElement('result');
  showElement('restart-button-container');
}

function restartQuiz() {
  hideElement('result-container');
  startQuiz();
}

function updateTimer() {
  document.getElementById('timer').innerHTML = formatTime(config.timeLeft);
  config.timeLeft--;
  if (config.timeLeft <= 0)
    finishQuiz();
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${("0" + seconds).slice(-2)}`;
}
