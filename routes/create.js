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

//func for dropping name entry and appending questions
const startQuiz = $(() => {
  const $main = $('#main');
  // HTML for questions form
  const $question = $(`  <section class="questionContainer">
      <form action="/routes/create.js" method="post">
        <textarea name="question" id="" cols="30" rows="10"></textarea>
        <button type="submit">Start/button</button>
       </form>
    </section>
    <section id="answerContainer">
      <form class="anwsertext" action="/routes/create.js" method="post">
        <textarea name="correct" id="" cols="30" rows="10"></textarea>
       </form>
      <form class="anwsertext" action="/routes/create.js" method="post">
        <textarea name="answer1" id="" cols="30" rows="10"></textarea>
       </form>
      <form class="anwsertext" action="/routes/create.js" method="post">
        <textarea name="answer2" id="" cols="30" rows="10"></textarea>
       </form>
      <form class="anwsertext" action="/routes/create.js" method="post">
        <textarea name="answer3" id="" cols="30" rows="10"></textarea>
       </form>
      <form class="anwsertext" action="/routes/create.js" method="post">
        <textarea name="answer4" id="" ></textarea>
        <button type="submit">Start/button</button>
       </form>
    </section>`)

//dropping name
  $createContainer.detach();
//appending questions
  $question.append($main);
})
//adding to data on submit and pulling up questions after name submission
($('.quizName').submit(function (e) {
  e.preventDefault();
  const name = $(this).serialize();
  const shortURL = db.generateRandomNumber;
  db.createQuiz(name, shortURL);
  startQuiz();
})
)


// //name entered redirect to questions form
// router.post('/', (req, res) => {
//   // if (!req.body.text) {
//   //   alert("Plz enter a name");
//   //   return;
//   // }
//   console.log('req.body:', req.body)
//   const name = req.body;
//   const shortUrl = db.generateRandomNumber();
//   console.log('shortUrl:', shortUrl)
//   console.log('req.body:', req.body)
//  res.redirect(`/create/${shortUrl}`);
// });

// //final page to send to db
// //GET /create/:id
// router.get('/:url', (req, res) => {
//   console.log('req.params:', req.params)
//   const url = req.params.name
//   res.render('questions');
// });

// //form for each question
// router.post('/:url', (res, req) => {
//   db.query (``)
//   .then(() => {

//   })
// });


//   //questions append




module.exports = router;
