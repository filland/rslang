import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './component/navbar';
import Login from './component/login';
import Registration from './component/registration';
import Settings from './component/settings';
import Dictionary from './component/dictionary';
import Weather from './component/weather';
import EnglishPuzzle from './component/english-puzzle/GamePage/GamePage';
import SpeakIt from './component/game/speakit';
import AuthProvider from "./component/common/auth-provider";
import EnglishPuzzle from './component/english-puzzle/EnglishPuzzle';
import SpeakIt from './component/game/speakit';
import AuthProvider from './component/common/auth-provider';
import Statistics from './component/statistics';
import LearningWords from './component/learning-words';


import './App.scss';

import './App.scss';

function App() {
  return (
    <Router>
      <div className="main">
        <Route path="/" component={NavBar} />
        <Route path="/learning-words" component={LearningWords}/>
        <Route path="/weather" component={Weather} />
        <Route path="/settings" component={Settings} />
        <Route path="/login" component={Login} />
        {/* <Route path="/english-puzzle" component={EnglishPuzzle} /> */}
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <AuthProvider>
          <Route path="/weather" component={Weather} />
          <Route path="/settings" component={Settings} />
          <Route path="/dictionary" component={Dictionary} />
          <Route path="/english-puzzle" component={EnglishPuzzle} />
          <Route path="/learning" component={LearningWords}/>
          <Route path="/game/speakit" component={SpeakIt} />
<<<<<<< HEAD
=======
          <Route path="/statistics" component={Statistics} />
          <Route path="/audioChallenge" component={AudioChallenge} />
>>>>>>> 14e65b1... fix: fix conflicts
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
