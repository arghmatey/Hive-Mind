const request = require('request');
const User = require('../models/user');

module.exports = {
  create,
  delete: removeMovie,
};

function create(req, res) {
  User.findById(req.params.uid, function (err, user) {
    if (err) return res.redirect('/error');
      req.body.id = req.params.mid;
      user.watchList.push(req.body);
      user.save(function (err) {
        res.redirect(`back`);
      });
  });
}

function removeMovie(req, res) {
  User.findById(req.params.uid, function (err, user) {
    if (err) return res.redirect('/error');
    user.watchList.remove(req.params.mid);
    user.save(function (err) {
      res.redirect(`back`);
    });
  });
}