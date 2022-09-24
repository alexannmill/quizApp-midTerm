const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
  res.render('create');
});

//client jquery new quiz




module.exports = router;
