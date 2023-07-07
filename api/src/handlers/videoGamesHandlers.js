//? import the controllers
const { getVideoGames, getVideoGamesDetails, getVideoGamesByName, createVideoGame } = require('../controllers/videoGamesContoller');
const { cleanGenres, cleanVideoGame, isNumber } = require('./utilsHandlers/utils');
//? handler functions
const getVideoGamesHandler = async (req, res) => {

    const { name } = req.query;

    try {
        if (name) {
            const result = await getVideoGamesByName(name);
            let i = result.length - 1;
            if (!result[i].found) { res.status(404).send(result[i].message) }
            else {
                result.pop();
                const resultsResponse = cleanVideoGame(result);
                res.status(200).json(resultsResponse);
            }

        } else {
            const results = await getVideoGames();
            const allGames = cleanVideoGame(results);
            res.status(200).json(allGames);
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const getVideoGameDetailsHandler = async (req, res) => {
    const { id } = req.params;
    let source = '';
    let detailsResponse = [];
    source = (isNumber(id)) ? 'api' : 'db';
    try {
        const result = await getVideoGamesDetails(id, source);
        detailsResponse = cleanVideoGame(result);
        res.status(200).json(detailsResponse);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }

};

const createVideoGameHandler = async (req, res) => {
    //? destructure body
    const { name, description, platforms, image, released, rating, genres } = req.body;
    //? get just the props you need
    const oGenres = cleanGenres(genres)
    //? create the object to be created
    const oVideoGameGenres = { name, description, platforms, image, released, rating, genres };
    /***Try catch */
    try {
        //? call the controller function  to create videogame
        const result = await createVideoGame(oVideoGameGenres);
        //? return response 200
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}
//? export handler functions
module.exports = { getVideoGamesHandler, getVideoGameDetailsHandler, createVideoGameHandler };