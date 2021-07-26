import React from 'react';
import Main from '../router/Main';
import PageNotFound from '../router/PageNotFound';
import Signup from '../router/Signup';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { Users } from '../Users';
import First from '../router/First';

const App = () => {
  return (
    <>
      <Users>
        <HashRouter>
          <Switch>
            <Route exact path="/" component={First} />
            <Route path="/main" component={Main} />
            <Route path="/signup" component={Signup} />
            <Route component={PageNotFound} />
          </Switch>
        </HashRouter>
      </Users>
    </>
  );
};

export default App;
