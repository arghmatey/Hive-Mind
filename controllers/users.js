const User = require('../models/user');

module.exports = {
  show
};

function show(req, res) {
  User.findById(req.params.id).populate('reports').exec(function (err, showUser) {
    if (err) return res.redirect('/');
    res.render('users/show', { showUser, user: req.user })
  })
}