import React from "react";

function MainImage(props) {
  return (
    <div
      style={{
        background: `linear-gradient(to bottom, rgba(0,0,0,0)
            39%,rgba(0,0,0,0)
            41%,rgba(0,0,0,0.65)
            100%),
            url('${props.image}'), #1c1c1c`,
        height: "500px",
        backgroundSize: "100%, cover",
        backgroundPosition: "center, center",
        width: "100%",
        margin: "0 auto",
        position: "relative",
      }}
    >
      <div>
        <div
          style={{
            position: "absolute",
            maxWidth: "500px",
            bottom: "2rem",
            marginLeft: "2rem",
          }}
        >
          <h1 style={{ color: "white" }} level={2}>
            {" "}
            {props.title}{" "}
          </h1>
          <p style={{ color: "white", fontSize: "1rem" }}>{props.text} </p>
        </div>
      </div>
    </div>
  );
}

export default MainImage;
