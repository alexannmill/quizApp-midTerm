$(document).ready(function() {
  let questionNum = 0;
  let correctAns = 0;
  const $hideError = $(".error");
  $hideError.hide();


  // randomizes array
  const randomizeArray = function(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  // Function creates the elements that are in .contain with the new question data
  const createQuestionElement = function(question) {
    let array = [question.answer1, question.answer2, question.answer3, question.answer4];
    randomizeArray(array);
    let $question = $(`
    <h2>${question.question}</h2>
    <div class="top-row-answers">
      <div class="answers">
        <h4>A: ${array[0]}</h4>
      </div>
      <div class="answers">
        <h4>B: ${array[1]}</h4>
      </div>
    </div>
    <div class="bottom-row-answers">
      <div class="answers">
        <h4>C: ${array[2]}</h4>
      </div>
      <div class="answers">
        <h4>D: ${array[3]}</h4>
      </div>
    </div>
  `);
  return $question;
  }

  // converts the quiz result into a percentage
  const resultOfQuiz = function(correctAns, numOfQuestions) {
    const percentage = Math.round((correctAns/numOfQuestions) *100);
    console.log(percentage);
    return percentage;
  }

  // Gives the user a grade based on their quiz result
  const getGrade = function(percentage) {
    return (percentage > 85) ? "A"
          : (percentage > 72) ? "B"
          : (percentage > 60) ? "C"
          : (percentage > 49) ? "D"
          : "F";
  }


  // deletes the old question data on the page and rerenders it with the new data
  const renderNextQuestion = function(question) {
    $(".content").empty();
    const keys = Object.keys(question);
    for (const key of keys) {
      if (!question[key]) {
        question[key] = "";
      }
    }
    const $question = createQuestionElement(question);
    $(".content").append($question);
  }

  // Gives you the element that contains the class answer-picked
  const answerCheck = function (answers) {
    for (const answer of answers) {
      if (answer.classList.contains("answer-picked")) {
        return answer;
      }
    }
    return null;
  };

  // if one of the answers is clicked it gives it the answer-picked class
  const $answers = $(".content");
  $answers.on("click", ".answers",function() {
    const $allAnswers = $(this).closest(".content").find(".answers");
    const answerChecked  = answerCheck($allAnswers);
    // removes the class from the answer that already has answer-picked
    if(answerChecked) {
      $(answerChecked).removeClass("answer-picked");
    }
    $(this).addClass("answer-picked");
  });

  const $next = $(".next");

  // event gets and shows the user the next question with it's set of answer
  $next.on("click", function () {
    const $answers = $(this).siblings(".content").find(".answers");
    let quiz = $('[quiz-id]').attr('quiz-id');
    let user = $('[user-id]').attr('user-id');
    const button = this;
    quiz = Number(quiz);
    user = Number(user);
    let answer = answerCheck($answers);
    const $error = $(this).siblings(".error");

    if (!answer) {
      $error.slideDown();
    } else{
      if ($error.is(":visible")) {
        $error.slideUp("fast");
      }

      $.get(`/quiz/data/${quiz}`)
      .then(function(results) {
        // console.log("questionNum",questionNum);
        // console.log("results length", results.length);
        console.log("answers", correctAns);
        const currentQuestion = results[questionNum];
        if (answer.textContent.trim().slice(3) === currentQuestion.correct) {
          correctAns++;
        }

        // change button text to submit when on last question
        if (results.length - 2 === questionNum) {
          $(button).text("Submit");
        }

        // loads next question
        if (results.length - 1 > questionNum) {
          questionNum++;
          renderNextQuestion(results[questionNum]);

        // sends quiz data results to be added to the database and loads results page
        } else {
          const percentage = resultOfQuiz(correctAns, results.length);
          const grade = getGrade(percentage);
          const name = results[0].name;
          $.post(`/results/${quiz}/${user}`, {percentage, grade, name})
          .then(function() {
            window.location.assign(`/results/${quiz}/${user}`);
          });
        }
      });
    }
  });


})



