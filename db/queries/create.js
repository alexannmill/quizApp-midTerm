const db = require("../connection");

//generate shortURL link
const generateRandomNumber = () => {
  return Math.random().toString(36).substring(2, 8);
};
exports.generateRandomNumber = generateRandomNumber;

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
    });
};
exports.createQuestion = createQuestion;

//change user
const createQuiz = (name, shortURL) => {
  return db
    .query(
      `INSERT INTO quizzes
  (name, short_url, user_id, is_visable)
  VALUES
  ($1, $2, $3, $4)
  RETURNING *`,
      [name, shortURL, 1, false]
    )
    .then((result) => {
      const quiz = result.rows[0];
      return quiz;
    });
};
exports.createQuiz = createQuiz;

const finishQuiz = (id) => {
  return db
    .query(
      `
  UPDATE quizzes
  SET is_visable = true
  WHERE id = $1
 `,
      [id]
    )
    .then(() => {});
};
exports.finishQuiz = finishQuiz;
