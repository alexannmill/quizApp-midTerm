const express = require("express");
const { Pool } = require("pg");
const router = express.Router();
//db connection
const db = require("../db/queries/create");

//page for making quiz
//GET /create/
router.get("/", (req, res) => {
  res.render("create");
});

//name entered redirect to questions form
router.post("/", (req, res) => {
  const name = req.body.name;
  const shortURL = db.generateRandomNumber();
  db.createQuiz(name, shortURL)
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
  res.render("questions", { id });
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
