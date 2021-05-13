import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  IMAGE_SIZE,
  POSTER_SIZE,
} from "../config";

import { listMovies } from "../actions/movieActions";

const Home = () => {
  const movieList = useSelector((state) => state.movieList);
  const { loading, error, movies } = movieList;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listMovies());
  }, []);
  console.log(movies);
  return (
    <Row>
      <h1>Hello</h1>
    </Row>
  );
};

export default Home;
