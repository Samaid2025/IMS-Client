import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { url } from '../../../helpers/urls';
import getShippedInventory from '../actions/getShippedInventory';
import { shipInventoryEventReceived } from '../actions/shipInventory';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
const EventSource = NativeEventSource || EventSourcePolyfill;

class ShippedInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeOptions: [],
      selectedType: null,
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
    };
    this.setState({
      inventoryRequestsStream: inventoryRequestsStream,
    });
    this.props
      .getShippedInventory(user_id)
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
  render() {
    if (this.state.waiting === false) {
      if (this.props.shippedInventory.length !== 0) {
        return (
          <React.Fragment>
            <table className="basic-table">
              <tr>
                <th>Product Type</th>
                <th>Expiration</th>
                <th>Product ID</th>
                <th>Facility</th>
              </tr>
              {this.props.shippedInventory.map((item, key) => (
                <tr key={item.id}>
                  <td
                    className={this.getColorClass(item.time_to_expire)}
                    data-label="Column 1"
                  >
                    {item.product_type}
                  </td>
                  <td data-label="Column 2">{item.expiration_date}</td>
                  <td data-label="Column 3">{item.product_id}</td>
                  <td data-label="Column 4">{item.facility}</td>
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
                <td>No Inventory items found</td>
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
    shippedInventory: state.InventoryReducer.shippedInventory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getShippedInventory: (payload) => dispatch(getShippedInventory(payload)),
    shipInventoryEventReceived: (payload) =>
      dispatch(shipInventoryEventReceived(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShippedInventory);
