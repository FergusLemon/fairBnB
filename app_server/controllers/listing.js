module.exports.new = function(req, res, next) {
  res.render('listings/new');
};

module.exports.listings = function(req, res, next) {
  res.render('listings/all', {
    property: {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    }
  });
};
