import React, { Component } from 'react';
import Container from '../components/container';
// import { robot } from '../../assets/images/broken_robot.jpg';
import InventoryListByType from './inventoryListsByFilter/inventoryListByType';
import InventoryByUser from './inventoryListsByFilter/inventoryListByUser';
import InventoryByFacility from './inventoryListsByFilter/inventoryListByFacility';
import requestInventory from './actions/requestInventory';
import acceptRequest from './actions/approveRequest';
import InventoryRequests from './inventoryListsByFilter/inventoryRequests';
import RequestedInventory from './inventoryListsByFilter/requestedInventory';
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

  shipInventory = (e) => {
    // console.log(e.target.id);
    alert(
      'This feature is under development and will be availbale in next build',
    );
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
          <Container title="Dashboard: Inventory Requests">
            <InventoryRequests releaseInventory={this.releaseInventory} />
          </Container>
        </React.Fragment>
      );
    } else if (this.state.type === 'requestedinventory') {
      return (
        <React.Fragment>
          <Container title="Dashboard: Requested Inventory">
            <RequestedInventory />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestInventory: (payload) => dispatch(requestInventory(payload)),
    acceptRequest: (payload) => dispatch(acceptRequest(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(InventoryList);
