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
    res.render('quiz', {results:results[0], userID});
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
