module.exports.new = function(req, res, next) {
  res.render('users/new');
};

module.exports.users = function(req, res, next) {
  var username = req.body.username;
  res.redirect('users/' + username);
};

module.exports.overview = function(req, res, next) {
  var welcome = "Let's get started!";
  res.render('users/overview', { welcomeMessage: welcome });
};
