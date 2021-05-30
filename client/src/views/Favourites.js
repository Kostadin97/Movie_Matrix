import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_KEY, API_URL } from "../config";
import { Table } from "react-bootstrap";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("userInfo")).token;
    const config = {
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    };
    axios
      .get("http://localhost:5000/api/users/getFavourites", config)
      .then((res) => {
        setFavourites(res.data.favourites);
      });
  }, []);

  console.log(favourites);

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Runtime</th>
            <th>Average Vote</th>
          </tr>
        </thead>
        <tbody>
          {favourites.map((movie) => (
            <tr key={movie.movieId}>
              <td>{favourites.indexOf(movie) + 1}</td>
              <td>
                <a href={`/movie/${movie.movieId}`}>{movie.movieTitle} </a>
              </td>
              <td>{movie.runtime}</td>
              <td>{movie.voteAverage}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Favourites;
