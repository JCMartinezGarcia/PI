/**imports */
import { GET_ALL_GAMES, GET_GAME_BY_NAME, GET_GENRES, GET_PLATFORMS } from "../actionTypes/action-types";
/**state */
const initialState = {
    allvideoGames: [],
    copyVideoGames: [],
    allGenres: [],
    allPlatforms: []
}

const rootReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_GAMES:
            return {
                ...state,
                allvideoGames: payload,
                copyVideoGames: payload,
            }
        case GET_GAME_BY_NAME:
            return {
                ...state,
                allvideoGames: payload,
                copyVideoGames: payload,
            }
        case GET_GENRES:
            return {
                ...state,
                allGenres: payload
            }
        case GET_PLATFORMS:
            return {
                ...state,
                allPlatforms: payload
            }
        default:
            return state;
    }
}

export default rootReducer;