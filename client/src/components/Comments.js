import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const Comments = ({ CommentLists, movieId, refreshFunction }) => {
  const [comment, setComment] = useState("");

  const handleChange = (e) => {
    console.log(e.currentTarget.value);
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
        "Content-Type": "application/json",
      },
    };

    if (!comment) return;

    axios
      .post("http://localhost:5000/api/comment/saveComment", commentObj, config)
      .then((response) => {
        console.log(response);
        setComment("");
        refreshFunction(response.data.result);
      });
  };

  return (
    <div>
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
        <Button variant="success" type="submit" style={{ borderRadius: "5px" }}>
          Submit
        </Button>
      </form>

      {CommentLists &&
        CommentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment key={comment._id}>
                <p>{comment.content}</p>
              </React.Fragment>
            )
        )}
    </div>
  );
};

export default Comments;
