$(document).ready(function() {

  const createQuestionElement = function(question) {
    let $question = $(`
    <div class="page-top">
      <h2 value="0">user: ${question.name}</h2>
      <h2>test name: ${question.quiz_id}</h2>
    </div>
    <div class="page-bottom">
      <h2>Grade: ${question.grade}</h2>
      <h2>Results: ${question.result}%</h2>
    </div>
  `);
  return $question;
  }

  const renderNextQuestion = function(question) {
    $(".questions-container").empty();
    const $question = createQuestionElement(question);
    $(".questions-container").append($question);
  }


  const $next = $(".next");
  $next.on("click", function () {
    let id = $('[data-id]').attr('data-id');
    let quiz = $('[quiz-id]').attr('quiz-id');
    console.log("quiz", quiz);
    id = Number(id);
    id = JSON.parse(id);

    $.get(`/results/${quiz}/${id+1}`)
    .then(function(results) {
      if (results.length < 1) {
        console.log("welp");
      } else {
        renderNextQuestion(results[0]);
        $('[data-id]').attr('data-id', Number(id+1));
      }
    });
  });
})


/*
-get data from questions database
-on hitting next the set of questions should shift to the next set
-as well as count if the user got the question correct or not
-Once on the last question make a get request to make a results page when submit is hit

*/
