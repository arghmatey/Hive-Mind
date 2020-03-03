const Users = require('../models/user');
const Reports = require('../models/report');

module.exports = {
  index,
  create,
  delete: deleteOne
};

function index(req, res, next) {
  Reports.find({}).sort('-createdAt').populate('userReporting').exec(function(err, reports) {
    console.log(reports)
    res.render('reports/index', {reports, user: req.user});
  })
}

function create(req, res) {
  req.body.userReporting = req.user._id;
  const report = new Reports(req.body);
  report.save(function(err) {
    if (err) return res.redirect('/reports');
    console.log(report);
    res.redirect('/reports');
  });
}

function deleteOne(req, res) {
  Reports.findByIdAndRemove(req.params.id, function (err, report) {
      res.redirect('/reports');
  });
}
