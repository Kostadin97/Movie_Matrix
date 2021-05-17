import React from "react";
import { Form } from "react-bootstrap";

const SearchBar = ({ input: keyword, onChange: setKeyword }) => {
  return (
    <Form.Control
      style={{
        background: "#4bbf736b",
        width: "70%",
        margin: "0px auto",
        borderRadius: "10px",
        height: "50px",
      }}
      type="text"
      value={keyword}
      placeholder="Search..."
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
};

export default SearchBar;
