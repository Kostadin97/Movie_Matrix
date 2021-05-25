import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, ListGroup, Card } from "react-bootstrap";
import GridCards from "../components/GridCards";
import MainImage from "../components/MainImage";
import { API_KEY, API_URL, IMAGE_BASE_URL, IMAGE_SIZE } from "../config";
import Comments from "../components/Comments";

function Details(props) {
  const movieId = props.match.params.movieId;
  const [movie, setMovie] = useState([]);
  const [casts, setCasts] = useState([]);
  const [loadingMovies, setLoadingMovies] = useState(true);
  const [CommentLists, setCommentLists] = useState([]);
  const [LoadingForCasts, setLoadingForCasts] = useState(true);
  const [ActorToggle, setActorToggle] = useState(false);

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
          console.log(response.data.comments);
          setCommentLists(response.data.comments);
        } else {
          alert("Failed to get comments Info");
        }
      });
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
              <Card.Header
                style={{ textAlign: "center", backgroundColor: "whitesmoke" }}
              >
                {movie.original_title}
              </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
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
              </ListGroup>
            </Card>
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
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "2rem",
            }}
          >
            <Button onClick={toggleActorView}>Toggle Actor View </Button>
          </div>

          {ActorToggle && (
            <Row gutter={[16, 16]}>
              {!LoadingForCasts ? (
                casts.map(
                  (cast, index) =>
                    cast.profile_path && (
                      <GridCards
                        actor
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
