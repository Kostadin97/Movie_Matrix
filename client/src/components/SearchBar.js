import React from "react";
import { Form } from "react-bootstrap";

const SearchBar = ({ input: keyword, onChange: setKeyword }) => {
  return (
    <Form.Control
      style={{
        backgroundColor: "#00000008",
        width: "100%",
        margin: "0px auto",
        height: "50px",
        outline: "none",
      }}
      type="text"
      id="searchInput"
      value={keyword}
      placeholder="Search..."
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
};

export default SearchBar;
