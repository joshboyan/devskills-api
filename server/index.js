'use strict';
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const mongooseConnect = require('./mongooseConnect')
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
  res.send('{"message": "This is the base route for the DevSkills API. Remove directories from the URL to get to the docs."}');
});

// API routes
app.use('/api/skills', countsRouter);
app.use('/api/skill', skillRouter);

// Serve the docs at the root URL
app.get('/', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

// All remaining requests return docs.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});


// Log errors
app.use((err, req, res) => {
	if(err) {
		console.log(err);
		res.status(500).send(err);
	}
});

app.listen(port,
	console.log('API listening on port:', port));

module.exports = app;
