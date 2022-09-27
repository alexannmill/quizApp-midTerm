$(document).ready(function() {
  const answerCheck = function (answers) {
    for (const answer of answers) {
      if (answer.classList.contains("answer-picked")) {
        return answer;
      }
    }
    return null;
  };

  const $answers = $(".answers");
  $answers.on("click", function() {
    const answerChecked  = answerCheck($answers)
    if(answerChecked) {
      $(answerChecked).removeClass("answer-picked");
    }
    $(this).addClass("answer-picked");
  });
});


