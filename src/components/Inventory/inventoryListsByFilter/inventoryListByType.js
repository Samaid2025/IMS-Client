import React, { Component } from 'react';
import Select from 'react-select';
import { customStyles } from '../../Facilities/selectStyles';
import { connect } from 'react-redux';
import getProductTypes from '../actions/getProductTypes'
import getInventoryItems from '../actions/getInventoryItems'
import Loader from 'react-loader-spinner';
const data = [
  {
    id: 1,
    asd: 'asda',
    sada: 'asda',
    asdasd: 'asda',
  },
];
class InventoryListByType extends Component {
  
  constructor(props){
    super(props)
    this.state={
      typeOptions:[],
      selectedType:null,
      waiting:true,
    }
  }
  componentDidMount=()=>{
    let user_id = window.localStorage.getItem('user_id');
    this.props.getProductTypes().then(() => {
      if (this.props.productTypes !== undefined) {
        let opts = [];
        this.props.productTypes.forEach((element) => {
          opts.push({
            label: element.type,
            value: element.id,
          });
        });
        
        this.props.getInventoryItems(user_id,"byType",opts[0].label).then(()=>{
          this.setState({
            typeOptions: opts,
            selectedType:opts[0],
            waiting:false
          });
        })
      }
    });
  }

  handleTypeSelect = (selectedOption) =>{
    let user_id = window.localStorage.getItem('user_id');
    this.setState({
      waiting:true,
      selectedType:selectedOption
    })
    this.props.getInventoryItems(user_id,"byType",selectedOption.label).then(()=>{
      this.setState({
        waiting:false
      });
    })
  }

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
    if(this.state.waiting === false){
      return (
        <React.Fragment>
          <div className="row" style={{marginBottom:"10px"}}>
            <Select
                              value={this.state.selectedType}
                              onChange={this.handleTypeSelect}
                              options={this.state.typeOptions}
                              placeholder="Product Type"
                              styles={customStyles}
                            />
              </div>
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
            {this.props.productList.map((item, key) => (
            <tr key={item.id}>
              <td
                className={this.getColorClass(item.daysToExpire)}
                data-label="Column 1"
              >
                {item.product_type}
              </td>
              <td data-label="Column 2">{item.expiration_date}</td>
              <td data-label="Column 3">{item.product_id}</td>
              <td data-label="Column 4">{item.facility}</td>
              <td data-label="Column 5">{item.release_date}</td>
              <td class="td-custom" data-label="Column 6">
                <button
                  type="button"
                  class="button ripple-effect td-info-btn"
                  id={'request-' + item.id}
                  onClick={this.props.requestInventory}
                >
                  Request
                </button>
              </td>
              <td class="td-info" data-label="Column 7" />
              <td class="td-custom" data-label="Column 8">
                <button
                  type="button"
                  class="button ripple-effect td-info-btn"
                  id={'ship-' + item.id}
                  onClick={this.props.shipInventory}
                >
                  Ship
                </button>
              </td>
            </tr>
          ))}
          </table>
          <div class="row">
                <div class="col-md-12">
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
    }
    else{
      return (
        <React.Fragment>
          <div className="row" style={{marginBottom:"10px"}}>
            <Select
                              value={this.state.selectedType}
                              // onChange={this.handleAdminSelect}
                              options={this.state.typeOptions}
                              placeholder="Product Type"
                              styles={customStyles}
                            />
              </div>
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
              <td></td>
              <td></td>
              <td></td>
              <td>
              <Loader type="RevolvingDot" color="blue" height={40} width={40} />
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          </table>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    productTypes: state.InventoryReducer.productTypes,
    productList: state.InventoryReducer.productList
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProductTypes: () => dispatch(getProductTypes()),
    getInventoryItems : (user_id,filter,productType) => dispatch(getInventoryItems(user_id,filter,productType))
  };
};


export default connect(mapStateToProps,mapDispatchToProps)(InventoryListByType);