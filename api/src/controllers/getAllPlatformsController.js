/**video game model */
const axios = require('axios');
require('dotenv').config();
//? import .env 
const { RAW_API_KEY } = process.env;
//? URLS
const GET_ALL_PLATFORMS = "https://api.rawg.io/api/platforms";

const getAllPlatforms = async (req, res) => {
    /**List genres */
    try {
        //? make get request to the api
        const { data } = await axios.get(GET_ALL_PLATFORMS, { params: { key: RAW_API_KEY } });
        //? return the response
        return data.results;
    } catch (error) {
        //? return error
        return error;
    }
}

module.exports = {
    getAllPlatforms
}