import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export const Statistic = () => (
  <>
    <h1>Statistic</h1>
    <Nav.Link as={Link} to="/audioChallenge/">Home</Nav.Link>
  </>
);
