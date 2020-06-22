import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './sprint.css';

import Start from './start';
import Game from './game';
import Statistics from './statistics';

function Sprint() {
  return (
    <Router>
      <Route path="/" component={Start} />
      <Route path="/game" component={Game} />
      <Route path="/statistics" component={Statistics} />
    </Router>
  );
}

export default Sprint;
