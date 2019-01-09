var express = require('express');
var router = express.Router();

router.get('/new', function(req, res, next) {
  res.render('users/new');
});

router.post('/', function(req, res, next) {
  var username = req.body.username;
  res.redirect('/users' + '/' + username);
});

router.get('/:username', function(req, res, next) {
  var welcome = "Let's get started!";
  res.render('users/overview', { welcomeMessage: welcome });
});

module.exports = router;
