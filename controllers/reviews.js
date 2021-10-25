const User = require('../models/user');
const Review = require('../models/review');

module.exports = {
  create
};

function create(req, res) {
  User.findById(req.user._id, function (err, user) {
    req.body.user = user;
    req.body.sciFiId = req.params.id;
    const review = new Review(req.body);

    if (err) return res.redirect('./');

    user.reviews.push(review);
    user.save();

    review.save(function (err) {
      res.redirect(`back`);
    });
  });
}