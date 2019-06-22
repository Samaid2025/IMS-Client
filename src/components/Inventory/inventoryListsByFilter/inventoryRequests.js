import React, { Component } from 'react';
import { connect } from 'react-redux';
import requestInventory from '../actions/getInventoryRequests';
import invntoryRequestReceived from '../actions/inventoryRequestReceived';
import updateRequestInventoryCount from '../../dashboard/actions/updateDashboardCounts';
import { acceptRequestEventReceived } from '../actions/approveRequest';
import Loader from 'react-loader-spinner';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import { url } from '../../../helpers/urls';
import { bellAudio } from '.././audio';
const EventSource = NativeEventSource || EventSourcePolyfill;

class InventoryRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: true,
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
      let eventData = JSON.parse(event.data);
      if (eventData.command === 'Inventory requested.') {
        this.props.invntoryRequestReceived(JSON.parse(event.data));
        let sound = new Audio(bellAudio);
        sound.play();
      }

      if (eventData.command === 'Inventory request approved by this facility') {
        let sound = new Audio(bellAudio);
        sound.play();
        this.props.acceptRequestEventReceived(eventData);
      }
    };
    this.setState({
      inventoryRequestsStream: inventoryRequestsStream,
    });
    this.props.requestInventory(user_id).then(() => {
      this.setState({
        waiting: false,
      });
    });
  };

  getColorClass = (days) => {
    if (days <= 2) {
      return 'td-danger';
    }
    if (days < 5) {
      return 'td-warning';
    }
    return 'td-success';
  };

  declineInventoryRequest = (e) => {
    console.log(e.target.id);
  };

  componentWillUnmount = () => {
    let { inventoryRequestsStream } = this.state;
    inventoryRequestsStream.close();
    this.setState({
      inventoryRequestsStream: inventoryRequestsStream,
    });
  };

  render() {
    if (this.state.waiting === false) {
      console.log(this.props.inventoryRequests);
      if (this.props.inventoryRequests.length !== 0) {
        return (
          <React.Fragment>
            <table className="basic-table">
              <tr>
                <th>Product Type</th>
                <th>Expiration</th>
                <th>Product ID</th>
                <th>Requested By</th>
                <th>Available Date</th>
                <th>Release</th>
                <th>Decline</th>
              </tr>
              {this.props.inventoryRequests.map((item, key) => (
                <tr key={item.id}>
                  <td
                    className={this.getColorClass(item.time_to_expire)}
                    data-label="Product Type"
                  >
                    {item.product.product_type}
                  </td>
                  <td data-label="Expiration">
                    {item.product.expiration_date}
                  </td>
                  <td data-label="Product ID">{item.product.product_id}</td>
                  <td data-label="Requested By">
                    {item.requested_by.assigned_facility.name}
                  </td>
                  <td data-label="Available Date">
                    {item.product.release_date}
                  </td>
                  <td class="td-custom" data-label="Release">
                    <button
                      type="button"
                      class="button ripple-effect td-info-btn"
                      id={'request-' + item.id}
                      onClick={this.props.releaseInventory}
                    >
                      Accept
                    </button>
                  </td>
                  <td class="td-custom" data-label="Decline">
                    <button
                      type="button"
                      class="button ripple-effect td-info-btn"
                      id={'declince-' + item.id}
                      onClick={this.declineInventoryRequest}
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
            </table>
            <div class="row" style={{ marginTop: '60px' }}>
              <div class="col-md-12">
                <h3>Legend</h3>
                <div class="numbered color filled custom-list">
                  <ol>
                    <li class="danger">Expiring in 48 hours or less</li>
                    <li class="success">Product Good</li>
                    <li class="warning">Expiring in 5 days or less</li>
                  </ol>
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <table className="basic-table">
              <tr>
                <th>Product Type</th>
                <th>Expiration</th>
                <th>Product ID</th>
                <th>Facility</th>
                <th>Available Date</th>
                <th>Request</th>
                <th>Ready</th>
                <th>Ship</th>
              </tr>
              <tr>
                <td />
                <td />
                <td />
                <td>No Inventory requests </td>
                <td />
                <td />
                <td />
                <td />
              </tr>
            </table>
          </React.Fragment>
        );
      }
    } else {
      return (
        <React.Fragment>
          <table className="basic-table">
            <tr>
              <th>Product Type</th>
              <th>Expiration</th>
              <th>Product ID</th>
              <th>Facility</th>
              <th>Available Date</th>
              <th>Request</th>
              <th>Ready</th>
              <th>Ship</th>
            </tr>
            <tr>
              <td />
              <td />
              <td />
              <td>
                <Loader
                  type="RevolvingDot"
                  color="blue"
                  height={40}
                  width={40}
                />
              </td>
              <td />
              <td />
              <td />
              <td />
            </tr>
          </table>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    inventoryRequests: state.InventoryReducer.inventoryRequests,
    inventoryCounts: state.DashboardReducer.inventoryCounts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestInventory: (user_id) => dispatch(requestInventory(user_id)),
    invntoryRequestReceived: (payload) =>
      dispatch(invntoryRequestReceived(payload)),
    updateRequestInventoryCount: (payload) =>
      dispatch(updateRequestInventoryCount(payload)),
    acceptRequestEventReceived: (payload) =>
      dispatch(acceptRequestEventReceived(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InventoryRequests);
