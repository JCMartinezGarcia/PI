/**Imports  */
const { Router } = require("express");
const videoGameRouter = Router();
const {
    getVideoGamesHandler,
    getVideoGameDetailsHandler,
    createVideoGameHandler
} = require('../handlers');

// matching routes
videoGameRouter.get('/', getVideoGamesHandler);
videoGameRouter.get('/:id', getVideoGameDetailsHandler);
videoGameRouter.post('/', createVideoGameHandler);
/**export */
module.exports = videoGameRouter;