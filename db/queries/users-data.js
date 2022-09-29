const db = require("../connection");

const insertUsers = function(name) {
  const queryString = `
  INSERT INTO users(name) VALUES ($1)
  RETURNING *
  `;
  const values = [name];
  return db.query(queryString, values)
  .then(function(results) {
    return results;
  });
}

const getUsers = function(user) {
  const queryString = `
  SELECT id
  FROM users
  WHERE name = $1
  `;
  const values = [user];
  return db.query(queryString, values)
  .then(function(results) {
    return results.rows;
  });
}

module.exports = {
  insertUsers,
  getUsers
};
