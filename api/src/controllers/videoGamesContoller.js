/**video game model */
const axios = require('axios');
require('dotenv').config();
//? import .env 
const { RAW_API_KEY } = process.env;
//? import videogame model 
const { Videogame, Genres } = require('../db');
//? URLS
const GET_ALL_GAMES = "https://api.rawg.io/api/games?page_size=100";
const GET_DETAILS_GAMES = "https://api.rawg.io/api/games/";
const GET_GAMES_BY_NAME = "https://api.rawg.io/api/games?page_size=100";

//? controller functions
const getVideoGames = async () => {
    /**List videogames */

    try {
        //? make get request
        const { data } = await axios.get(GET_ALL_GAMES, { params: { key: RAW_API_KEY, } });
        let resultsDb = await Videogame.findAll({ include: Genres });
        let allGameResults = [...data.results, ...resultsDb];
        //? return the response
        return allGameResults;
    } catch (error) {
        //? return error
        return error;
    }
}

const getVideoGamesByName = async (name) => {
    /**list videogames by name*/
    const source = 'all';
    try {
        switch (source) {
            case 'all':

                //? make get request to api
                const { data } = await axios.get(GET_GAMES_BY_NAME, { params: { key: RAW_API_KEY, limit: 30, search: name, } });
                //? query DB
                const dataDb = await Videogame.findAll({ where: { name }, include: Genres, limit: 100 });
                //? validate if something was found
                if (!data.results.length && !dataDb.length) {
                    return [{ found: false, message: 'Videogame not found' }];
                }
                //? join results
                const allResults = [...data.results, ...dataDb, { found: true }];
                //? return the response
                return allResults;

            default:
                break;
        }

    } catch (error) {
        //? return error
        return error;
    }
}
//! Pendiente funcionalidad
//**Debe funcionar tanto para los videojuegos de la API como para los de la base de datos. */
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
        //? return error
        return error;
    }
}

const createVideoGame = async (videoGameGenres) => {
    //? destructure parameter videoGameGenres
    const { name, description, platforms, image, released, rating, oGenres } = videoGameGenres;
    //? build obj to be created
    const oCreateGame = { name, description, platforms, image, released, rating, genres: oGenres };
    /**TRY CATCH */
    try {
        //? create videogame using associations n:n
        const { dataValues } = await Videogame.create(oCreateGame, { include: Genres });
        //? return back values to the handler
        return dataValues;
    } catch (error) {
        return error;
    }
}
//? export controller functions
module.exports = {
    getVideoGames,
    getVideoGamesDetails,
    getVideoGamesByName,
    createVideoGame
};