const getAllGenresHandler = require('./genresHandlers');
const getAllPlatformsHandler = require('./platformsHandlers');

const {
    getVideoGamesHandler,
    getVideoGameDetailsHandler,
    createVideoGameHandler,
    uploadFileVideoGameHandler
} = require('./videoGamesHandlers');

module.exports = {
    getAllGenresHandler,
    getVideoGamesHandler,
    getVideoGameDetailsHandler,
    createVideoGameHandler,
    getAllPlatformsHandler,
    uploadFileVideoGameHandler
};