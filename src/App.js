import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './component/navbar';
import Login from './component/login';
import Settings from './component/settings';
import Weather from './component/weather';
import Sprint from './component/sprint/Sprint';
import './App.css';

function App() {
  return (
    <Router>
      <div className="main">
        <Route path="/" component={NavBar} />
        <Route path="/weather" component={Weather} />
        <Route path="/settings" component={Settings} />
        <Route path="/login" component={Login} />
        <Route path="/sprint" component={Sprint} />
      </div>
    </Router>
  );
}

export default App;
