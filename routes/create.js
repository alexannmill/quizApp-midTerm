const express = require("express");
const { Pool } = require("pg");
const router = express.Router();
//db connection
const db = require("../db/queries/create");

//page for making quiz
//GET /create/
router.get("/", (req, res) => {
  const userID = req.session.user_id
  if (!userID){
    res.status(400).send(`Please login to make a quiz.    <a href="/">Back Home</a>`)
  }
  res.render("create", {userID});
});

//name entered redirect to questions form
router.post("/", (req, res) => {
  const name = req.body.name;
  const userID = req.session.user_id;
  const shortURL = db.generateRandomNumber();
  db.createQuiz(name, userID,shortURL)
  .then((quiz) => {
    const id = quiz.id;
    res.send({id})
  })
  .catch((err) => {
    res.status(500).send();
    console.log(err);
  })
});

//questions form
//GET /create/:id
router.get(`/:id`, (req, res) => {
  const id = req.params.id;
  console.log(id);
  const userID = req.session.user_id;
  db.quizVSuser(id)
  .then(function(results){
    console.log(userID);
    if (!userID || results.user_id !== userID){
      res.status(400).send(`Unable to assess quiz.    <a class="navbar-brand" href="/">Back Home</a>`);
    }
    res.render("questions", { id, userID });
  })

});

//adding questions to database
router.post("/:id", (req, res) => {
  const quiz_id = req.params.id;
  db.createQuestion(req.body, quiz_id)
    .then((question) => {
      db.numOfQuestions(question.quiz_id)
      .then((numOfquestions) => {
        const numOFq = numOfquestions
        const tempVars = {
          question, numOFq
        };
          res.status(200).send(tempVars);
      })
    })
    .catch((err) => {
      res.status(500).send();
      console.log(err);
    });
});

//Once all questions are complete compiling all together
router.post("/:id/complete", (req, res) => {
  const quiz_id = req.params.id;
  db.quizVisible(quiz_id)
  .then((quiz_id)=> {
    console.log('quizid:', quiz_id)
  })
  res.status(200).send(quiz_id)
});


router.get("/:id/complete", (req, res) => {
  const id = req.params.id;
  res.render("create_quiz_overview", {id})
})

module.exports = router;
