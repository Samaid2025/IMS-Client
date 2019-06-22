import React, { Component } from 'react';
import Container from '../components/container';
import DashbaordPills from './dashboardPills';
import getInventoryCount from './actions/getInventoryCount';
import updateRequestInventoryCount from './actions/updateDashboardCounts';
import { url } from '../../helpers/urls';
import { connect } from 'react-redux';
import { bellAudio } from '../Inventory/audio';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
const EventSource = NativeEventSource || EventSourcePolyfill;

class DashboardContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventoryRequestsStream: null,
    };
  }
  componentDidMount = () => {
    let user_id = window.localStorage.getItem('user_id');
    let facility = window.localStorage.getItem('facility');
    console.log('inentory counts are', this.state.inventoryCounts);
    let { inventoryRequestsStream } = this.state;
    inventoryRequestsStream = new EventSource(
      url + '/events/' + facility + '/' + user_id,
    );
    inventoryRequestsStream.onopen = () => {
      this.setState({
        message: 'connected',
      });
    };
    inventoryRequestsStream.onmessage = (event) => {
      console.log(JSON.parse(event.data));
      if (JSON.parse(event.data).counts !== undefined) {
        this.props.updateRequestInventoryCount(
          JSON.parse(event.data).counts.inventoryRequestCount,
        );
        this.forceUpdate();
        let sound = new Audio(bellAudio);
        sound.play();
      }
    };
    this.setState({
      inventoryRequestsStream: inventoryRequestsStream,
    });
    this.props.getInventoryCount(user_id);
  };

  componentWillUnmount = () => {
    let { inventoryRequestsStream } = this.state;
    inventoryRequestsStream.close();
    this.setState({
      inventoryRequestsStream: inventoryRequestsStream,
    });
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
            <DashbaordPills
              title="Inventory Requests"
              count={
                this.props.inventoryCounts.inventoryRequestCount !== undefined
                  ? this.props.inventoryCounts.inventoryRequestCount
                  : 0
              }
              to={`/inventory/inventoryrequests`}
            />
            <DashbaordPills
              title="Requested Inventory"
              count={
                this.props.inventoryCounts.requestedInventory !== undefined
                  ? this.props.inventoryCounts.requestedInventory
                  : 0
              }
              to={`/inventory/requestedinventory`}
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
    updateRequestInventoryCount: (payload) =>
      dispatch(updateRequestInventoryCount(payload)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToPRops,
)(DashboardContent);
