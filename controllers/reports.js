const User = require('../models/user');
const Report = require('../models/report');

module.exports = {
  index,
  create,
  delete: deleteOne,
  update
};

function index(req, res, next) {
  Report.find({}).sort('-createdAt').populate('userReporting').exec(function(err, report) {
    console.log(report)
    res.render('reports/index', {report, user: req.user});
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
  Report.findByIdAndRemove(req.params.id, function (err, report) {
      res.redirect('/reports');
  });
}

function update(req, res) {
  Report.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, report){
    console.log(report)
    res.redirect('/reports');
  });
}
