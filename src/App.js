import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './component/navbar';
import Login from './component/login';
import Settings from './component/settings';
import Dictionary from "./component/dictionary";
import Weather from './component/weather';
import EnglishPuzzle from './component/english-puzzle/GamePage/GamePage';
import AuthProvider from "./component/common/auth-provider";
import './App.scss';

function App() {
  return (
    <Router>
      <div className="main">
        <Route path="/" component={NavBar} />
        <Route path="/login" component={Login} />
        <AuthProvider>
          <Route path="/weather" component={Weather} />
          <Route path="/settings" component={Settings} />
          <Route path="/dictionary" component={Dictionary} />
          <Route path="/english-puzzle" component={EnglishPuzzle} />
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
