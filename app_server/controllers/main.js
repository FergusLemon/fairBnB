module.exports.index = function(req, res, next) {
  res.render('index');
};

module.exports.authenticateUser = (req, res) => {
  let userId = req.session.passport.user;
  res.redirect('/users/' + userId);
};

module.exports.signOut = (req, res) => {
  req.logout();
  res.redirect('/');
};
