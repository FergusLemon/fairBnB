var app = require('./app');
var port = process.env.PORT || 3000;
var path = require('path');
//app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/views/index.html'));
  res.status(200);
});

var server = app.listen(port, function() {
  console.log("Server listening on port", port);
});
