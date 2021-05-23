import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Button, ListGroup, Card } from "react-bootstrap";
import GridCards from "../components/GridCards";
import MainImage from "../components/MainImage";
import Comment from "../components/Comment";
import { API_KEY, API_URL, IMAGE_BASE_URL, IMAGE_SIZE } from "../config";
import SingleComment from "../components/SingleComment";

function Details(props) {
  const movieId = props.match.params.movieId;
  const [movie, setMovie] = useState([]);
  const [casts, setCasts] = useState([]);
  let [updateSuccess, setUpdateSuccess] = useState(0);
  const [commentsToDisplay, setCommentsToDisplay] = useState([]);

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

    axios
      .post("http://localhost:5000/api/comment/getComments", { movieId })
      .then((res) => {
        setCommentsToDisplay(res.data.comments);
      });
  }, [updateSuccess]);

  console.log(commentsToDisplay);

  return (
    <>
      <MainImage
        image={`${IMAGE_BASE_URL}${IMAGE_SIZE}${movie.backdrop_path}`}
        title={movie.original_title}
        text={movie.overview}
      />

      <Container>
        <Row style={{ marginTop: "50px" }}>
          <Col lg={6}>
            <Card style={{ width: "100%" }}>
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
          <Col style={{ textAlign: "center" }} lg={6}>
            <h1>Comments</h1>
            <Comment props={props} />
            {commentsToDisplay.map((comment, index) => (
              <p>{comment.content}</p>
            ))}
          </Col>
        </Row>
        <Row>
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
        </Row>
      </Container>
    </>
  );
}

export default Details;
