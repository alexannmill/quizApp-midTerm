// func for dropping name entry and appending questions
$(function () {
  console.log("connected to q scripts");
  //hide generate qestuin button until 2 questions have been answered
  // $("#completeQuizCreate").hide()

  //sumbit for question form
  $("#questionform").submit(function (e) {
    e.preventDefault();

    const quiz_id = $("#questionform").attr("data-quiz-id");
    //if q and 2 a empty error

    //vars from form
    const question = {};
    question.question = $(this).find('textarea[name="question"]').val();
    question.correct = $(this).find('textarea[name="correct"]').val();
    question.answer1 = $(this).find('textarea[name="answer1"]').val();
    question.answer2 = $(this).find('textarea[name="answer2"]').val();
    question.answer3 = $(this).find('textarea[name="answer3"]').val();
    question.answer4 = $(this).find('textarea[name="answer4"]').val();

    //error handling for incorrect qNa
    if (!question.question || !question.correct) {
      if (
        !question.answer1 ||
        !question.answer2 ||
        !question.answer3 ||
        !question.answer4
      ) {
        alert("Plz enter a question and at least 2 answers");
        return;
      }
    }
    //post with vars
    $.post(`/create/${quiz_id}`, question, function (data, textStatus, jqXHR) {
      $("#questionform").trigger("reset");
    });
  });

  //on submit for generate quiz
  $("#completeQuizCreate").submit(function (e) {
    e.preventDefault();
    const quiz_id = $("#completeQuizCreate").attr("data-quiz-id");
    $.get(`/create/${quiz_id}/complete`, function (quiz_id) {
      HTMLswapFinal(quiz_id);
    });
  });

  //GET redirect for creating a new quiz
  $("#createComplete").submit(function (e) {
    $.get(`/create/`);
  });
});
//adding to data on submit and pulling up questions after name submission
const HTMLswapFinal = () => {
  $("#creationQnA").detach();
  $("completeQuizCreate").detach();
  $("#main").append($finalHTML);
};
//HTML for final create page
const $finalHTML = `<section id="createComplete">
<h1> Your Quiz is Complete!</h1>
<a href="localhost:8080/quiz/<%=quiz_id%>">Here is the link to your quiz and share with friends</a>
<form id="createAnother" action="/create" method="GET">
<button type="submit">Create Another</button>
</form>
</section>`;
