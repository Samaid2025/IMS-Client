import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import configureReduxStore from './store';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';

import Login from './components/Login/login';
import Dashboard from './components/dashboard/dashboard';

const hist = createBrowserHistory();

ReactDOM.render(
  <Provider store={configureReduxStore()}>
    <Router history={hist}>
      <Switch>
        {/* <Redirect from="/" to="/dashboard" /> */}
        <Route path="/login" component={Login} />
        <Route path="/dashboard" component={Dashboard} />

        <Route path="/" component={Dashboard} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('wrapper'),
);

serviceWorker.unregister();
