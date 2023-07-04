/**Imports  */
const { Router } = require("express");
const videoGameRouter = Router();
//?import handlers
const { getVideoGamesHandler, getVideoGameDetailsHandler, createVideoGameHandler } = require('../handlers');
//? matching routes with handler callbacks
videoGameRouter.get('/', getVideoGamesHandler);
videoGameRouter.get('/:id', getVideoGameDetailsHandler);
videoGameRouter.post('/', createVideoGameHandler);

module.exports = videoGameRouter;