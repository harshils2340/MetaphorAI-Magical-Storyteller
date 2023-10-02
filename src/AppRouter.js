import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import MainPage from './MainPage';
import StoryPage from './StoryPage';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/story/:pageNumber" component={StoryPage} />
      </Switch>
    </Router>
  );
}

export default AppRouter;
