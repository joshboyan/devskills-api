const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('./models/user');
const config = require('../config');

module.exports = function(passport) {
  const opts = {};
	opts.jwtFromRequest = ExtractJwt.fromUrlQueryParameter('key');
  opts.secretOrKey = config.secret;
  passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    User.findOne({ id: jwt_payload.id }, function(err, user) {
          if(err) {
              return done(err, false);
          }
          if(user) {
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));
};
