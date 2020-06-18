import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Weather from "./component/weather";
import NavBar from "./component/navbar/NavBar";
import Sprint from "./component/sprint/Sprint";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="main">
        <Route path="/" component={NavBar} />
        <Route path="/weather" component={Weather} />
        <Route path="/sprint" component={Sprint} />
      </div>
    </Router>
  );
}

export default App;
