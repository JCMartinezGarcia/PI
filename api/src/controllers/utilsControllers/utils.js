const cleanGenres = (genres) => {
    const result = genres.map((genre) => {
        return { id: genre.id, name: genre.slug };
    });
    return result;
}

module.exports = cleanGenres;