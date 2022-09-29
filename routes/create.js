const express = require("express");
const { Pool } = require("pg");
const router = express.Router();
//db connection
const db = require("../db/queries/create");

//page for making quiz
//GET /create/
router.get("/", (req, res) => {
  // const userID = req.session.user_id;
  // if (!user){
  //   res.status(400).send(`Please login to make a quiz.    <a href="/">Back Home</a>`);
  // }
  res.render("create", {  });
});

//name entered redirect to questions form
router.post("/", (req, res) => {
  // const userID = req.session.user_id;
  const name = req.body.name;
  const shortURL = db.generateRandomNumber();
  db.createQuiz(name, shortURL, 1)
    .then((quiz) => {
      const id = quiz.id;
      res.send({ id });
    })
    .catch((err) => {
      res.status(500).send();
      console.log(err);
    });
});

//questions form
//GET /create/:id
router.get(`/:id`, (req, res) => {
  const id = req.params.id;
  const userID = db.quizVSuser(id);
  // .then((id) => {
  //   console.log('userID:', userID);
  //   const user = req.session.user_id;
  //   if (!user_id || user_id !== user) {
  //     res.status(400).send(`Unable to assess quiz.    <a href="/">Back Home</a>`);
  //   }
  // })
  res.render("questions", { id, userID });
});

//adding questions to database
router.post("/:id", (req, res) => {
  const quiz_id = req.params.id;
  db.createQuestion(req.body, quiz_id)
    .then((question) => {
      db.numOfQuestions(question.quiz_id).then((numOfquestions) => {
        const numOFq = numOfquestions;
        const tempVars = {
          question,
          numOFq,
        };
        res.status(200).send(tempVars);
      });
    })
    .catch((err) => {
      res.status(500).send();
      console.log(err);
    });
});

//Once all questions are complete
router.post("/:id/public", (req, res) => {
  const quiz_id = req.params.id;
  // const user_id = db.quizVSuser(quiz_id)
  // const userID = req.session.user_id
  // if (!user || user_id !== user){
  //   res.status(400).send(`Unable to assess quiz.    <a `Unable to assess quiz.    <a href="/">Back Home</a>`)
  // }
  db.quizVisible(quiz_id).then((quiz_id) => {
    console.log("quizid:", quiz_id);
  });
  res.render("quiz", {id, userID});
});

//GET overview of created quiz
router.get("/:id/complete", (req, res) => {
  const id = req.params.id;
  // const user_id = db.quizVSuser(quiz_id)
  // const user = req.session.user_id
  // if (!user_id || user_id !== user){
  //   res.status(400).send(`Unable to assess quiz.    <a class="navbar-brand" href="/">Back Home</a>`)
  // }
  db.collectForReport(id)
  .then((quizData) => {
    res.status(200).send("create_quiz_overview", { id, quizData });
  })
});

module.exports = router;
