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

// API routes
app.use('/skills', skillsRouter);
app.use('/resouces', resoucesRouter)

// Log errors
app.use((err, req, res, next) => {
	if(err){
		console.log(err);
		res.status(500).send(err);
	}
})	
app.listen(port, 
  	console.log('API listening on port:', port))