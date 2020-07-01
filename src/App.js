import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './component/navbar';
import Login from './component/login';
import Registration from './component/registration';
import Settings from './component/settings';
import Dictionary from './component/dictionary';
import Weather from './component/weather';
<<<<<<< HEAD
import EnglishPuzzle from './component/english-puzzle/GamePage/GamePage';
=======
import EnglishPuzzle from './component/english-puzzle/EnglishPuzzle';

>>>>>>> 7f28cfec94800e6bf8b943aa8abfc1ac55b3d7a2
import SpeakIt from './component/game/speakit';
import AuthProvider from "./component/common/auth-provider";
import LearningWords from './component/learning-words';
import AudioChallenge from "./component/game/audioChallenge";
import Statistics from './component/statistics';
import LearningWords from './component/learning-words';

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
>>>>>>> develop
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
