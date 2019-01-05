var app = require('./app');
var port = process.env.PORT || 3000;
app.set('view engine', 'pug');

app.get('/', function(req, res) {
  res.render('index');
  res.status(200);
});

var server = app.listen(port, function() {
  console.log("Server listening on port", port);
});
