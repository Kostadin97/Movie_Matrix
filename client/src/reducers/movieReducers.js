import {
  MOVIE_COMMENT_SUCCESS,
  MOVIE_COMMENT_REQUEST,
  MOVIE_COMMENT_FAIL,
} from "../constants/movieConstants";

export const commentMovieReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVIE_COMMENT_REQUEST:
      return { loading: true };
    case MOVIE_COMMENT_SUCCESS:
      return { loading: false, comment: action.payload };
    case MOVIE_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
