import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Ranking from './pages/Ranking';
import Feedback from './pages/Feedback';
import Game from './pages/Game';
import Config from './pages/Config';
import Login from './pages/Login';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/feedback" component={ Feedback } />
        <Route path="/ranking" component={ Ranking } />
        <Route path="/config" component={ Config } />
      </Switch>
    );
  }
}

export default App;
