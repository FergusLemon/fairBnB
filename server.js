var app = require('./app');
var port = process.env.PORT || 3000;

app.get('/', function(req, res) {
  res.status(200).send("Checking nodemon works.");
});

var server = app.listen(port, function() {
  console.log("Server listening on port", port);
});
