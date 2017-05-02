function showStartButton() {
  document.getElementById('start-button-container').classList.remove('sg-layout__container--hidden');
}
function startQuiz() {
  document.getElementById('start-button-container').classList.add('sg-layout__container--hidden');
  question = getNextQuestion();
  setQuestion(question.question);
  answersContainer = document.getElementById('answers');
  answersContainer.innerHTML = '';
  question.answers.forEach(answer => {
    answersContainer.innerHTML += buildAnswer(answer.answer, answer.id);
  });
  question.answers.forEach(answer => {
    document.getElementById(`answer-${answer.id}`).addEventListener("click", checkAnswer, {once: true});
  });
  document.getElementById('question-container').classList.remove('sg-layout__container--hidden');
}
function getNextQuestion() {
  config.currentQuestion++;
  return config.questions[config.currentQuestion];
}

function checkAnswer(e) {
  const answerId = e.target.dataset.id
  config.questions[config.currentQuestion].answers.forEach(answer => {
    document.getElementById(`answer-${answer.id}`).classList.remove('sg-media--clickable');
    document.getElementById(`answer-${answer.id}`).removeEventListener("click", checkAnswer, {once: true});
  });
  if (config.questions[config.currentQuestion].answers[answerId-1].correct){
    document.getElementById(`answer-${answerId}`).classList.add('sg-box__container--correct-answer');
    config.result++;
  }
  else {
    document.getElementById(`answer-${answerId}`).classList.add('sg-box__container--wrong-answer');
  }
}
