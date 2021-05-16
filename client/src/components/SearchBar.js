import React from "react";
import { Form } from "react-bootstrap";

const SearchBar = ({ input: keyword, onChange: setKeyword }) => {
  return (
    <Form.Control
      style={{
        background: "#ff00002e",
        width: "70%",
        margin: "0 auto"
      }}
      type="text"
      value={keyword}
      placeholder="Search..."
      onChange={(e) => setKeyword(e.target.value)}
    />
  );
};

export default SearchBar;
