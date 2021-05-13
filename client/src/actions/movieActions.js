import {
  MOVIES_GET_REQUEST,
  MOVIES_GET_SUCCESS,
  MOVIES_GET_FAIL,
} from "../constants/movieConstants";

import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  IMAGE_SIZE,
  POSTER_SIZE,
} from "../config";

export const listMovies = () => async (dispatch) => {
  try {
    dispatch({ type: MOVIES_GET_REQUEST });
    let data;
    await fetch(
      `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    )
      .then((result) => result.json())
      .then((result) => {
        data = result;
      });
    dispatch({
      type: MOVIES_GET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MOVIES_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
