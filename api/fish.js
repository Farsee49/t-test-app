const express = require('express');
const fishRouter = express.Router();
const { createFish, getAllFish } = require('../db/adapters/fish');
const catchAsync = require('../utils/catchAsync');


fishRouter.get('/', catchAsync(async (req, res, next) => {
    const fish = await getAllFish();
    res.cookie('name', 'test')
  console.log('Cookie set:', res.cookie);
    res.send(fish);
}));




module.exports = fishRouter; 