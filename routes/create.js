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
  if (!req.body.name) {
    return res.status(403).send("Plz enter a name");
  }
  const name = req.body.name;
  const shortURL = db.generateRandomNumber();
  db.createQuiz(name, shortURL)
  .then((quiz) => {
    const id = quiz.id;
    console.log("id",id);
    res.redirect(`/create/${id}`);
  });
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
  console.log("quizID",quiz_id);
  console.log("req.body:", req.body);
  db.createQuestion(req.body, quiz_id)
    .then((question) => {
      console.log("then question:", question);
      res.status(200).send(question);
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
    res.status(200).send(quiz_id)
});

router.get("/:id/complete", (req, res) => {
  const quiz_id = req.params.id;
    res.render("results", quiz_id);
});
module.exports = router;
