const express = require('express');
const usersRouter = express.Router();
const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../../config');

usersRouter.post('/', ( req, res ) => {
	if(!req.body.email || !req.body.password) {
    res.json({ success: false, msg: 'Please submit email and password.' });
  } else {
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
			key: jwt.encode(req.body.password, config.secret)
    });
    // save the user
    newUser.save( err => {
      if( err ) {
        return res.json({ success: false, msg: 'Username already exists.' });
      }
      res.json({ success: true, msg: 'Successful created new user.', key: newUser.key });
    });
  }
});

// Allow users to access their key
usersRouter.post('/key', (req, res) => {
	User.findOne({
    name: req.body.name
  }, function(err, user) {
    if(err) throw err;

    if(!user) {
      res.json({ success: false, msg: 'Authentication failed. User not found.' });
    } else {
      // check if password matches
      user.comparePassword(req.body.password, (err, isMatch) => {
        if(isMatch && !err) {
          // return the information including token
          res.json({ success: true, key: user.key });
        } else {
          res.json({ success: false, msg: 'Authentication failed. Wrong password.' });
        }
      });
    }
  });
})

module.exports = usersRouter;
