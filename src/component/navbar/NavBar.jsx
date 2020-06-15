import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

export default function NavBar() {
  return (
    <div className="navbar">
      <ul>
        <Link className="navbar__link" to="/">
          Main
        </Link>
        <Link className="navbar__link" to="/weather">
          Weather
        </Link>
      </ul>
    </div>
  );
}
