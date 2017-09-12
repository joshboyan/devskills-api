const config = require('../config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const port = process.env.PORT || 3899;

app.use(express.static('react-ui'));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.listen(port, 
  	console.log('API listening on port:', port))