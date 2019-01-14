module.exports.new = function(req, res) {
  res.render('users/new');
};

module.exports.users = function(req, res) {
  var username = req.body.username;
  res.redirect('users/' + username);
};

module.exports.overview = function(req, res) {
  var welcome = "Let's get started!";
  res.render('users/overview', { welcomeMessage: welcome });
};

module.exports.getBookingRequests = function(req, res) {
  res.render('users/bookingRequests', {
    bookingRequests: [{
      propertyName: 'Test Casa',
      propertyId: '1',
      requestorName: 'Test User',
      requestorId: '101',
      requestStartDate: '2019-12-25',
      requestEndDate: '2019-12-31',
      requestMadeDate: '2019-01-12'
    }]
  });
};
