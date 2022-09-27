const express = require('express');
const router  = express.Router();
const database = require('../db/queries/get-result');

router.get('/', (req, res) => {
  database.getResults(1, 2)
    .then(function(result) {
      console.log(result);
      res.render('results', {result});
    });
});

router.get('/:quiz/:id', (req, res) => {
database.getResultByID(req.params.id, req.params.quiz)
  .then(function(results) {
    console.log(results);
    res.json(results);
  });
});


module.exports = router;
