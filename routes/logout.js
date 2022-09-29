const express = require('express');
const router  = express.Router();
const database = require('../db/queries/users-data.js');

router.post('/', (req, res) => {
  req.session = null;
  res.redirect('/');
});

module.exports = router;
