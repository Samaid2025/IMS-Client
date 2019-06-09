import React, { Component } from 'react';
import Container from '../components/container';
import DashbaordPills from './dashboardPills'

class DashboardContent extends Component {
  render() {
    return (
      <React.Fragment>
        <Container title="Dashboard">
        <div class="row fun-facts-container">
       <DashbaordPills title="Inventory By Type" count={69}/>
        </div>
        </Container>
      </React.Fragment>
    );
  }
}
export default DashboardContent;
