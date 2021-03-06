import React from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { url } from '../../../helpers/urls';
import getCheckedInInventory from '../actions/getCheckedInInventory';
import { shipInventoryEventReceived } from '../actions/shipInventory';
import { manaualCheckOutEventReceived } from '../actions/manualChecking';
import { manaualCheckInEventReceived } from '../actions/manualChecking';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
const EventSource = NativeEventSource || EventSourcePolyfill;
class CheckedinInventory extends React.Component {
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
      if (eventData.command === 'inventory_shipped') {
        this.props.shipInventoryEventReceived(eventData);
      }
      if (eventData.command === 'inventory_checked_out_manually') {
        this.props.manaualCheckOutEventReceived(eventData);
      }

      if (eventData.command === 'inventory_checked_in_manually') {
        console.log('event caught');
        this.props.manaualCheckInEventReceived(eventData);
      }
    };
    this.setState({
      inventoryRequestsStream: inventoryRequestsStream,
    });
    this.props
      .getCheckedInInventory(user_id)
      .then(() => {
        this.setState({
          waiting: false,
        });
      })
      .catch((e) => {
        this.setState({
          waiting: false,
        });
        throw e;
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
  getTime = (time) => {
    let lastCheckin = time.substring(
      time.lastIndexOf('T') + 1,
      time.lastIndexOf('.'),
    );
    return lastCheckin;
  };
  render() {
    if (this.state.waiting === false) {
      if (this.props.checkedInInventory.length !== 0) {
        return (
          <React.Fragment>
            <table className="basic-table">
              <tr>
                <th>Product Type</th>
                <th>Last Check In</th>
                <th>Product ID</th>
                <th>Facility</th>
                <th>Check Out</th>
                <th>Ship</th>
              </tr>
              {this.props.checkedInInventory.map((item, key) => (
                <tr key={item.id}>
                  <td
                    className={this.getColorClass(item.time_to_expire)}
                    data-label="Column 1"
                  >
                    {item.product_type}
                  </td>
                  <td data-label="Column 2">
                    {this.getTime(item.last_checked_in)}
                  </td>
                  <td data-label="Column 3">{item.product_id}</td>
                  <td data-label="Column 4">{item.facility}</td>
                  <td class="td-custom" data-label="Column 6">
                    <button
                      type="button"
                      class="button ripple-effect td-info-btn"
                      id={'checkout-' + item.id}
                      onClick={this.props.manauallyCheckout}
                      disabled={!item.status === 'pending'}
                    >
                      {/* {this.getRequestButtonLabel(item.status)} */}
                      Checkout
                    </button>
                  </td>

                  <td class="td-custom" data-label="Column 8">
                    <button
                      type="button"
                      class="button ripple-effect td-info-btn"
                      id={'ship-' + item.id}
                      hidden={!item.can_ship}
                      onClick={this.props.shipInventory}
                    >
                      Ship
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
                <th>Check Out</th>
                <th>Ship</th>
              </tr>
              <tr>
                <td />
                <td />
                <td>No Inventory items found</td>
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
              <th>Check Out</th>
              <th>Ship</th>
            </tr>
            <tr>
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
            </tr>
          </table>
        </React.Fragment>
      );
    }
  }
}
const mapStateToProps = (state) => {
  return {
    checkedInInventory: state.InventoryReducer.checkedInInventory,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCheckedInInventory: (payload) =>
      dispatch(getCheckedInInventory(payload)),
    shipInventoryEventReceived: (payload) =>
      dispatch(shipInventoryEventReceived(payload)),
    manaualCheckOutEventReceived: (payload) =>
      dispatch(manaualCheckOutEventReceived(payload)),
    manaualCheckInEventReceived: (payload) =>
      dispatch(manaualCheckInEventReceived(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CheckedinInventory);
