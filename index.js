const myRequest = new Request('https://cdn.rawgit.com/kdzwinel/cd08d08002995675f10d065985257416/raw/811ad96a0567648ff858b4f14d0096ba241f28ef/quiz-data.json');

const config = {
  questions: [],
  currentQuestion: -1,
  result: 0,
  failMsg: 'MUSISZ JESZCZE POĆWICZYĆ...',
  successMsg: 'GRATULACJE! ZDAŁEŚ TEST!'
}

fetch(myRequest)
  .then(function(response) { return response.json(); })
  .then(function(data) {
    config.timeLimit = data.time_seconds;
    config.questions = data.questions;
    showStartButton();
  }
);
