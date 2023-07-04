const { getAllGenres } = require('../controllers/genresController');

const getAllGenresHandler = async (req, res) => {
    try {
        const results = await getAllGenres();
        res.status(200).json(results);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

module.exports = getAllGenresHandler;