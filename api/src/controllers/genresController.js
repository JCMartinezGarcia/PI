/**video game model */
const axios = require('axios');
require('dotenv').config();
//? import .env 
const { RAW_API_KEY } = process.env;
//? import videogame model 
const { Videogame, Genres } = require('../db');
const cleanGenres = require('./utilsControllers/utils');
//? URLS
const GET_ALL_GENRES = "https://api.rawg.io/api/genres";

const getAllGenres = async (req, res) => {
    /**List genres */
    //?validate if DB is empty
    const testDB = await Genres.findAll({ limit: 30 });
    const source = (!testDB.length) ? 'api' : 'db';
    try {
        switch (source) {
            case 'api':
                //? make get request to the api
                const { data } = await axios.get(GET_ALL_GENRES, { params: { key: RAW_API_KEY, page_size: 30 } });
                //? gte just the needed props
                const oGenres = cleanGenres(data.results);
                //? insert into DB 
                const genresApi = await Genres.bulkCreate(oGenres);
                //? return the response
                return genresApi;
            //res.status().json();
            //break;
            case 'db':
                //? make the request to the DB
                const genresDb = await Genres.findAll();
                return genresDb;
            //break;
            default:
                break;
        }

    } catch (error) {
        //? return error
        return error;
    }
}

module.exports = {
    getAllGenres
}