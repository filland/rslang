import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Weather from "./component/weather/Weather";
import NavBar from "./component/navbar/NavBar";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="main">
        <Route path="/" component={NavBar}></Route>
        <Route path="/weather" component={Weather}></Route>
      </div>
    </Router>
  );
}

export default App;
