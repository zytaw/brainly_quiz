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
  document.getElementById('question-container').classList.remove('sg-layout__container--hidden');
}
function getNextQuestion() {
  config.currentQuestion++;
  return config.questions[config.currentQuestion];
}
}
