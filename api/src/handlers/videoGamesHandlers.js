const fs = require("fs");
const path = require('path');
const cloudinary = require('../cloudinaryConfig.js');

const {
    getVideoGames,
    getVideoGamesDetails,
    getVideoGamesByName,
    createVideoGame
} = require('../controllers/videoGamesContoller');

const {
    cleanGenres,
    cleanVideoGame,
    isNumber,
    setParamsFilterName
} = require('./utilsHandlers/utils');

const getVideoGamesHandler = async (req, res) => {
    const { filtName } = req.query;
    let searchParams = setParamsFilterName(req.query);
    try {
        if (filtName) {
            const result = await getVideoGamesByName(searchParams);
            let i = result.length - 1;
            result.pop();
            const resultsResponse = cleanVideoGame(result);
            res.status(200).json(resultsResponse);
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
    const createObject = req.body;
    try {
        const result = await createVideoGame(createObject);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

const uploadFileVideoGameHandler = async (req, res) => {
    try {
        const { file, fname } = req.body;
        // Directorio donde se guardarán los archivos
        //const __dirname = dirname(fileURLToPath(import.meta.url));
        const uploadDir = path.join(__dirname, '../uploads');
        // Crear el directorio de subida si no existe
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        // Decodificar el archivo en base64 y obtener la extensión
        const matches = file.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
        const fileExtension = matches[1].split('/')[1];
        const base64Data = matches[2];
        // Generar un nombre de archivo único
        const filename = `${fname.split(".")[0]}.${fileExtension}`;
        // Crear y escribir el archivo en el sistema de archivos
        fs.writeFileSync(path.join(uploadDir, filename), base64Data, 'base64');
        const { secure_url } = await cloudinary.uploader.upload(path.join(uploadDir, filename));
        res.status(200).json({ message: 'Archivo subido exitosamente', imageUrl: secure_url, status: true });
    } catch (error) {
        res.status(500).json({ message: 'Error al subir el archivo' });
    }
}

module.exports = {
    getVideoGamesHandler,
    getVideoGameDetailsHandler,
    createVideoGameHandler,
    uploadFileVideoGameHandler,
};