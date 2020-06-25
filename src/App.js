import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './component/navbar';
import Login from './component/login';
import Registration from './component/registration';
import Settings from './component/settings';
import Dictionary from './component/dictionary';
import Weather from './component/weather';
<<<<<<< HEAD
=======
import EnglishPuzzle from './component/english-puzzle/GamePage/GamePage';
import SpeakIt from './component/game/speakit';
import AuthProvider from "./component/common/auth-provider";
import LearningWords from './component/learning-words/LearningWords';

>>>>>>> 2921154... fix: merge commit to fix conflicts
import './App.scss';

import './App.scss';

function App() {
  return (
    <Router>
      <div className="main">
        <Route path="/" component={NavBar} />
<<<<<<< HEAD
        <Route path="/learning-words" component={LearningWords}/>
        <Route path="/weather" component={Weather} />
        <Route path="/settings" component={Settings} />
        <Route path="/login" component={Login} />
        {/* <Route path="/english-puzzle" component={EnglishPuzzle} /> */}
=======
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <AuthProvider>
          <Route path="/weather" component={Weather} />
          <Route path="/settings" component={Settings} />
          <Route path="/dictionary" component={Dictionary} />
          <Route path="/english-puzzle" component={EnglishPuzzle} />
          <Route path="/learning-words" component={LearningWords}/>
          <Route path="/game/speakit" component={SpeakIt} />
        </AuthProvider>
>>>>>>> 2921154... fix: merge commit to fix conflicts
      </div>
    </Router>
  );
}

export default App;
