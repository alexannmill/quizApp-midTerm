const express = require('express');
const { Pool } = require('pg');
const router  = express.Router();
//db connection
const db = require('../db/queries/create')

//page for making quiz
//GET /create/
router.get('/', (req, res) => {
  res.render('create');
});

//final page to send to db
//GET /create/:id
router.get('/:id', (res, req) => {
  db.query (``)
  .then(() => {

  })
});





module.exports = router;
