import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "react-bootstrap";

import Header from "./components/Header";
import Home from "./views/Home";
import Login from "./views/Login";

const App = () => {
  return (
    <Router>
      <Header />
      <Container>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
      </Container>
    </Router>
  );
};

export default App;
