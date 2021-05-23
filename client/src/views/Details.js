import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, ListGroup, Card } from "react-bootstrap";
import GridCards from "../components/GridCards";
import MainImage from "../components/MainImage";
import { API_KEY, API_URL, IMAGE_BASE_URL, IMAGE_SIZE } from "../config";
import { useDispatch, useSelector } from "react-redux";
import { getComments, commentMovie } from "../actions/movieActions";

function Details({ match }) {
  const movieId = match.params.movieId;
  const [movie, setMovie] = useState([]);
  const [casts, setCasts] = useState([]);
  const [comment, setComment] = useState("");
  let [counter, setCounter] = useState(0);

  const dispatch = useDispatch();

  const getMovieComments = useSelector((state) => state.getComments);
  const { loading, error, comments } = getMovieComments;

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const commentHandler = (e) => {
    e.preventDefault();

    dispatch(commentMovie(comment, movieId));
    let newCounter = counter + 1;
    setCounter(newCounter);
    setComment("");
  };

  useEffect(() => {
    let endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    fetch(endpoint)
      .then((res) => res.json())
      .then((res) => {
        setMovie(res);
        let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
        fetch(endpointForCasts)
          .then((res) => res.json())
          .then((res) => {
            setCasts(res.cast);
          });
      });
  }, []);

  useEffect(() => {
    dispatch(getComments(movieId));
  }, [counter]);

  return (
    <>
      <MainImage
        image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${movie.backdrop_path}`}
        title={movie.original_title}
        text={movie.overview}
      />

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
            <form
              onSubmit={commentHandler}
              style={{
                width: "64%",
                display: "flex",
                justifyContent: "space-between",
                margin: "0 auto",
              }}
            >
              <input
                style={{ width: "85%", borderRadius: "5px", border: "none" }}
                onChange={handleChange}
                type="text"
                placeholder="Place Your Comment Here ..."
                value={comment}
              />
              <Button
                variant="success"
                type="submit"
                style={{ borderRadius: "5px" }}
              >
                Submit
              </Button>
            </form>

            <div style={{ marginTop: "20px" }}>
              {comments
                ?.slice(comments.length - 5, comments.length)
                .map((comment) => (
                  <p key={comment._id}>{comment.content}</p>
                ))}
            </div>
          </Col>
        </Row>
        {/* <Row>
          {casts.map(
            (cast, index) =>
              cast.profile_path && (
                <GridCards
                  actor
                  image={cast.profile_path}
                  characterName={cast.characterName}
                />
              )
          )}
        </Row> */}
      </Container>
    </>
  );
}

export default Details;
