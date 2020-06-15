import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Weather from "./component/weather";
import NavBar from "./component/navbar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="main">
        <Route path="/" component={NavBar} />
        <Route path="/weather" component={Weather} />
      </div>
    </Router>
  );
}

export default App;
