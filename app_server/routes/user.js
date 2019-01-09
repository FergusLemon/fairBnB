var express = require('express');
var router = express.Router();

router.get('/new', function(req, res, next) {
  res.render('user/new');
});

router.post('/new', function(req, res, next) {
  var username = req.body.username;
  res.redirect('/user' + '/' + username);
});

router.get('/:username', function(req, res, next) {
  var welcome = "Welcome " + req.params.username + "!";
  res.render('index', { welcomeMessage: welcome });
});

module.exports = router;
