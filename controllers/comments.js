const Report = require('../models/report');

module.exports = {
  create,
  delete: deleteComment
};

function create(req, res) {
  Report.findById(req.params.id, function(err, report) {
    if (err) return res.redirect('./');
    req.body.userId = req.user._id
    req.body.userName = req.user.name;
    console.log(req.body);
    report.comments.push(req.body);
    report.save(function(err) {
      res.redirect(`back`);
    });
  });
}

function deleteComment(req, res) {
  Report.findById(req.params.rid, function(err, foundReport){
    if (err) return res.redirect('./');
    foundReport.comments.remove(req.params.cid);
    foundReport.save(function(err){
      res.redirect(`back`);
    });
  }) 
}