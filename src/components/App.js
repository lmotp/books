import React from 'react';
import Main from '../router/Main';
import PageNotFound from '../router/PageNotFound';
import Login from '../router/Login';
import Signup from '../router/Signup';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Users } from '../Users';

const App = () => {
  return (
    <>
      <Users>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </Users>
    </>
  );
};

export default App;
