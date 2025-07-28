const express = require('express');
const fishRouter = express.Router();
const { createFish, getAllFish } = require('../db/adapters/fish');
const catchAsync = require('../utils/catchAsync');
const {userAuth} = require('./middleware');


fishRouter.get('/', catchAsync(async (req, res, next) => {
    const fish = await getAllFish();
   
    res.send(fish);
}));

fishRouter.post('/', catchAsync(async (req, res, next) => {
    console.log(req.body, 'Request body for new fish');
    const { species, scientificName, location , userId} = req.body;
    if (!species || !scientificName || !location || !userId) {
        res.status(400).send({
            error: 'Missing fish data',
            name: 'MissingFishDataError',
            message: 'Please provide species, scientific name, location, and user ID'
        });
    } else {
        const newFish = await createFish({ species, scientificName, location, userId });
        res.send({
            fish: newFish,
            message: 'Fish added successfully',
            success: true
        });
    }
}));




module.exports = fishRouter; 