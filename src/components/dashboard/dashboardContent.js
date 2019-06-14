import React, { Component } from 'react';
import Container from '../components/container';
import DashbaordPills from './dashboardPills';
import getInventoryCount from './actions/getInventoryCount';
import { connect } from 'react-redux';

class DashboardContent extends Component {
  componentDidMount = () => {
    // let user_id = window.localStorage.getItem('user_id');
    // this.props.getInventoryCount(user_id);
  };
  render() {
    return (
      <React.Fragment>
        <Container title="Dashboard">
          <div class="row fun-facts-container">
            <DashbaordPills
              title="Inventory By Type"
              count={
                this.props.inventoryCounts.all_inventories_by_type !== undefined
                  ? this.props.inventoryCounts.all_inventories_by_type
                  : 0
              }
              to={`/inventory/byType`}
            />
            <DashbaordPills
              title="Inventory By You"
              count={
                this.props.inventoryCounts.user_inventories_count !== undefined
                  ? this.props.inventoryCounts.user_inventories_count
                  : 0
              }
              to={`/inventory/byUser`}
            />
            <DashbaordPills
              title="Inventory By Facility"
              count={
                this.props.inventoryCounts.user_facility_inventories_count !==
                undefined
                  ? this.props.inventoryCounts.user_facility_inventories_count
                  : 0
              }
              to={`/inventory/byFacility`}
            />
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    inventoryCounts: state.DashboardReducer.inventoryCounts,
  };
};

const mapDispatchToPRops = (dispatch) => {
  return {
    getInventoryCount: (user_id) => dispatch(getInventoryCount(user_id)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToPRops,
)(DashboardContent);
