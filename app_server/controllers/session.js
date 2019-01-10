module.exports.new = function(req, res, next) {
  res.render('session/new');
};

module.exports.users = function(req, res, next) {
  var username = req.body.username;
  res.redirect('session/' + username);
};

module.exports.overview = function(req, res, next) {
  res.render('index');
};
