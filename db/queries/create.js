const db = require('../connection')

//generate shortURL link
const generateRandomNumber = () => {
  return Math.random().toString(36).substring(2, 8);
};
exports.generateRandomNumber = generateRandomNumber

// all's need to be made before quiz (FK)
const createQuestion = (question, quiz_id) => {
  return db.query(`
  INSERT INTO TABLE questions
  (quiz_id, question, correct, answer1, answer2, answer3, answer4)
  VALUES
  ($1, $2, $3, $4, $5, $6)`
  ,[quiz_id, question.question, question.correct, question.answer1, question.answer2, question.answer3, question.answer4])
  .then()
};
exports.createQuestion = createQuestion

//change user
const createQuiz = (name, shortURL) => {
  return db.query(`INSERT INTO quizzes
  (name, short_url, user_id, question1, question2, question3)
  VALUES
  ($1, $2, $3, $4, $5, $6)`
  ,[name, shortURL, 1, null, null, null])
  .then((result) => {
    const quiz = result.rows
    console.log('quiz:', quiz)
  })
  .catch((err) => {
    console.error(err)
  })
}
exports.createQuiz = createQuiz

const quizIdByURL = (shortURL) => {
  return db.query (`
  SELECT id
  FROM quizzes
  WHERE short_id = $1`
  ,[shortURL])
  .then((result) => {
    const quiz_id = result.rows[0];
  })
  .catch((err) => {
    console.error(err)
  })
}
exports.quizIdByURL = quizIdByURL
