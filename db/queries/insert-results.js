const db = require("../connection");


// // INSERTS THE RESULT OF A SPECIFIC QUIZ DONE BY A USER
const insertResults = function(user_id, quiz_id, quiz_name, percentage, grade) {
  const queryString = `
  INSERT INTO results(user_id, quiz_id, quiz_name, result, grade) VALUES ($1, $2, $3, $4, $5)
  RETURNING *
  `;
  const values = [user_id, quiz_id, quiz_name, percentage, grade];
  return db.query(queryString, values)
  .then(function(results) {
    return results;
  });
}

module.exports = {
  insertResults
};
