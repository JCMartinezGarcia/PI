/**video game model */
const axios = require('axios');
require('dotenv').config();
/**env */
const { RAW_API_KEY } = process.env;
/**import models */
const { Videogame, Genres } = require('../db');
/**Urls */
const GET_ALL_GAMES = "https://api.rawg.io/api/games?page_size=100";
const GET_DETAILS_GAMES = "https://api.rawg.io/api/games/";
const GET_GAMES_BY_NAME = "https://api.rawg.io/api/games?page_size=100";

/**functions */
const getVideoGames = async () => {
    /**List videogames */
    try {
        const { data } = await axios.get(GET_ALL_GAMES, { params: { key: RAW_API_KEY, } });
        let resultsDb = await Videogame.findAll({ include: Genres });
        let allGameResults = [...data.results, ...resultsDb];
        return allGameResults;
    } catch (error) {
        return error;
    }
}

const getVideoGamesByName = async (name) => {
    /**list videogames by name*/
    const source = 'all';
    try {
        switch (source) {
            case 'all':

                const { data } = await axios.get(GET_GAMES_BY_NAME, { params: { key: RAW_API_KEY, page_size: 30, search: name, } });
                /**query to DB */
                const dataDb = await Videogame.findAll({ where: { name }, include: Genres, limit: 15 });
                /**validate if something was found */
                if (!data.results.length && !dataDb.length) {
                    return [{ found: false, message: 'Videogame not found' }];
                }
                /**join results */
                const allResults = [...data.results, ...dataDb, { found: true }];
                return allResults;

            default:
                break;
        }

    } catch (error) {
        return error;
    }
}

const getVideoGamesDetails = async (id, source) => {
    /**list videogames by ID*/
    try {
        switch (source) {
            case 'api':
                let resultsApi = [];
                //? make get request
                const { data } = await axios.get(GET_DETAILS_GAMES + id, { params: { key: RAW_API_KEY } });
                resultsApi.push(data);
                //? return the response
                return resultsApi;
            case 'db':
                const resultsDb = await Videogame.findAll({ where: { id }, include: Genres });
                return resultsDb;
            default:
                break;
        }
    } catch (error) {
        return error;
    }
}

const createVideoGame = async (videoGameGenres) => {
    const { name, description, platforms, image, released, rating, genres } = videoGameGenres;
    const oCreateGame = { name, description, platforms, image, released, rating };
    try {
        /**create videogame using associations n:n */
        //const { dataValues } = await Videogame.create(oCreateGame, { include: Genres });
        const game = await Videogame.create(oCreateGame);
        genres.forEach(async (element, i) => {
            const [genre, created] = await Genres.findOrCreate({
                where: { name: element.name },
                defaults: element
            });
            game.addGenres(genre);
        });
        /* const game = await Videogame.create(oCreateGame);
         const [genre, created] = await Genres.findOrCreate({
             where: { username: 'sdepold' },
             defaults: {
                 job: 'Technical Lead JavaScript'
             }
         });*/
        return dataValues;
    } catch (error) {
        return error;
    }
}
module.exports = {
    getVideoGames,
    getVideoGamesDetails,
    getVideoGamesByName,
    createVideoGame
};