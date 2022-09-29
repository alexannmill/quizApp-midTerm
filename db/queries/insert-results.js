const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const insertResults = function(user_id, quiz_id, quiz_name, percentage, grade) {
  const queryString = `
  INSERT INTO results(user_id, quiz_id, quiz_name, result, grade) VALUES ($1, $2, $3, $4, $5)
  RETURNING *
  `;
  const values = [user_id, quiz_id, quiz_name, percentage, grade];
  return pool.query(queryString, values)
  .then(function(results) {
    return results;
  });
}

module.exports = {
  insertResults
};
