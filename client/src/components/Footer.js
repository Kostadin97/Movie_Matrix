import React from "react";

function Footer() {
  return (
    <div
      style={{
        height: "80px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1rem",
        marginTop: "50px",
        backgroundColor: "whitesmoke",
        paddingTop: '30px',
      }}
    >
      <p>Movie Matrix&#174;</p>
      <p> Made by Kostadin Seymenski</p>
    </div>
  );
}

export default Footer;
