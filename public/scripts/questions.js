const { createQuestion } = require("../../db/queries/create");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
// func for dropping name entry and appending questions
$(function() {
  const $main = $("#main");
  // HTML for questions form
  const $question = $(`
    <section class="questionContainer">
    <form action="/routes/create.js" method="post">
      <label>Question</label>
      <textarea name="question" ></textarea>
    </form>
    </section>
    <section id="answerContainer">s
      <form class="answers" action="/routes/create.js" method="post">
      <div>
        <label>Correct Answer</label>
        <textarea name="correct"></textarea>
      </div>
      <div>
        <label>Incorrect Answer</label>
        <textarea name="answer1"></textarea>
      </div>
      <div>
        <label>Incorrect Answer</label>
        <textarea name="answer3" ></textarea>
      </div>
      <div>
        <label>Incorrect Answer</label>
        <textarea name="answer2" ></textarea>
      </div>
      <div>
        <label>Incorrect Answer</label>
        <textarea name="answer4" ></textarea>
      </div>
      <button type="submit">Start/button</button>
    </form>
    </section>
  `);
  $form.submit(function (e) {
    e.preventDefault();
    //if q and 2 a empty error

    //vars from form
    const question =

    // for routes looking like this `/products?page=1&pageSize=50`
    app.get('/products', function(req, res) {
      const page = req.query.page;
      const pageSize = req.query.pageSize;
      res.send(`Filter with parameters ${page} and ${pageSize});`
    });

    question.question = $(this).find('textarea [name="question"]').val();
    question.correct = $(this).find('textarea [name="correct"]').val();
    question.answer1 = $(this).find('textarea [name="answer1"]').val();
    question.answer2 = $(this).find('textarea [name="answer2"]').val();
    question.answer3 = $(this).find('textarea [name="answer3"]').val();
    question.answer4 = $(this).find('textarea [name="answer4"]').val();
    const short_id = window.location.pathname
    $.post("/create/:id/questions", question)
    // $.ajax({
    //   type: "method",
    //   url: `/create/${short_id}/questions`,
    //   data: "data",
    //   success: function (question) {
    //   }
    // });
  });
//adding to data on submit and pulling up questions after name submission


});
