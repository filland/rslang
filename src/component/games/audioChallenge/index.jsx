import React from "react";
import {
  BrowserRouter, Route, Switch, Link,
} from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { Game } from "./pages/Game";
import { Home } from "./pages/Home";
import { Statistic } from "./pages/Statistic";

function AudioChallenge() {
  return (
    <BrowserRouter>
      <Navbar bg="primary" variant="dark">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/audioChallenge/" exact>Home</Nav.Link>
          <Nav.Link as={Link} to="/audioChallenge/game">Game</Nav.Link>
          <Nav.Link as={Link} to="/audioChallenge/statistic">Statistic</Nav.Link>
        </Nav>
      </Navbar>
      <Switch>
        <Route path="/audioChallenge/" exact component={Home} />
        <Route path="/audioChallenge/game" component={Game} />
        <Route path="/audioChallenge/statistic" component={Statistic} />
      </Switch>
    </BrowserRouter>
  );
}

export default AudioChallenge;
