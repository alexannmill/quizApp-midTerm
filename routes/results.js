const express = require('express');
const router  = express.Router();
const database = require('../db/queries/get-result');
const db = require('../db/queries/insert-results');

// RENDERS USERS MOST RECENT QUIZ RESULT
router.get('/:quiz/:id', (req, res) => {
  const userID = req.session.user_id;
  database.getResults(req.params.id, req.params.quiz)
    .then(function(results) {
      if (results.length === 0) {
        res.status(400).send(`This result does not exist :(   <a href="/">Back Home</a>`);
      }
      res.render('results', {results, userID});
    })
});


// REDIRECTS USER TO THEIR ALL RESULTS PAGE
router.get('/', (req, res) => {
  const userID = req.session.user_id;
  if (userID){
    res.redirect(`results/${userID}/`);
  }
  res.status(400).send(`Please login to see results.   <a href="/">Back Home</a>`);
})

// RENDERS ALL OF A USER'S MOST RECENT QUIZ RESULTS
router.get('/:id', (req, res) => {
  const userID = req.session.user_id;
  database.getAllResults(req.params.id)
    .then(function(results) {
      if (!userID){
        return res.status(400).send(`Please login to see results.   <a href="/">Back Home</a>`)
      }
      res.render('allResults', {results, userID});
    });
});


// UPDATES USERS QUIZ RESULTS INTO DATABASE
router.post('/:quiz/:id', (req, res) => {
  const user_id = req.params.id;
  const quiz_id = req.params.quiz;
  const percentage = req.body.percentage;
  const quiz_name = req.body.name;
  const grade = req.body.grade;

 database.getResults(user_id, quiz_id)
  .then(function(results) {
    // if user has taken the quiz before it updates that entry the database with their newest result
    if (results.length > 0) {
      database.updateResult(user_id,quiz_id, percentage, grade)
      .then(function() {
        res.redirect(`/results/${quiz_id}/${user_id}`);
      });
    // if user has not taken the quiz before it inserts the database with their result
    } else {
      (db.insertResults(user_id,quiz_id, quiz_name, percentage, grade))
      .then(function() {
        res.redirect(`/results/${quiz_id}/${user_id}`);
      });
    }
  });

})


module.exports = router;

