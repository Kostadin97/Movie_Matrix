import {
  MOVIE_COMMENT_SUCCESS,
  MOVIE_COMMENT_REQUEST,
  MOVIE_COMMENT_FAIL,
  MOVIE_GET_COMMENTS_REQUEST,
  MOVIE_GET_COMMENTS_SUCCESS,
  MOVIE_GET_COMMENTS_FAIL,
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

export const getCommentsReducer = (state = {}, action) => {
  switch (action.type) {
    case MOVIE_GET_COMMENTS_REQUEST:
      return { loading: true };
    case MOVIE_GET_COMMENTS_SUCCESS:
      return { loading: false, comments: action.payload };
    case MOVIE_GET_COMMENTS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
