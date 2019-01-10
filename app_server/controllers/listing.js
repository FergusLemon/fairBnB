module.exports.new = function(req, res, next) {
  res.render('listings/new');
};

module.exports.listings = function(req, res, next) {
  res.render('listings/all', {
    properties: [{
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    }, {
      name: "Dummy Casa 1",
      description: "A great first dummy casa with fantastic views.",
      price: "100"
    }, {
      name: "Dummy Casa 2",
      description: "A cosy second dummy casa with superb amenities.",
      price: "50"
    }]
  });
};
