const db = require("../connection");


const getUserQuizzes = function(id) {

  const queryString = `
  SELECT id, name
  FROM quizzes
  WHERE user_id = $1
  ORDER BY id DESC;
  `;

  const values = [id];

  return db.query(queryString, values)
  .then(res => {
    return res.rows;
  })
  .catch(err => {
    console.log(err);
  });
};

module.exports = {
  getUserQuizzes,
}
