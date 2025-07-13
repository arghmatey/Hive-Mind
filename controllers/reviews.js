const User = require("../models/user");
const Review = require("../models/review");

module.exports = {
  create,
};

function create(req, res) {
  try {
    const user = User.findById(req.user._id);
    req.body.user = user;
    req.body.sciFiId = req.params.id;

    const review = new Review(req.body);
    review.save();
    user.reviews.push(review);
    user.save();

    user.watchList.remove(req.params.mid);
    user.save();

    res.redirect(`back`);
  } catch (error) {
    console.error(error);
  }
}
