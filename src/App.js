import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Weather from "./component/weather";
import NavBar from "./component/navbar";
import Settings from "./component/settings";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="main">
        <Route path="/" component={NavBar} />
        <Route path="/weather" component={Weather} />
        <Route path="/settings" component={Settings} />
      </div>
    </Router>
  );
}

export default App;
