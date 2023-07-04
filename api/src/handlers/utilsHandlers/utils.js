const cleanGenres = (genres) => {
    const result = genres.map((genre) => {
        return { id: genre.id, name: genre.name };
    });
    return result;
}

const cleanVideoGame = (games) => {
    const result = games.map((game) => {
        return {
            id: game.id,
            name: game.name,
            description: (game.description) ? game.description : '',
            platforms: game.platforms,
            image: (game.background_image) ? game.background_image : game.image,
            released: game.released,
            rating: game.rating,
            genres: game.genres,
            source: (isNumber(game.id)) ? 'api' : 'db'
        };
    });
    return result;
}
const cleanInfoPlatform = (platforms) => {
    const result = platforms.map((platform) => {
        return {
            id: platform.id,
            name: platform.name,
        };
    });
    return result;
}

const isNumber = (string) => {
    return (isNaN(Number(string))) ? false : true;
}

module.exports = {
    cleanGenres,
    cleanVideoGame,
    cleanInfoPlatform,
    isNumber
};