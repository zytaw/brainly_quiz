function buildAnswer(text, id) {
  return `
      <div id="answer-${id}" class="sg-box--centered-text sg-box--full sg-media--clickable sg-box__container--auto-margin sg-text--centered" data-id="${id}">
        ${text}
      </div>
  `;
}

function setQuestion(text) {
  document.getElementById('question').innerHTML = text;
}
