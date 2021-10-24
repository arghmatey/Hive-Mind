var router = require('express').Router();
var usersCtrl = require('../controllers/users')
var passport = require('passport');
var jwt = require('jsonwebtoken');

router.get('/login', function (req, res) {
  res.render('users/login', {user: req.user})
});

router.get('/register', function (req, res) {
  res.render('users/register', {user: req.user})
});

router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/',
    failureRedirect: '/'
  }
));

router.post('/local-login', function (req, res, next) {
  passport.authenticate('login',
  {
    optional: false,
    successRedirect: '/',
    failureRedirect: '/'
  }, 
  function (err, user, info) {
    if (err) { 
      return next(err); 
    }
    if (!user) { return res.redirect('/login'); }
    req.login(user, { session: false }, function (err) {
      if (err) { return next(err); }
      const token = jwt.sign({ user }, SECRET, { expiresIn: '24h' });
      // const token = jwt.sign( user, SECRET, { expiresIn: '24h' });
      return res.json({ token });
      // return res.json({ user, token });
    });
  }
  )(req, res, next);
});

router.post('/local-signup', function (req, res, next) {
  passport.authenticate('signup', {
    successRedirect : '/', // redirect to the secure profile section
    failureRedirect : '/movies', // redirect back to the signup page if there is an error
  })(req, res, next)
});
  
router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;