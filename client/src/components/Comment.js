import React, { useState } from "react";
import axios from "axios";

const Comment = ({ props }) => {
  const [comment, setComment] = useState("");
  const movieId = props.match.params.movieId;

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const commentHandler = (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const commentObj = {
      comment,
      movieId,
    };

    const config = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .post("http://localhost:5000/api/comment/saveComment", commentObj, config)
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <>
      <form onSubmit={commentHandler} style={{ width: "100%" }}>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Place Your Comment Here ..."
        />
        <input type="submit" />
      </form>
    </>
  );
};

export default Comment;
