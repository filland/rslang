import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import NavBar from './component/navbar';
import Menu from './component/menu';
import Login from './component/login';
import Registration from './component/registration';
import Settings from './component/settings';
import Dictionary from './component/dictionary';
import Promo from './component/promo';
import EnglishPuzzle from './component/english-puzzle/EnglishPuzzle';
import AudioChallenge from './component/game/audioChallenge';
import Sprint from './component/sprint/sprint';
import LearningWords from './component/learning-words';
import SpeakIt from './component/game/speakit';
import AuthProvider from './component/common/auth-provider';
import LineStatistics from './component/long-term-statistics';
import Loader from './component/common/loader/index';
import MainPage from './component/main-page/index';

import './App.scss';
import Savanna from './component/savanna/index';

function App() {
  return (
    <Router>
      <div className="main">
        <Route path="/" component={NavBar} />
        <Route path="/" component={Menu} />
        <Route path="/login" component={Login} />
        <Route path="/registration" component={Registration} />
        <Route path="/" component={Loader} />
        <AuthProvider>
          <Route path="/main-page" component={MainPage} />
          <Route path="/promo" component={Promo} />
          <Route path="/settings" component={Settings} />
          <Route path="/dictionary" component={Dictionary} />
          <Route path="/learning" component={LearningWords} />
          <Route path="/english-puzzle" component={EnglishPuzzle} />
          <Route path="/savanna" component={Savanna} />
          <Route path="/game/speakit" component={SpeakIt} />
          <Route path="/long-term-statistics" component={LineStatistics} />
          <Route path="/audioChallenge" component={AudioChallenge} />
          <Route path="/sprint" component={Sprint} />
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
