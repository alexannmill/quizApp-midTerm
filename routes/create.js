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
  db.createQuiz(name, shortURL).then((quiz) => {
    const id = quiz.id;
    console.log(id);
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
  console.log(quiz_id);
  console.log("req.body:", req.body);
  db.createQuestion(req.body, quiz_id)
    .then((question) => {
      console.log("question:", question);
      res.send(question);
    })
    .catch((err) => {
      res.status(500).send();
      console.log(err);
    });
});

router.post("/:id/complete", (req, res) => {
  const quiz_id = req.params.id;
  db.finishQuiz(quiz_id);
  res.render("results");
});

module.exports = router;
