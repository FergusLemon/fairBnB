var app = require('./app');
var port = process.env.PORT || 3000;
var path = require('path');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/index.html'));
  res.status(200);
});

app.get('/user/new', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/user/new.html'));
});

var server = app.listen(port, function() {
  console.log("Server listening on port", port);
});
