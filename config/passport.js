var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var LocalStrategy = require('passport-local').Strategy;
var JWTStrategy = require('passport-jwt').Strategy;
var ExtractJWT = require('passport-jwt').ExtractJwt;
var JWT_SECRET = process.env.JWT_SECRET;
var User = require('../models/user');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK
},
  function (accessToken, refreshToken, profile, cb) {
    User.findOne({ 'googleId': profile.id }, function (err, user) {
      if (err) return cb(err);
      if (user) {
        if (!user.avatar) {
          user.avatar = profile.photos[0].value;
          user.save(function (err) {
            return cb(null, user);
          });
        } else {
          return cb(null, user);
        }
      } else {
        var newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
        newUser.save(function (err) {
          if (err) return cb(err);
          return cb(null, newUser);
        });
      };
    });
  }
));

passport.use(
  'login',
  new LocalStrategy(
  function(username, password, done) {
    User.findOne({ 'email': username }, function(err, user) {
      if (err) return done(err);
      if (!user) {
        return done(null, false, { message: 'Invalid username.' });
      }
      if ((user.password != password)) {
        return done(null, false, { message: 'Invalid password.' });
      }
      return done(null, user);
    })
  }
))

passport.use(
  'signup',
  new LocalStrategy({
    passReqToCallback: true
  },
  function(req, username, password, done) {
    const newUser = new User({
      name: req.body.name,
      email: username,
      password
    });
    newUser.save(function(err) {
      if (err) {
        return done(err);
      }
      return done(null, newUser);
    })
  }
))

// authentication for protected routes 
// passport.use(new JWTStrategy({
//   jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//   secretOrKey: JWT_SECRET,
// }, 
//   function(jwt_payload, done){
//     console.log(jwt_payload)
//     TokenUser.findOne({id: jwt_payload.sub}, function (err, user) {
//       if (err) {
//         return done(err, false);
//       }
//       if (user) {
//         return done(null, user);
//       } else {
//         return done(null, false);
//       }
//     })
//   }
// ))

passport.serializeUser(function (user, done) {
  done(null, user.id)
})

passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});