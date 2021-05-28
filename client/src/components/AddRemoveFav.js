import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

const AddRemoveFav = ({
  removeFavourites,
  refreshFunction,
  movieId,
  favourites,
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
      .post(`http://localhost:5000/api/movies/save/${movieId}`, config)
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
    <div>
      {favourites.includes(movieId) ? (
        <Button
          variant="primary"
          style={{ width: "70%", marginTop: "10px" }}
          onClick={removeFromFavouritesHandler}
        >
          Remove from Favourites
        </Button>
      ) : (
        <Button
          variant="primary"
          style={{ width: "70%", marginTop: "10px" }}
          onClick={addToFavouritesHandler}
        >
          Add to Favourites
        </Button>
      )}
    </div>
  );
};

export default AddRemoveFav;
