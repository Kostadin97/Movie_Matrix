import React, { useEffect, useState, useRef } from "react";
import { Row, Button } from "react-bootstrap";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  IMAGE_SIZE,
  POSTER_SIZE,
} from "../config";
import MainImage from "../components/MainImage";
import MovieCard from "../components/MovieCard";

import SearchBar from "../components/SearchBar";

function LandingPage() {
  const buttonRef = useRef(null);

  const [input, setInput] = useState("");
  const [Movies, setMovies] = useState([]);
  const [MoviesDefault, setMoviesDefault] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [CurrentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);

  const fetchMovies = (endpoint) => {
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        setMovies([...Movies, ...result.results]);
        setMoviesDefault([...MoviesDefault, ...result.results]);
        setMainMovieImage(MainMovieImage || result.results[1]);
        setCurrentPage(result.page);
      }, setLoading(false))
      .catch((error) => console.error("Error:", error));
  };

  const loadMoreItems = () => {
    let endpoint = "";
    setLoading(true);
    endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };

  const updateInput = async (input) => {
    let filtered = MoviesDefault.filter((movie) => {
      return movie.original_title.toLowerCase().includes(input.toLowerCase());
    });
    setInput(input);
    setMovies(filtered);
  };

  return (
    <div style={{ width: "100%", margin: "0" }}>
      {MainMovieImage && (
        <MainImage
          image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${MainMovieImage.backdrop_path}`}
          title={MainMovieImage.original_title}
          text={MainMovieImage.overview}
        />
      )}

      <div style={{ width: "85%", margin: "1rem auto" }}>
        <h1 level={2} style={{ textAlign: "center", marginTop: "20px" }}>
          {" "}
          Movies by latest{" "}
        </h1>
        <hr />
        <SearchBar input={input} onChange={updateInput} />
        <Row>
          <MovieCard Movies={Movies} />
        </Row>

        {Loading && <div>Loading...</div>}

        <br />
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{ borderRadius: "5px" }}
            variant="success"
            ref={buttonRef}
            className="loadMore"
            onClick={loadMoreItems}
          >
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
