const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User');
const mongoose = require('mongoose');
require('dotenv').config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  console.log('JWT Payload:', jwt_payload);
  try {
    const userId = new mongoose.Types.ObjectId(jwt_payload.userId);
    const user = await User.findById(userId);
    console.log('User found:', user);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    console.error('Error finding user:', err);
    return done(err, false);
  }
}));

const authenticateJWT = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      console.error('Authentication error:', err);
      return res.sendStatus(403);
    }
    if (!user) {
      console.error('User not found');
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = { authenticateJWT };
