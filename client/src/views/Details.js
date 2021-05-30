import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, ListGroup, Card } from "react-bootstrap";
import GridCards from "../components/GridCards";
import MainImage from "../components/MainImage";
import { API_KEY, API_URL, IMAGE_BASE_URL, IMAGE_SIZE } from "../config";
import Comments from "../components/Comments";
import AddRemoveFav from "../components/AddRemoveFav";

function Details(props) {
  const movieId = props.match.params.movieId;
  const [movie, setMovie] = useState([]);
  const [casts, setCasts] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [CommentLists, setCommentLists] = useState([]);
  const [LoadingForCasts, setLoadingForCasts] = useState(true);
  const [ActorToggle, setActorToggle] = useState(false);
  const token = JSON.parse(localStorage.getItem("userInfo")).token;
  const config = {
    headers: {
      Authorization: token,
      "Content-Type": "application/json",
    },
  };

  const removeFavourites = async (movieId) => {
    const movieIdx = favourites.indexOf(movieId);
    favourites.splice(movieIdx, 1);
    await setFavourites(favourites.splice(movieIdx, 1));
  };

  const updateFavourites = (movieId) => {
    setFavourites(favourites.concat(movieId));
  };

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  const toggleActorView = () => {
    setActorToggle(!ActorToggle);
  };

  useEffect(() => {
    let endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    fetch(endpoint)
      .then((res) => res.json())
      .then((res) => {
        setMovie(res);
        setLoadingMovies(false);
        let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        fetch(endpointForCasts)
          .then((res) => res.json())
          .then((res) => {
            setCasts(res.cast);
          });
        setLoadingForCasts(false);
      });

    axios
      .get(`http://localhost:5000/api/comment/getComments/${movieId}`)
      .then((response) => {
        if (response.data.success) {
          setCommentLists(response.data.comments);
        } else {
          alert("Failed to get comments Info");
        }
      })
      .catch((err) => console.log(err));

    axios
      .get("http://localhost:5000/api/users/getFavourites", config)
      .then((res) => {
        setFavourites(res.data.favourites);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {!loadingMovies ? (
        <MainImage
          image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${movie.backdrop_path}`}
          title={movie.original_title}
          text={movie.overview}
        />
      ) : (
        <div>loading...</div>
      )}

      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col lg={4}>
            <Card style={{ width: "100%", border: "none" }}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h1 style={{ marginBottom: "30px" }}>Details</h1>
                  Release Date: {movie.release_date}
                </ListGroup.Item>
                <ListGroup.Item>Revenue: {movie.revenue}</ListGroup.Item>
                <ListGroup.Item>Runtime: {movie.runtime}</ListGroup.Item>
                <ListGroup.Item>Vote Count: {movie.vote_count}</ListGroup.Item>
                <ListGroup.Item>Status: {movie.status}</ListGroup.Item>
                <ListGroup.Item>
                  Vote Average: {movie.vote_average}
                </ListGroup.Item>
                <ListGroup.Item>Popularity: {movie.popularity}</ListGroup.Item>
                <ListGroup.Item></ListGroup.Item>
              </ListGroup>
            </Card>

            <Row>
              <Col>
                <AddRemoveFav
                  movieTitle={movie.original_title}
                  favourites={favourites}
                  refreshFunction={updateFavourites}
                  removeFavourites={removeFavourites}
                  movieId={movieId}
                  runtime={movie.runtime}
                  voteAverage={movie.vote_average}
                />
              </Col>
              <Col>
                <Button
                  style={{ width: "100%", marginTop: "10px" }}
                  onClick={toggleActorView}
                  variant="danger"
                >
                  Toggle Actor View{" "}
                </Button>
              </Col>
            </Row>
          </Col>

          <Col
            style={{
              textAlign: "center",
              float: "right",
              width: "50%",
            }}
            lg={8}
          >
            <h1>Comments</h1>
            <Comments
              movieTitle={movie.original_title}
              CommentLists={CommentLists}
              postId={movieId}
              refreshFunction={updateComment}
              movieId={movieId}
            />
          </Col>
        </Row>
        <Row>
          {ActorToggle && (
            <Row gutter={[16, 16]}>
              {!LoadingForCasts ? (
                casts.map(
                  (cast, index) =>
                    cast.profile_path && (
                      <GridCards
                        actor
                        actorId={cast.id}
                        image={cast.profile_path}
                        characterName={cast.characterName}
                      />
                    )
                )
              ) : (
                <div>loading...</div>
              )}
            </Row>
          )}
          <br />
        </Row>
      </Container>
    </>
  );
}

export default Details;
