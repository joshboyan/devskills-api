'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const mongooseConnect = require('./mongooseConnect');
const jwt = require('jwt-simple');
const config = require('../config');
const isAuthenticated = require('./middleware/isAuthenticated');
const User = require('./models/user');
const countsRouter = require('./api/counts');
const skillRouter = require('./api/skills');
const port = process.env.PORT || 3899;

// App middleware
app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Content-Type",'application/json');
  next();
});

// Open a connection to the database
mongooseConnect();

// Answer API requests.
app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.json({ message: 'This is the base route for the DevSkills API. Remove directories from the URL to get to the docs.' });
});

// API routes
// User sign up and key retrieval
app.post('/api/users', ( req, res ) => {
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

// Middelware for authenticating valid JWT keys
app.use(isAuthenticated);

// sample eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.InNpbXBsZVBhc3Mi.JwiWpTMJmDqBWkhHOUg4lQESOy5fW-rbR_WfNIjsk80
// Info about all the skills
app.use('/api/skills', countsRouter);
// Info about a specfic skill
app.use('/api/skill', skillRouter);


// Serve the docs at the root URL
app.get('/', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

// All remaining requests return docs.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

// Log and send errors
app.use((err, req, res, next) => {
	if(err) {
		console.log(err.statusMessage);
		res.sendStatus(500).send(err);
	}
	next();
});

app.listen(port,
	console.log('API listening on port:', port));

module.exports = app;
