import React, { Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "./components/Footer";

import Header from "./components/Header";
import Details from "./views/Details";
import Favourites from "./views/Favourites";
import Home from "./views/Home";
import Login from "./views/Login";
import Register from "./views/Register";

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Header />
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/movie/:movieId" component={Details} />
        <Route path="/favourites" component={Favourites} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
      <Footer />
    </Suspense>
  );
};

export default App;
