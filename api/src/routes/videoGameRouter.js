const Router = require("express");
const videoGameRouter = Router();
const {
    getVideoGamesHandler,
    getVideoGameDetailsHandler,
    createVideoGameHandler,
    uploadFileVideoGameHandler,
} = require('../handlers');
// matching routes
videoGameRouter.get('/', getVideoGamesHandler);
videoGameRouter.get('/:id', getVideoGameDetailsHandler);
videoGameRouter.post('/', createVideoGameHandler);
videoGameRouter.post('/upload', uploadFileVideoGameHandler);
/**export */
module.exports = videoGameRouter;