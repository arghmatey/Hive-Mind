const Report = require('../models/report');

module.exports = {
  create
};

function create(req, res) {
  Report.findById(req.params.id, function(err, report) {
    report.comments.push(req.body);
    report.save(function(err) {
      res.redirect('/reports');
    });
  });
}