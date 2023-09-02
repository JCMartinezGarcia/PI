const { Router } = require('express');
const router = Router();
/**routers */
const videoGameRouter = require('./videoGameRouter');
const genresRouter = require('./genresRouter');
const platformsRouter = require('./platformsRouter');
/**matching routers with paths */
router.use('/videogames', videoGameRouter);
router.use('/genres', genresRouter);
router.use('/platforms', platformsRouter);
/**exports */
module.exports = router;
