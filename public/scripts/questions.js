// func for dropping name entry and appending questions
$(function () {
  console.log("connected to q scripts");

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
    $.post(`/create/${quiz_id}`, question, function (data, textStatus, jqXHR) {
      $("#questionform").trigger("reset");
      console.log(data);
      console.log(jqXHR);
    });
  });
  $("#completeQuizCreate").submit(function(e) {
    e.preventDefault();
    const quiz_id = $("#completeQuizCreate").attr("data-quiz-id");
    $.post(`/create/${quiz_id}/complete`, quiz_id, function (quiz_id) {});
  });
});
//adding to data on submit and pulling up questions after name submission
