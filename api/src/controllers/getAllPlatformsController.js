/**video game model */
const axios = require('axios');
require('dotenv').config();
const { RAW_API_KEY } = process.env;
const GET_ALL_PLATFORMS = "https://api.rawg.io/api/platforms";

const getAllPlatforms = async (req, res) => {
    /**List genres */
    try {
        const { data } = await axios.get(GET_ALL_PLATFORMS, { params: { key: RAW_API_KEY } });
        return data.results;
    } catch (error) {
        return error;
    }
}

module.exports = {
    getAllPlatforms
}