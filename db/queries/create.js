const db = require("../connection");

const generateRandomNumber = () => {
  return Math.random().toString(36).substring(2, 8);
};
exports.generateRandomNumber = generateRandomNumber;

const quizVSuser = (id) => {
  return db
    .query(
      `SELECT user_id
    FROM quizzes
    WHERE id = $1`,
      [id]
    )
    .then((result) => {
      const user = result.rows[0];
      return user;
    });
};
exports.quizVSuser = quizVSuser;

// all's need to be made before quiz (FK)
const createQuestion = (question, quiz_id) => {
  return db
    .query(
      `
  INSERT INTO questions
  (quiz_id, question, correct, answer1, answer2, answer3, answer4)
  VALUES
  ($1, $2, $3, $4, $5, $6, $7)
  RETURNING *`,
      [
        quiz_id,
        question.question,
        question.correct,
        question.answer1,
        question.answer2,
        question.answer3,
        question.answer4,
      ]
    )
    .then((result) => {
      const question = result.rows[0];
      return question;
    })
    .catch((err) => {
      console.log("err:", err);
    });
};
exports.createQuestion = createQuestion;

//change user
const createQuiz = (name, shortURL, userID) => {
  return db
    .query(
      `INSERT INTO quizzes
  (name, short_url, user_id, is_visible)
  VALUES
  ($1, $2, $3, $4)
  RETURNING *`,
      [name, shortURL, userID, false]
    )
    .then((result) => {
      const quiz = result.rows[0];
      return quiz;
    });
};
exports.createQuiz = createQuiz;

const quizVisible = (id) => {
  return db
    .query(
      `
  UPDATE quizzes
  SET is_visible = true
  WHERE id = $1
  RETURNING *
 `,
      [id]
    )
    .then((result) => {
      const quiz_id = result.rows[0].id;
      return quiz_id;
    });
};
exports.quizVisible = quizVisible;

const numOfQuestions = (quiz_id) => {
  return db
    .query(
      `
    SELECT count(*) AS num_of_questions
    FROM questions
    WHERE quiz_id = $1
    `,
      [quiz_id]
    )
    .then((result) => {
      const numOFquestions = result.rows[0].num_of_questions;
      return numOFquestions;
    });
};
exports.numOfQuestions = numOfQuestions;

const collectForReport = (id) => {
  return db
    .query(
      `
      SELECT quiz_id, question, correct, answer1, answer2, answer3, answer4
      FROM questions
      JOIN quizzes ON quizzes.id = quiz_id
      WHERE quiz_id = $1
      `,
      [id]
    )
    .then((result) => {
      const quizData = result.rows;
      return quizData;
    });
};
exports.collectForReport = collectForReport;
