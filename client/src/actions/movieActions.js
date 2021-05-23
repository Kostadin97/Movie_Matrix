import axios from "axios";

import {
  MOVIE_COMMENT_REQUEST,
  MOVIE_COMMENT_SUCCESS,
  MOVIE_COMMENT_FAIL,
  MOVIE_GET_COMMENTS_SUCCESS,
  MOVIE_GET_COMMENTS_REQUEST,
  MOVIE_GET_COMMENTS_FAIL,
} from "../constants/movieConstants";

export const commentMovie = (comment, movieId) => async (dispatch) => {
  try {
    dispatch({
      type: MOVIE_COMMENT_REQUEST,
    });

    const token = localStorage.getItem("token");

    const commentObj = {
      comment: comment,
      movieId,
    };

    const config = {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };

    if (!comment) return;

    axios.post(
      "http://localhost:5000/api/comment/saveComment",
      commentObj,
      config
    );

    dispatch({
      type: MOVIE_COMMENT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: MOVIE_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getComments = (movieId) => async (dispatch) => {
  try {
    dispatch({
      type: MOVIE_GET_COMMENTS_REQUEST,
    });

    const token = localStorage.getItem("token");

    const config = {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };

    let { data } = await axios.post(
      "http://localhost:5000/api/comment/getComments",
      { movieId },
      config
    );

    dispatch({
      type: MOVIE_GET_COMMENTS_SUCCESS,
      payload: data.comments,
    });
  } catch (error) {
    dispatch({
      type: MOVIE_GET_COMMENTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
