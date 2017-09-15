const express = require('express');
const skillsRouter = express.Router();
const config = require('../../config');
const Count = require('../models/count');

// Get all the data
skillsRouter.get('/', (req, res) => {
    Count.find({}, (error, counts) => {
      if(err) {
        console.log(err);
      } else {
        res.json(counts);
      }
    })
});

// Get the latest data added
skillsRouter.get('/latest', (req, res) => {

});

// Get average of all data
skillsRouter.get('/average', (req, res) => {

}); 

// Get all the data about a certain skill
skillsRouter.get('/:skill', (req, res) => {

});

// Get the latest data about a certain skill
skillsRouter.get('/:skill/latest', (req, res) => {

});

// Get average data for a certain skill
skillsRouter.get('/:skill/average', (req, res) => {

});

module.exports = skillsRouter;