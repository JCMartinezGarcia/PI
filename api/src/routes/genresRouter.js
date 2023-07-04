const { Router } = require('express');
const genresRouter = Router();
const { getAllGenresHandler } = require('../handlers');

genresRouter.get('/', getAllGenresHandler);

module.exports = genresRouter;