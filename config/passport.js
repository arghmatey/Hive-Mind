var passport = require("passport");
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
var LocalStrategy = require("passport-local").Strategy;
var JWTStrategy = require("passport-jwt").Strategy;
var ExtractJWT = require("passport-jwt").ExtractJwt;
var JWT_SECRET = process.env.JWT_SECRET;
var User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK,
    },
    async function (accessToken, refreshToken, profile, cb) {
      try {
        const user = await User.findOne({ googleId: profile.id });

        if (user && !user.avatar && profile.photos[0].value) {
          user.avatar = profile.photos[0].value;
          await user.save();
          return cb(null, user);
        }
        var newUser = new User({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
        });
        await newUser.save();
        return cb(null, newUser);
      } catch (error) {
        return cb(error);
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy(async function (username, password, done) {
    try {
      const user = await User.findOne({ email: username });

      if (!user) {
        return done(null, false, { message: "Invalid username." });
      }
      if (user.password != password) {
        return done(null, false, { message: "Invalid password." });
      }

      return done(null, user);
    } catch (error) {
      return cb(error);
    }
  })
);

passport.use(
  "signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    async function (req, username, password, done) {
      try {
        const newUser = new User({
          name: req.body.name,
          email: username,
          password,
        });

        await newUser.save();
        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

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
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
