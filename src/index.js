import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
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
        {/* <Route path="/" component={Login} /> */}
        <Route path="/login" component={Login} />
        <Route path="/" component={Dashboard} />

        {/* <Route path="/" component={Login} /> */}

        {/* <Redirect from="/" to="/login" /> */}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('wrapper'),
);

serviceWorker.unregister();
