const axios = require('axios');
require('dotenv').config();
const { RAW_API_KEY } = process.env;
const { Videogame, Genres } = require('../db');
const GET_ALL_GAMES = "https://api.rawg.io/api/games?page_size=100";
const GET_DETAILS_GAMES = "https://api.rawg.io/api/games/";
const GET_GAMES_BY_NAME = "https://api.rawg.io/api/games?page_size=100";

const getVideoGames = async () => {
    const { data } = await axios.get(GET_ALL_GAMES, { params: { key: RAW_API_KEY, } });
    let resultsDb = await Videogame.findAll({ include: Genres });
    let allGameResults = [...data.results, ...resultsDb];
    return allGameResults;
}

const getVideoGamesByName = async (searchParams) => {
    console.log(searchParams);
    const { name, source } = searchParams;
    let responseDb;
    let resultList;
    let responseApi;
    switch (source) {
        case 'api':
            delete searchParams.source;
            responseApi = await axios.get(GET_GAMES_BY_NAME,
                {
                    params: { key: RAW_API_KEY, ...searchParams }
                });
            resultList = [...responseApi.data.results, { found: true }];
            return resultList;
        case 'db':
            if (!name) {
                responseDb = await Videogame.findAll(
                    {
                        include: Genres,
                        limit: 15
                    });
            } else {

                responseDb = await Videogame.findAll(
                    {
                        where: name,
                        include: Genres,
                        limit: 15
                    });
            }
            /**join results */
            resultList = [...responseDb, { found: true }];
            return resultList;
        default:
            responseApi = await axios.get(GET_GAMES_BY_NAME,
                {
                    params: { key: RAW_API_KEY, ...searchParams }
                });
            /**query to DB */
            responseDb = await Videogame.findAll(
                {
                    where: (name) ? { name } : { name: '' },
                    include: Genres,
                    limit: 15
                });
            /**join results */
            resultList = [...responseApi.data.results, ...responseDb, { found: true }];
            return resultList;
    }

}

const getVideoGamesDetails = async (id, source) => {
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

}

const createVideoGame = async (videoGameGenres) => {
    const { name, description, platforms, image, released, rating, genres } = videoGameGenres;
    const oCreateGame = { name, description, platforms, image, released, rating };

    /**create videogame using associations n:n */
    const game = await Videogame.create(oCreateGame);
    genres.forEach(async (element, i) => {
        const [genre, created] = await Genres.findOrCreate({
            where: { name: element },
            defaults: element
        });
        game.addGenres(genre);
    });

}

module.exports = {
    getVideoGames,
    getVideoGamesDetails,
    getVideoGamesByName,
    createVideoGame
};