const express = require('express');
const resourcesRouter = express.Router();
const config = require('../../config');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Get all the skills resources
resourcesRouter.get('/', (req, res) => {

});

//Set up a skill route
resourcesRouter.route('/:skill')

	// Get the resources for a certain skill
    .get((req, res) => {

    })

	// Add a resource for a skill
	.post((req, res) => {

	});

module.exports = resourcesRouter;