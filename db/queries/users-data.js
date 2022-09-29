const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

const insertUsers = function(name) {
  const queryString = `
  INSERT INTO users(name) VALUES ($1)
  RETURNING *
  `;
  const values = [name];
  return pool.query(queryString, values)
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
  return pool.query(queryString, values)
  .then(function(results) {
    return results.rows;
  });
}

module.exports = {
  insertUsers,
  getUsers
};
