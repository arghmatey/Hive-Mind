const User = require('../models/user');
const Report = require('../models/report');

module.exports = {
  show
};


function show(req, res) {
  User.findById(req.user._id).populate('reports').exec(function(err, user){
    if (err) return res.redirect('./');
    res.render('users/show', {user})
  })
}