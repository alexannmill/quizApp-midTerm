const express = require('express');
const router  = express.Router();
const database = require('../db/queries/get-result');

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.render('quiz');
});

router.get('/data/:id', (req, res) => {
  const quiz_id = req.params.id;
  database.getQuizByID(quiz_id)
  .then(function(results) {
    res.json(results);
  })
});

module.exports = router;
