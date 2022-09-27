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
    //post with vars
    $.post(`/create/${quiz_id}`, question, function (data, textStatus, jqXHR) {
      $("#questionform").trigger("reset");
    });
  });

  //on submit for generate quiz
  $("#completeQuizCreate").submit(function(e) {
    e.preventDefault();
    const quiz_id = $("#completeQuizCreate").attr("data-quiz-id");
    $.post(`/create/${quiz_id}/complete`,
    function(quiz_id) {
      quizComplete()
    });
  });
});
//adding to data on submit and pulling up questions after name submission

const quizComplete = () => {
  $("#main").detach()
};

