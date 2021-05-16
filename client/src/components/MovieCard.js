import React from "react";
import { Row } from "react-bootstrap";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  IMAGE_SIZE,
  POSTER_SIZE,
} from "../config";
import GridCard from "../components/GridCards";

const MovieCard = ({ Movies = [] }) => {
  return (
    <>
      {Movies.map((movie, index) => (
        <React.Fragment key={index}>
          <GridCard
            image={
              movie.poster_path
                ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                : null
            }
            movieId={movie.id}
            movieName={movie.original_title}
          />
        </React.Fragment>
      ))}
    </>
  );
};

export default MovieCard;
