import React, { Component } from 'react';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import getRequestedInventory from '../actions/getRequestedInventory';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
const EventSource = NativeEventSource || EventSourcePolyfill;

class RequestedInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: true,
      inventoryRequestsStream: null,
    };
  }
  componentDidMount = () => {
    let user_id = window.localStorage.getItem('user_id');
    this.props.getRequestedInventory(user_id).then(() => {
      console.log('loaded inventory ', this.props.requestedInventory);
      this.setState({
        waiting: false,
      });
    });
  };
  render() {
    if (this.state.waiting === false) {
      console.log(this.props.inventoryRequests);
      if (this.props.requestedInventory.length !== 0) {
        return (
          <React.Fragment>
            <table className="basic-table">
              <tr>
                <th>Product ID</th>
                <th>Expiration</th>
                <th>Requested From</th>
                <th>Action</th>
              </tr>
              {this.props.requestedInventory.map((item, key) => (
                <tr key={item.product.id}>
                  <td data-label="Product ID">{item.product.product_id}</td>
                  <td data-label="Expiration">
                    {item.product.expiration_date}
                  </td>

                  <td data-label="Requested By">
                    {item.requested_by.assigned_facility.name}
                  </td>

                  <td class="td-custom" data-label="Release">
                    <button
                      type="button"
                      class="button ripple-effect td-danger-btn"
                      id={'request-' + item.id}
                      onClick={this.props.requestInventory}
                      disabled={!item.status === 'pending'}
                    >
                      Cancel Request
                    </button>
                  </td>
                </tr>
              ))}
            </table>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <table className="basic-table">
              <tr>
                <th>Product ID</th>
                <th>Expiration</th>
                <th>Requested From</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
              <tr>
                <td />
                <td />
                <td>No Inventory requests </td>
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
              <th>Product ID</th>
              <th>Expiration</th>
              <th>Requested From</th>
              <th>Status</th>
              <th>Action</th>
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
    requestedInventory: state.InventoryReducer.requestedInventory,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRequestedInventory: (user_id) =>
      dispatch(getRequestedInventory(user_id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RequestedInventory);
