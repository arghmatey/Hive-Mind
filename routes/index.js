var express = require('express');
var passport = require('passport');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/reports',
    failureRedirect: '/reports'
  }
));
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
