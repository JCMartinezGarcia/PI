const { Router } = require('express');
const router = Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//?import routers
const videoGameRouter = require('./videoGameRouter');
const genresRouter = require('./genresRouter');
const platformsRouter = require('./platformsRouter');
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
//? matching routes with routers
router.use('/videogames', videoGameRouter);
router.use('/genres', genresRouter);
router.use('/platforms', platformsRouter);


//? export router
module.exports = router;
