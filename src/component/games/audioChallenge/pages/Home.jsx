import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Home = () => (
  <>
    <h1>Audio Challenge</h1>
    <p>Description</p>
    <Nav.Link as={Link} to="/audioChallenge/game">Start game</Nav.Link>
  </>
);
