const express = require('express');
const resourcesRouter = express.Router();

// Get all the skills resources
resourcesRouter.get('/', (req, res) => {

});

//Set up a skill route
resourcesRouter.route('/:skill')

	// Get the resources for a certain skill
    .get('/:skill', (req, res) => {

    })

	// Add a resource for a skill
	.post('/:skill', (req, res) => {

	});

module.exports = resourcesRouter;