import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Weather from "./component/weather";
import NavBar from "./component/navbar";
import AudioChallenge from "./component/games/audioChallenge";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="main">
        <Route path="/" component={NavBar} />
        <Route path="/weather" component={Weather} />
        <Route path="/audioChallenge" component={AudioChallenge} />
      </div>
    </Router>
  );
}

export default App;
