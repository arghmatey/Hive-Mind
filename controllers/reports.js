const Users = require('../models/user');
const Reports = require('../models/report');

module.exports = {
  index,
  allBooks,
  create,
  delete: deleteOne
};

function index(req, res, next) {
  Reports.find({}).sort('-createdAt').exec(function(err, reports) {
    res.render('reports/index', {reports, user: req.user});
  })
}

function allBooks(req, res) {
  Reports.find({}, function(err, reports) {
    res.render('reports/all', reports)
  })
}

function create(req, res) {
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
