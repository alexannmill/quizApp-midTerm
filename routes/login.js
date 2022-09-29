const express = require('express');
const router  = express.Router();
const database = require('../db/queries/users-data.js');

router.post('/', (req, res) => {
  const name = req.body.name.trim();
  let logOrReg = req.body.login;
  if (logOrReg === "login") {
    database.getUsers(name)
    .then (function(results) {
      if(results.length === 0) {
        return res.status(400).send({message: "This user does not exist!"});
      } else {
        const user = results[0].id;
        req.session.user_id = user;
        res.redirect('/');
      }
    });
  } else if (logOrReg === "register") {
    database.getUsers(name)
    .then (function(results) {
      if(results.length === 0) {
        database.insertUsers(name)
          .then(function(updatedResults) {
            const user = updatedResults.rows[0].id;
            req.session.user_id = user;
            res.redirect('/');
          });
      } else {
        return res.status(400).send({message: "This user already exists!"});
      }
    });
  }
});

module.exports = router;
