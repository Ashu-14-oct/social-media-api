const User = require("../models/user");
const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
    },
    async function (email, password, done) {
      try {
        const user = await User.findOne({ email: email });
        if (!user || user.password != password) {
            console.log('Wrong password or email');
            return done(null, false);
        }

        return done(null, user);
      } catch (err) {
        console.log(err);
        return done(err);
      }
    }
  )
);

//serialize user
passport.serializeUser(function(user, done){
    done(null, user._id);
});

//deserialize user
passport.deserializeUser(async function(id, done){
    try{
        const user = await User.findById(id);
        return done(null, user);
    }catch(err){
        console.log(err);
        return done(err);
    }
});

//middleware for auth check
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
      return next();
  }
  return res.status(401).json({message: 'unauthorized'});
};


//for setting authenticated user in locals
passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated) {
      res.locals.user = req.user;
    }
  
    next();
  };

  module.exports = passport;
