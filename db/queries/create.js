const db = require('../connection')

//generate shortURL link
const generateRandomNumber = () => {
  return Math.random().toString(36).substring(2, 8);
};
exports.generateRandomNumber = generateRandomNumber

// all's need to be made before quiz (FK)
const createQuestion = (question) => {
  return db.query(`
  INSERT INTO TABLE questions
  (question, correct, answer1, answer2, answer3, answer4)
  VALUES
  ($1, $2, $3, $4, $5, $6)`
  ,[])
  .then()
};
exports.createQuestion = createQuestion

//
const createQuiz = (name, shortURL) => {
  return db.query(`INSERT INTO TABLE quizzes
  (name, short_url, user_id, question1, question2, question3)
  VALUES
  ($1, $2, $3, $4, $5)`
  ,[name, shortURL,null, null, null])
  .then((result) => {
    const quiz = result.rows
    console.log('quiz:', quiz)
  })
}
exports.createQuiz = createQuiz

