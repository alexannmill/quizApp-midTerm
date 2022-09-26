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
  // db.createQuiz(name, shortURL);
 res.redirect(`/create/${shortURL}`)
});

//final page to send to db
//GET /create/:id
router.get('/:url', (req, res) => {
  console.log('req.params:', req.params)
  const url = req.params.name
  res.render('questions');
});

//form for each question
router.post('/:url', (res, req) => {
  db.query (``)
  .then(() => {

  })
});


//func for dropping name entry and appending questions
// const startQuiz = () => {
  //   const $main = $('#main');
//   // HTML for questions form
//   const $question = $(`  <section class="questionContainer">
//       <form action="/routes/create.js" method="post">
//         <textarea name="question" id="" cols="30" rows="10"></textarea>
//         <button type="submit">Start/button</button>
//        </form>
//     </section>
//     <section id="answerContainer">
//       <form class="anwsertext" action="/routes/create.js" method="post">
//         <textarea name="correct" id="" cols="30" rows="10"></textarea>
//        </form>
//       <form class="anwsertext" action="/routes/create.js" method="post">
//         <textarea name="answer1" id="" cols="30" rows="10"></textarea>
//        </form>
//       <form class="anwsertext" action="/routes/create.js" method="post">
//         <textarea name="answer2" id="" cols="30" rows="10"></textarea>
//        </form>
//       <form class="anwsertext" action="/routes/create.js" method="post">
//         <textarea name="answer3" id="" cols="30" rows="10"></textarea>
//        </form>
//       <form class="anwsertext" action="/routes/create.js" method="post">
//         <textarea name="answer4" id="" ></textarea>
//         <button type="submit">Start/button</button>
//        </form>
//     </section>`)

// //dropping name
//   $createContainer.detach();
// //appending questions
//   $question.append($main);
// };
// ($('.quizName').submit(function (e) {
//   e.preventDefault();
//   const name = $(this).serialize();
//   const shortURL = db.generateRandomNumber;
//   db.createQuiz(name, shortURL);
//   startQuiz();
// })
// //adding to data on submit and pulling up questions after name submission
// )





module.exports = router;
