import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div className="navbar justify-content-center">
      <ul>
        <Link className="navbar__link" to="/">
          Main
        </Link>
        <Link className="navbar__link" to="/weather">
          Weather
        </Link>
        <Link className="navbar__link" to="/sprint">
          Sprint
        </Link>
      </ul>
    </div>
  );
}
