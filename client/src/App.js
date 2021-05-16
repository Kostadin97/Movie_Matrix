import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Suspense>
  );
};

export default App;
