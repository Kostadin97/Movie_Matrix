import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const AddRemoveFav = ({
  removeFavourites,
  refreshFunction,
  movieId,
  favourites,
  movieTitle,
  runtime,
  voteAverage,
}) => {
  const token = JSON.parse(localStorage.getItem("userInfo")).token;
  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };

  const addToFavouritesHandler = async () => {
    await axios
      .post(
        `http://localhost:5000/api/movies/save/${movieId}`,
        { movieId, movieTitle, runtime, voteAverage },
        config
      )
      .then(() => {
        refreshFunction(movieId);
      });
  };

  const removeFromFavouritesHandler = async () => {
    await axios
      .post(`http://localhost:5000/api/movies/unsave/${movieId}`, config)
      .then(() => {
        removeFavourites(movieId);
      });
  };

  console.log(favourites);

  return (
    <>
      {!favourites.includes(movieId) ? (
        <Button
          variant="dark"
          style={{ width: "100%", marginTop: "10px" }}
          onClick={addToFavouritesHandler}
        >
          Add to Favourites
        </Button>
      ) : (
        <Button
          variant="dark"
          style={{ width: "100%", marginTop: "10px" }}
          onClick={removeFromFavouritesHandler}
        >
          Remove from Favourites
        </Button>
      )}
    </>
  );
};

export default AddRemoveFav;
