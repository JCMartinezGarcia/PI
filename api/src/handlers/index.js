//? import handlers
const getAllGenresHandler = require('./genresHandlers');
const getAllPlatformsHandler = require('./platformsHandlers');
const { getVideoGamesHandler, getVideoGameDetailsHandler, createVideoGameHandler } = require('./videoGamesHandlers');
//? export handlers
module.exports = {
    getAllGenresHandler,
    getVideoGamesHandler,
    getVideoGameDetailsHandler,
    createVideoGameHandler,
    getAllPlatformsHandler
}