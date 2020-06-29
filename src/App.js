import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './component/navbar';
import Login from './component/login';
import Registration from './component/registration';
import Settings from './component/settings';
import Dictionary from './component/dictionary';
import Weather from './component/weather';
import EnglishPuzzle from './component/english-puzzle/EnglishPuzzle';
import AudioChallenge from "./component/game/audioChallenge";

import SpeakIt from './component/game/speakit';
import AuthProvider from './component/common/auth-provider';
import LineStatistics from './component/long-term-statistics';

import './App.scss';

function App() {
  return (
    <Router>
      <div className="main">
        <Route path="/" component={NavBar} />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <AuthProvider>
          <Route path="/weather" component={Weather} />
          <Route path="/settings" component={Settings} />
          <Route path="/dictionary" component={Dictionary} />
          <Route path="/english-puzzle" component={EnglishPuzzle} />
          <Route path="/game/speakit" component={SpeakIt} />
          <Route path="/long-term-statistics" component={LineStatistics} />
          <Route path="/audioChallenge" component={AudioChallenge} />
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
