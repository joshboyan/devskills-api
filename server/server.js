'use strict';
const config = require('../config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const skillsRouter = require('./api/skills');
const resoucesRouter = require('./api/resources');
const port = process.env.PORT || 3899;

// App middleware
app.use(morgan('dev'));
app.use(express.static('react-ui/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const mongoose = require('mongoose');
mongoose.connect(config.dbURI, {
	useMongoClient: true
});

// CONNECTION EVENTS
    // When successfully connected
    mongoose.connection.on('connected', function () {  
        console.log('Mongoose default connection open to ' + config.dbURI);
    }); 

    // If the connection throws an error
    mongoose.connection.on('error',function (err) {  
        console.log('Mongoose default connection error: ' + err);
    }); 

    // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {  
        console.log('Mongoose default connection disconnected'); 
    });

    // If the Node process ends, close the Mongoose connection 
    process.on('SIGINT', function() {  
        mongoose.connection.close(function () { 
            console.log('Mongoose default connection disconnected through app termination'); 
            process.exit(0); 
        }); 
    }); 

// API routes
app.use('/skills', skillsRouter);
app.use('/resouces', resoucesRouter)

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