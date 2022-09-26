const express = require('express');
const { Pool } = require('pg');
const router  = express.Router();
//db connection
const db = require('../db/queries/create')

//page for making quiz
//GET /create/
router.get('/', (req, res) => {
  res.render('create');
});

//name entered redirect to questions form
router.post('/', (req, res) => {
  if (!req.body.name) {
    return res.status(403).send("Plz enter a name");
  }
  const name = req.body.name;
  const shortURL = db.generateRandomNumber();
  db.createQuiz(name, shortURL);
 res.redirect(`/create/${shortURL}`)
});

//questions form
//GET /create/:id
router.get('/:url', (req, res) => {
  res.render('questions');
});

//adding questions to database
router.post("/:id", (req, res) => {
  const quiz_id = db.quizIdByURL(req.params)
  console.log('req.body:', req.body)
  console.log('quiz_id:', quiz_id)
  res.json(question)
});



module.exports = router;
