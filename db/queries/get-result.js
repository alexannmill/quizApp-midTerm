const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const getResults = function (id, quiz) {
  const queryString = `
SELECT name, grade, result, quiz_id, results.id as id
FROM users
JOIN results ON users.id = user_id
WHERE user_id = $1 AND quiz_id = $2
`;
const values = [id, quiz];
return pool.query(queryString, values)
  .then(res => {
    return (res.rows);
  })
  .catch(err => {
    console.log(err);
  });
}
const getResultByID = function(id, quiz) {
  const queryString = `
  SELECT name, grade, result, quiz_id, results.id as id
  FROM users
  JOIN results ON users.id = user_id
  WHERE results.id = $1 AND quiz_id = $2
  `;
  const values = [id, quiz];
return pool.query(queryString, values)
  .then(res => {
    return (res.rows);
  })
  .catch(err => {
    console.log(err);
  });
}

const getQuizByID = function(quiz) {
  const queryString = `
  SELECT name, grade, result, quiz_id, results.id as id
  FROM questions
  JOIN quizzes ON quizzes.id = quiz_id
  WHERE quiz_id = $1
  `;
  const values = [quiz];
return pool.query(queryString, values)
  .then(res => {
    return (res.rows);
  })
  .catch(err => {
    console.log(err);
  });
}



module.exports = {
  getResults,
  getResultByID,
  getQuizByID
}
