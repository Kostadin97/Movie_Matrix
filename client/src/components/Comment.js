import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleComment from "../components/SingleComment";

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
      comment: comment,
      movieId,
    };

    const config = {
      headers: {
        Authorization: token,
      },
    };

    if (!comment) return;

    axios.post(
      "http://localhost:5000/api/comment/saveComment",
      commentObj,
      config
    );
    setComment("");
  };

  return (
    <form onSubmit={commentHandler} style={{ width: "100%" }}>
      <input
        onChange={handleChange}
        type="text"
        placeholder="Place Your Comment Here ..."
        value={comment}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Comment;
