let express = require('express');
let router = express.Router();
let sessionController = require('../controllers/session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../../app_api/models/users');

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.comparePassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    cb(err, user);
  });
});

router.get('/new', sessionController.new);

router.post('/', passport.authenticate('local', {
    failureRedirect: 'session/new',
    failureFlash: true
  }), sessionController.authenticateUser);

router.get('/:username', sessionController.overview);

module.exports = router;

