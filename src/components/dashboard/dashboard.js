import React from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import { HashRouter as Router, Route } from 'react-router-dom';

import routes from '../../routes';

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => <route.component {...props} routes={route.routes} />}
    />
  );
}

class Dashboard extends React.Component {
  render() {
    return (
      <Router>
        <Header history={this.props.history} />
        <div class="dashboard-container">
          <Sidebar />
          {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))}
        </div>
      </Router>
    );
  }
}

export default Dashboard;
