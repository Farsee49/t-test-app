const express = require('express');
const fishRouter = express.Router();
const { createFish, getAllFish } = require('../db/fish');


fishRouter.get('/', async (req, res, next) => {
    try {
        const fish = await getAllFish();
        res.send(fish);
    } catch (error) {
        next(error);
    }
}
);


module.exports = fishRouter; 