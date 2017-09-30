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

module.exports = usersRouter;
