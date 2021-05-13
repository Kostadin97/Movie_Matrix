import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Home from "./views/Home";

const App = () => {
  return (
    <Router>
      <Container>
        <Route path="/" component={Home} exact />
      </Container>
    </Router>
  );
};

export default App;
