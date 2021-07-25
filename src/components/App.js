import React from 'react';
import Main from '../router/Main';
import PageNotFound from '../router/PageNotFound';
import Signup from '../router/Signup';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Users } from '../Users';
import First from '../router/First';

const App = () => {
  return (
    <>
      <Users>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={First} />
            <Route path="/main" component={Main} />
            <Route path="/signup" component={Signup} />
            <Route component={PageNotFound} />
          </Switch>
        </BrowserRouter>
      </Users>
    </>
  );
};

export default App;
