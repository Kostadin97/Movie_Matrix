import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, ListGroup, Card } from "react-bootstrap";
import MainImage from "../components/MainImage";
import { API_KEY, API_URL, IMAGE_BASE_URL, IMAGE_SIZE } from "../config";

function Details(props) {
  const movieId = props.match.params.movieId;
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    let endpoint = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
    fetch(endpoint)
      .then((res) => res.json())
      .then((res) => setMovie(res));
  }, []);

  console.log(movie);

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
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Details;
