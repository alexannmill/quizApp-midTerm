const express = require('express');
const router  = express.Router();
const database = require('../db/queries/users-data.js');

router.post('/', (req, res) => {
  const name = req.body.name;
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
        const user = results[0].id;
        req.session.user_id = user;
        console.log(req.session.user_id);
        res.redirect('/');
      }
    });
});

module.exports = router;
