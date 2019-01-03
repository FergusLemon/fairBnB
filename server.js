var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.status(200).send("Checking nodemon works.");
});

app.listen(3000, function() {
  console.log("Server listening on port", 3000)
});
