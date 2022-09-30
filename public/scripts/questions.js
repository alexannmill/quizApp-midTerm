// func for dropping name entry and appending questions
$(function () {
  //hide generate button until 2 questions have been answered
  $("#completeQuizCreate").hide();

  //submit for question form
  $("#questionform").submit(function(e) {
  e.preventDefault();
  const quiz_id = $("#questionform").attr("data-quiz-id");
//collecting question data
  const question = {};
  question.question = $(this).find('textarea[name="question"]').val();
  question.correct = $(this).find('textarea[name="correct"]').val();
  question.answer1 = $(this).find('textarea[name="answer1"]').val();
  question.answer2 = $(this).find('textarea[name="answer2"]').val();
  question.answer3 = $(this).find('textarea[name="answer3"]').val();
  question.answer4 = $(this).find('textarea[name="answer4"]').val();
//error handling for incorrect input
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
 //sending questions
  $.post(`/create/${quiz_id}`, question, function(data) {
    const numOFq = data.numOFq;
//for generate quiz button
    if (numOFq > 2) {
      $("#completeQuizCreate").show();
    }
    $("#questionform").trigger("reset");
  });
});

//func for dropping qNa text form for final page
  const HTMLswapFinal = (quiz_id) => {
    const $finalHTML = `<section id="createComplete">
    <h1> Your Quiz is Complete!</h1>
    <div>
    <form id=" createAnother" action="/create" method="GET">
    <button class="completeButton  type="submit">Make Another!</button>
    </form>
    <form id="makePublic" action="/create/${quiz_id}/public" method="POST">
    <button class="completeButton" type="submit">Make Public and share with friends! </button>
    </form>
    <form id="overview" action="/create/${quiz_id}/complete" method="GET">
    <button class="completeButton" type="submit">Review your Quiz!</button>
    </form>
    </div>
    <img src="https://www.cameronaskin.info/ac8e719b3f7086bff10c0731d6d005ea.gif">
    </section>`;

    $("#creationQnA").detach();
    $("#completeQuizCreate").detach();
    $("#main").append($finalHTML);
  };
//submit generate quiz
  $("#completeQuizCreate").submit(function(e) {
    e.preventDefault();
    const quiz_id = $("#completeQuizCreate").attr("data-quiz-id");
    HTMLswapFinal(quiz_id);
  });
//make public quiz changes status in db
  $("#makePublic").submit(function (e) {
    e.preventDefault();
    const quiz_id = $("#completeQuizCreate").attr("data-quiz-id");
    $.post(`/create/${quiz_id}/public`)
  });
//overview of created quiz
  $("#overview").submit(function(e) {
    e.preventDefault();
    const quiz_id = $("#completeQuizCreate").attr("data-quiz-id");
    $.post(`/create/${quiz_id}/complete`);
  });

//redirect for creating another quiz
  $("#createComplete").submit(function (e) {
    $.get(`/create/`);
  });

    //HTML for final create page
});
