const User = require('../models/user');
const Report = require('../models/report');

module.exports = {
  index,
  create,
  delete: deleteOne,
  update
};

function index(req, res, next) {
  Report.find({}).sort('-createdAt').populate('userReporting').exec(function (err, report) {
    if (err) return res.redirect('./');
    res.render('reports/index', { report, user: req.user });
  })
}

function create(req, res) {
  req.body.userReporting = req.user._id;
  const report = new Report(req.body);
  User.findById(req.user._id, function (err, currUser) {
    if (err) return res.redirect('./');
    currUser.reports.push(report);
    currUser.save();
    report.save(function (err) {
      res.redirect('/reports');
    });
  });
}

function deleteOne(req, res) {
  Report.findByIdAndRemove(req.params.id, function (err, report) {
    if (err) return res.redirect('./');
    res.redirect('/reports');
  });
}

function update(req, res) {
  Report.findByIdAndUpdate(req.params.id, req.body, { new: true }, function (err, report) {
    if (err) return res.redirect('./');
    console.log(report);
    res.redirect('/reports');
  });
}
