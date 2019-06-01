import React from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import routes from '../../routes';

function RouteWithSubRoutes(route) {
  console.log(route);
  return (
    <Route
      path={route.path}
      // render={(props) => <route.component {...props} routes={route.routes} />}
      component={route.component}
    />
  );
}

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      return <Route path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class Dashboard extends React.Component {
  componentDidMount = () => {
    let token = window.localStorage.getItem('token');
    console.log(this.props.history);
    if (token === null) {
      this.props.history.push('/login');
    }
  };
  render() {
    console.log(switchRoutes);
    return (
      <React.Fragment>
        <Header history={this.props.history} />
        <div class="clearfix" />
        <div class="dashboard-container">
          <Sidebar />
          {/* {routes.map((route, i) => (
            <RouteWithSubRoutes key={i} {...route} />
          ))} */}
          {switchRoutes}
        </div>
      </React.Fragment>
    );
  }
}

export default Dashboard;
