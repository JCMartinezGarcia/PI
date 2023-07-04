/**Imports  */
const { Router } = require("express");
const platformsRouter = Router();
//?import handlers
const { getAllPlatformsHandler } = require('../handlers');
//? matching routes with handler callbacks
platformsRouter.get('/', getAllPlatformsHandler);

module.exports = platformsRouter;