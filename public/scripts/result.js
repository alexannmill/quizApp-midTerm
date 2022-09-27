const database = require('./get-result.js');
database.getResults(1)
  .then(res => {
    console.log(res);
  })

