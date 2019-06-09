import React, { Component } from 'react';
import Container from '../components/container';
import InventoryListByType from './inventoryListsByFilter/inventoryListByType';
import Loader from 'react-loader-spinner';


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
    console.log(e.target);
    e.target.innerHTML = 'Requesting...';
  };

  shipInventory = (e) => {
    console.log(e.target.id);
  };

  render() {
    if (this.state.type === 'byType') {
      return (
        <React.Fragment>
          <Container title="Dashboard">
          
            <InventoryListByType
              data={data}
              requestInventory={this.requestInventory}
              shipInventory={this.shipInventory}
            />
            
          </Container>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Container title="Dashboard">TBD</Container>
        </React.Fragment>
      );
    }
  }
}



export default InventoryList
