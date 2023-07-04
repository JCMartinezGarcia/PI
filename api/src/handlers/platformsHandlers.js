const { getAllPlatforms } = require('../controllers/getAllPlatformsController');
const { cleanInfoPlatform } = require('./utilsHandlers/utils');

const getAllPlatformsHandler = async (req, res) => {
    try {
        const results = await getAllPlatforms();
        const platforms = cleanInfoPlatform(results);
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

module.exports = getAllPlatformsHandler;