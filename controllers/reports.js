const User = require("../models/user");
const Report = require("../models/report");

module.exports = {
  create,
};

function create(req, res) {
  try {
    const user = User.findById(req.user._id);
    req.body.user = user;
    req.body.movieId = req.params.id;

    const report = new Report(req.body);
    report.save();
    user.reports.push(report);
    user.save();

    user.watchList.remove(req.params.mid);
    user.save();

    res.redirect(`back`);
  } catch (error) {
    console.error(error);
  }
}
