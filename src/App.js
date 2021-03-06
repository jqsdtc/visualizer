import React from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import "./css/styles.css";
import Path from "./pages/pathfinding/Path";
import Error from "./pages/Error";
import Home from "./pages/Home";
import Sort from "./pages/sort/Sort";

function App() {
  return (
    <div className="App">
      <HashRouter basename="/">
        <Switch>
          <Route path="/" component={Home} exact />
          <Route path="/pathfinding" component={Path} exact />
          <Route path="/sorting" component={Sort} exact />
          <Route path="/404" component={Error} />
          <Redirect to="/404" />
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
