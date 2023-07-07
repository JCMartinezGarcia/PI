/**Imports  */
const { Router } = require("express");
const platformsRouter = Router();
const { getAllPlatformsHandler } = require('../handlers');
// matching routes
platformsRouter.get('/', getAllPlatformsHandler);
/**exports */
module.exports = platformsRouter;