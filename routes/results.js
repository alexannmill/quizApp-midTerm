const express = require('express');
const router  = express.Router();
const database = require('../db/queries/get-result');
const db = require('../db/queries/insert-results');


router.get('/:quiz/:id', (req, res) => {
  database.getResults(req.params.id, req.params.quiz)
    .then(function(results) {
      res.render('results', {results});
    })
});

router.post('/:quiz/:id', (req, res) => {
  const user_id = req.params.id;
  const quiz_id = req.params.quiz;
 database.getResults(user_id, quiz_id)
  .then(function(results) {
  if (results.length > 0) {
    database.updateResult(user_id,quiz_id, req.body.percentage, req.body.grade)
    .then(function() {
      res.redirect(`/results/${quiz_id}/${user_id}`);
    });
  } else {
    (db.insertResults(user_id,quiz_id, req.body.percentage, req.body.grade))
    .then(function() {
      res.redirect(`results/${quiz_id}/${user_id}`);
    });
  }
  });

})


module.exports = router;

