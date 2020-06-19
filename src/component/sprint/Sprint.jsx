import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "./Sprint.css";

import Start from "./Start";
import Game from "./Game";
import Statistics from "./Statistics";

function Sprint() {
  return (
    <Router>
      <Route path="/" component={Start} />
      <Route path="/Game" component={Game} />
      <Route path="/Statistics" component={Statistics} />
    </Router>
  );
}

export default Sprint;
