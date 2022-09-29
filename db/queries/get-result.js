const db = require("../connection");


// GETS THE RESULT OF A SPECIFIC QUIZ FROM A USER
const getResults = function (id, quiz) {
  const queryString = `
SELECT name, grade, result, quiz_id, results.id as id, quiz_name
FROM users
JOIN results ON users.id = user_id
WHERE user_id = $1 AND quiz_id = $2
`;

const values = [id, quiz];
return db.query(queryString, values)
  .then(res => {
    return (res.rows);
  })
  .catch(err => {
    console.log(err);
  });
};

// GETS ALL RECENT QUIZ RESULTS FROM A USER
const getAllResults = function (id) {
  const queryString = `
SELECT name, grade, result, quiz_name
FROM users
JOIN results ON users.id = user_id
WHERE user_id = $1
`;

const values = [id];
return db.query(queryString, values)
  .then(res => {
    return (res.rows);
  })
  .catch(err => {
    console.log(err);
  });
};

// UPDATES THE RESULT OF A SPECIFIC QUIZ DONE BY A USER
const updateResult = function(user_id, quiz_id, percentage, grade) {
  const queryString = `
  UPDATE results
  SET grade = $1, result = $2
  WHERE user_id = $3 AND quiz_id = $4
  `;
  const values = [grade, percentage, user_id, quiz_id];
  return db.query(queryString, values)
  .then(res => {
    return (res.rows);
  })
  .catch(err => {
    console.log(err);
  });
};

// GETS THE DATA OF A SPECIFIC QUIZ
const getQuizByID = function(quiz) {
  const queryString = `
  SELECT quiz_id, question, correct, answer1, answer2, answer3, answer4, name
  FROM questions
  JOIN quizzes ON quizzes.id = quiz_id
  WHERE quiz_id = $1
  `;
  const values = [quiz];
return db.query(queryString, values)
  .then(res => {
    return (res.rows);
  })
  .catch(err => {
    console.log(err);
  });
};


module.exports = {
  getResults,
  getQuizByID,
  updateResult,
  getAllResults
}
