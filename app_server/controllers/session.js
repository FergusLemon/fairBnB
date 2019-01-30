'use strict';

module.exports.new = function(req, res) {
  let loginError = req.flash('error');
  res.render('session/new', { message: loginError });
};

module.exports.authenticateUser = (req, res) => {
  let username = req.body.username;
  res.redirect('/session/' + username);
};

module.exports.overview = function(req, res) {
  let id = req.params.username;
  res.render('users/overview', { id: id });
};
