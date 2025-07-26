const imageRouter = require('express').Router();
const { getImageFiles } = require('../utils/nodefs');

imageRouter.get('/', (req, res) => {
    const images = getImageFiles();
    res.json(images);
});

module.exports = imageRouter;
