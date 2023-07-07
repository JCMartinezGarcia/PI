/**video game model */
const axios = require('axios');
require('dotenv').config();
const { RAW_API_KEY } = process.env;
const { Videogame, Genres } = require('../db');
const cleanGenres = require('./utilsControllers/utils');
//? URLS
const GET_ALL_GENRES = "https://api.rawg.io/api/genres";

const getAllGenres = async (req, res) => {
    /**List genres */
    /**validate if DB is empty */
    const testDB = await Genres.findAll({ limit: 30 });
    const source = (!testDB.length) ? 'api' : 'db';
    try {
        switch (source) {
            case 'api':
                const { data } = await axios.get(GET_ALL_GENRES, { params: { key: RAW_API_KEY, page_size: 30 } });
                const oGenres = cleanGenres(data.results);
                const genresApi = await Genres.bulkCreate(oGenres);
                return genresApi;
            case 'db':
                const genresDb = await Genres.findAll();
                return genresDb;
            default:
                break;
        }

    } catch (error) {
        return error;
    }
}

module.exports = {
    getAllGenres
}