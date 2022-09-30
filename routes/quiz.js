const express = require('express');
const router  = express.Router();
const database = require('../db/queries/get-result');

// RENDERS A PAGE WITH THE GIVEN QUIZ DATA
router.get('/:id', (req, res) => {
  const quiz_id = req.params.id;
  const userID = req.session.user_id;
  database.getQuizByID(quiz_id)
  .then(function(results) {
    console.log(results);
    if (results.length === 0) {
      return res.status(400).send(`This result does not exist :(   <a href="/">Back Home</a>`);
    }
    const answers = [results[0].answer1, results[0].answer2, results[0].answer3, results[0].answer4];
    for (let i = answers.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = answers[i];
      answers[i] = answers[j];
      answers[j] = temp;
    }
    res.render('quiz', {answers, userID, question:results[0].question, quiz_id:results[0].quiz_id});
  });
});

// RENDERS QUIZ DATA AS A JSON
router.get('/data/:id', (req, res) => {
  const quiz_id = req.params.id;
  database.getQuizByID(quiz_id)
  .then(function(results) {
    res.json(results);
  });
});

module.exports = router;
