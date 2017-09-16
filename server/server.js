'use strict';
const config = require('../config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const countsRouter = require('./api/counts');
const resoucesRouter = require('./api/resources');
const port = process.env.PORT || 3899;

// App middleware
app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '../react-ui/build')));
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.header("Content-Type",'application/json');
  next();
});

const mongoose = require('mongoose');
mongoose.connect(config.dbURI, {
	useMongoClient: true
});

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected',  () =>  {  
    console.log('Mongoose default connection open to ' + config.dbURI);
}); 

// If the connection throws an error
mongoose.connection.on('error', err => {  
    console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected',  () =>  {  
    console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', () => {  
    mongoose.connection.close( () =>  { 
        console.log('Mongoose default connection disconnected through app termination'); 
        process.exit(0); 
    }); 
}); 

// Answer API requests.
app.get('/api', function (req, res) {
  res.set('Content-Type', 'application/json');
  res.send('{"message": "This is the base route for the DevSkills API. Remove directories from the URL to get to the docs."}');
});

// API routes
app.use('/api/skills', countsRouter);
app.use('/api/resouces', resoucesRouter)

// Serve the docs at the root URL
app.get('/', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});

// All remaining requests return the React app, so it can handle routing.
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, '../react-ui/build', 'index.html'));
});


// Log errors
app.use((err, req, res, next) => {
	if(err){
		console.log(err);
		res.status(500).send(err);
	}
});

app.listen(port, 
  	console.log('API listening on port:', port));

module.exports = app;