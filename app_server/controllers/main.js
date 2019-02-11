module.exports.index = function(req, res, next) {
  res.render('index');
};

module.exports.signOut = (req, res) => {
  req.logout();
  res.redirect('/');
};
