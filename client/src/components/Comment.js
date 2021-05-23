import React, { useEffect, useState } from "react";
import axios from "axios";
import SingleComment from "../components/SingleComment";
import { useDispatch, useSelector } from "react-redux";
import { commentMovie } from "../actions/movieActions";

const Comment = ({ props }) => {
  const [comment, setComment] = useState("");
  const movieId = props.match.params.movieId;

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setComment(e.currentTarget.value);
  };

  const commentHandler = (e) => {
    e.preventDefault();

    dispatch(commentMovie(comment, movieId));
    
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
