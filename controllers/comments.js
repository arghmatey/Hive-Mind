const Report = require('../models/report');

module.exports = {
  create
};

function create(req, res) {
  Report.findById(req.params.id, function(err, report) {
    if (err) return res.redirect('/');
    req.body.userId = req.user._id
    req.body.userName = req.user.name;
    console.log(req.body);
    report.comments.push(req.body);
    report.save(function(err) {
      res.redirect('/reports');
    });
  });
}