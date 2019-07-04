import React, { Component } from 'react';
import Container from '../components/container';
// import { robot } from '../../assets/images/broken_robot.jpg';
import InventoryListByType from './inventoryListsByFilter/inventoryListByType';
import InventoryByUser from './inventoryListsByFilter/inventoryListByUser';
import InventoryByFacility from './inventoryListsByFilter/inventoryListByFacility';
import ShippedInventory from './inventoryListsByFilter/shippedInventory';
import requestInventory from './actions/requestInventory';
import acceptRequest from './actions/approveRequest';
import InventoryRequests from './inventoryListsByFilter/inventoryRequests';
import RequestedInventory from './inventoryListsByFilter/requestedInventory';
import declineInventoryRequest from './actions/declineRequest';
import shipInventory from './actions/shipInventory';
import CheckedinInventory from './inventoryListsByFilter/checkedInInventory';
import CheckedOutInventory from './inventoryListsByFilter/checkedoutInventory';
import InventoryByExpiration from './inventoryListsByFilter/inventoryByExpiration';
import manualCheckInOut from './actions/manualChecking';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { connect } from 'react-redux';

const data = [
  {
    id: 32,
    rfid_number: 'rf68',
    product_type: 'Crokery',
    facility: 'mona facility',
    product_vendor: 'fsd656',
    user: 'savier.ahmer@gmail.com',
    expiration_date: '2019-08-12',
    release_date: '2019-08-12',
    product_id: '17',
    status: 'pending',
    checkout_status: true,
    shipped: false,
    last_checked_in: '2019-06-01T19:45:59.537537Z',
    daysToExpire: '12',
  },
];
class InventoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
    };
  }

  componentDidMount = () => {
    let filter = this.props.match.params.filter;
    this.setState({
      type: filter,
    });
  };

  requestInventory = (e) => {
    e.persist();
    e.target.innerHTML = 'Requesting...';
    let user_id = window.localStorage.getItem('user_id');
    let id = e.target.id.split('-')[1];
    let payload = {
      product_id: id,
      user_id: user_id,
    };
    this.props
      .requestInventory(payload)
      .then(() => {
        if (this.props.inventoryRequestResponse.status === 200) {
          toast.success(
            'Inventory has been requested. You can follow its status on Requested Inventory Page',
          );
        } else if (this.props.inventoryRequestResponse.status === 401) {
          toast.error('This inventory item can not be released yet');
          e.target.innerHTML = 'Request';
        } else if (this.props.inventoryRequestResponse.status === 404) {
          toast.error('This inventory item is no longer available');
          e.target.innerHTML = 'Unavailable';
          e.target.disable = true;
        }
      })
      .catch((e) => {});
  };

  releaseInventory = (e) => {
    e.persist();
    e.target.innerHTML = 'Releasing...';
    let user_id = window.localStorage.getItem('user_id');
    let request_id = e.target.id.split('-')[1];
    console.log(request_id);
    this.props
      .acceptRequest({
        request_id: request_id,
        user_id: user_id,
      })
      .then(() => {
        if (this.props.postedProduct.status === 200) {
          toast.success('Inventory released successfully');
        }
      });
  };

  declineInventoryRequest = (e) => {
    e.persist();
    e.target.innerHTML = 'Canceling...';
    let request_id = e.target.id.split('-')[1];
    console.log('cancel ', request_id);
    this.props.declineInventoryRequest(request_id).then(() => {
      if (this.props.inventoryRequestResponse.status === 200) {
        toast.success('Inventory request declined');
      }
    });
  };

  shipInventory = (e) => {
    e.persist();
    e.target.innerHTML = 'Shipping...';
    let inventory_id = e.target.id.split('-')[1];
    let user_id = window.localStorage.getItem('user_id');
    this.props
      .shipInventory({
        inv_id: inventory_id,
        user_id: user_id,
      })
      .then(() => {
        if (this.props.shipInventoryResponse.status === 200) {
          toast.success('inventory shipped successfully');
          e.target.innerHTML = 'Shipped';
        } else {
          toast.error('iventory could not be shipped');
          e.target.innerHTML = 'Ship';
        }
      });
  };
  manauallyCheckout = (e) => {
    console.log(e.target.id);
    e.persist();
    e.target.innerHTML = 'Checking Out...';
    let inventory_id = e.target.id.split('-')[1];
    let user_id = window.localStorage.getItem('user_id');
    let payload = {
      user_id: user_id,
      inventory_id: inventory_id,
      action: 'checkOut',
    };
    this.props
      .manualCheckInOut(payload)
      .then(() => {
        if (this.props.checkInOutResponse.status === 200) {
          toast.success('Inventory Check out successfully');
          e.target.innerHTML = 'Checked Out';
        } else {
          toast.error('Inventory could not be checked out');
          e.target.innerHTML = 'CheckOut';
        }
      })
      .catch((e) => {
        toast.error('Inventory could not be checked out');
        e.target.innerHTML = 'CheckOut';
        throw e;
      });
  };
  manauallyCheckin = (e) => {
    e.persist();
    e.target.innerHTML = 'Checking In...';
    let inventory_id = e.target.id.split('-')[1];
    let user_id = window.localStorage.getItem('user_id');
    let payload = {
      user_id: user_id,
      inventory_id: inventory_id,
      action: 'checkIn',
    };
    this.props
      .manualCheckInOut(payload)
      .then(() => {
        if (this.props.checkInOutResponse.status === 200) {
          toast.success('Inventory Checked In successfully');
          e.target.innerHTML = 'Checked In';
        } else {
          toast.error('Inventory could not be checked in');
          e.target.innerHTML = 'Check In';
        }
      })
      .catch((e) => {
        toast.error('Inventory could not be checked in');
        e.target.innerHTML = 'Check In';
        throw e;
      });
  };
  render() {
    if (this.state.type === 'byType') {
      return (
        <React.Fragment>
          <ToastContainer />
          <Container title="Dashboard: Inventory By Type">
            <InventoryListByType
              data={data}
              requestInventory={this.requestInventory}
              shipInventory={this.shipInventory}
            />
          </Container>
        </React.Fragment>
      );
    } else if (this.state.type === 'byUser') {
      return (
        <React.Fragment>
          <ToastContainer />
          <Container title="Dashboard: Inventory Added By You">
            <InventoryByUser
              data={data}
              requestInventory={this.requestInventory}
              shipInventory={this.shipInventory}
            />
          </Container>
        </React.Fragment>
      );
    } else if (this.state.type === 'byFacility') {
      return (
        <React.Fragment>
          <ToastContainer />
          <Container title="Dashboard: Inventory Added By Your Facility">
            <InventoryByFacility
              data={data}
              requestInventory={this.requestInventory}
              shipInventory={this.shipInventory}
            />
          </Container>
        </React.Fragment>
      );
    } else if (this.state.type === 'inventoryrequests') {
      return (
        <React.Fragment>
          <ToastContainer />
          <Container title="Dashboard: Inventory Requests">
            <InventoryRequests
              releaseInventory={this.releaseInventory}
              declineInventoryRequest={this.declineInventoryRequest}
            />
          </Container>
        </React.Fragment>
      );
    } else if (this.state.type === 'requestedinventory') {
      return (
        <React.Fragment>
          <ToastContainer />
          <Container title="Dashboard: Requested Inventory">
            <RequestedInventory
              declineInventoryRequest={this.declineInventoryRequest}
            />
          </Container>
        </React.Fragment>
      );
    } else if (this.state.type === 'shippedInventory') {
      return (
        <React.Fragment>
          <ToastContainer />
          <Container title="Shipped Inventory">
            <ShippedInventory />
          </Container>
        </React.Fragment>
      );
    } else if (this.state.type === 'CheckedinInventory') {
      return (
        <React.Fragment>
          <ToastContainer />
          <Container title="Checked In Inventory">
            <CheckedinInventory
              shipInventory={this.shipInventory}
              manauallyCheckout={this.manauallyCheckout}
            />
          </Container>
        </React.Fragment>
      );
    } else if (this.state.type === 'CheckedoutInventory') {
      return (
        <React.Fragment>
          <ToastContainer />
          <Container title="Checked Out Inventory">
            <CheckedOutInventory manauallyCheckin={this.manauallyCheckin} />
          </Container>
        </React.Fragment>
      );
    } else if (this.state.type === 'inventoryByExpiration') {
      return (
        <React.Fragment>
          <ToastContainer />
          <Container title="Inventory By Expiration">
            <InventoryByExpiration shipInventory={this.shipInventory} />
          </Container>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Container title="Dashboard">
            <div style={{ textAlign: 'center' }}>
              <img src="/images/robot.png" style={{ maxWidth: '50%' }} />
            </div>
          </Container>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    inventoryRequestResponse: state.InventoryReducer.inventoryRequestResponse,
    postedProduct: state.InventoryReducer.postedProduct,
    shipInventoryResponse: state.InventoryReducer.shipInventoryResponse,
    checkInOutResponse: state.InventoryReducer.checkInOutResponse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestInventory: (payload) => dispatch(requestInventory(payload)),
    acceptRequest: (payload) => dispatch(acceptRequest(payload)),
    declineInventoryRequest: (payload) =>
      dispatch(declineInventoryRequest(payload)),
    shipInventory: (payload) => dispatch(shipInventory(payload)),
    manualCheckInOut: (payload) => dispatch(manualCheckInOut(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InventoryList);
