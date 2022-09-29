// func for dropping name entry and appending questions
$(function () {
  //hide generate qestuin button until 2 questions have been answered
  // $("#completeQuizCreate").hide();

  //sumbit for question form
  $("#questionform").submit(function (e) {
    e.preventDefault();

    const quiz_id = $("#questionform").attr("data-quiz-id");

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

    //post with q vars
    $.post(`/create/${quiz_id}`, question, function (data) {
      const numOFq = data.numOFq;
      //for generate quiz button
      if (numOFq > 2) {
        $("#completeQuizCreate").show();
      }
      $("#questionform").trigger("reset");

      //on submit for generate quiz
    });
  });

        // func for dropping qNa text form for final page
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
    <button class="overview" type="submit">Review your Quiz!</button>
    </form>
    </div>
    <img src="https://www.cameronaskin.info/ac8e719b3f7086bff10c0731d6d005ea.gif">
    </section>`;
    $("#creationQnA").detach();
    $("#completeQuizCreate").detach();
    $("#main").append($finalHTML);
  };


  $("#completeQuizCreate").submit(function (e) {
    e.preventDefault();
    const quiz_id = $("#completeQuizCreate").attr("data-quiz-id");
    HTMLswapFinal(quiz_id);
  });
  //make public quiz changes status in db
  $("#makePublic").submit(function (e) {
    e.preventDefault();
    const quiz_id = $("#completeQuizCreate").attr("data-quiz-id");
    $.post(`/create/${quiz_id}/public`, function (quiz_id) {
      console.log("quiz_idQ:", quiz_id);
      //once again get request sends but page does not render, have to redirect using
      // window.location.href = `/quiz/${quiz_id}`;
    });

    $("#overview").submit(function (e) {
      e.preventDefault();
      const quiz_id = $("#completeQuizCreate").attr("data-quiz-id");
      console.log('quiz_id:', quiz_id)
      $.post(`/create/${quiz_id}/complete`, function (id, quiz_Data) {
        const qid= id
        console.log('qid:', qid)
        //once again get request sends but page does not render, have to redirect using
        window.location.href = `/create/${id}/complete`;
      });
    });

    //GET redirect for creating a new quiz
    $("#createComplete").submit(function (e) {
      $.get(`/create/`);
    });

    //HTML for final create page
  });
});


