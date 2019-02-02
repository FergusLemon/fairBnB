'use strict';

module.exports.new = function(req, res) {
  let loginError = req.flash('error');
  res.render('session/new', { message: loginError });
};

module.exports.authenticateUser = (req, res) => {
  let userId = req.session.passport.user;
  res.redirect('/session/' + userId);
};

module.exports.overview = function(req, res) {
  let userId = req.params.userId;
  res.render('users/overview', { userId: userId });
};
