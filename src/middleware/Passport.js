
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: JwT_SECRET
};

passport.use(new JwtStrategy(options, (payload, done) => {
  // Find the user in the database and return it
  // Call done() with an error if the user doesn't exist
  done(null, user);
}));
