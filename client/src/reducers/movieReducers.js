import {
  MOVIES_GET_REQUEST,
  MOVIES_GET_SUCCESS,
  MOVIES_GET_FAIL,
} from "../constants/movieConstants";

export const movieListReducer = (state = { movies: [] }, action) => {
  switch (action.type) {
    case MOVIES_GET_REQUEST:
      return { loading: true, movies: [] };
    case MOVIES_GET_SUCCESS:
      return {
        loading: false,
        movies: action.payload.results,
      };
    case MOVIES_GET_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
