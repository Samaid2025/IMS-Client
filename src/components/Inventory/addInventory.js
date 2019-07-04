import React, { Component } from 'react';
import CustomInput from '../components/customInput';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import Select from 'react-select';
import { customStyles } from '../Facilities/selectStyles';
import getFacilities from '../Facilities/actions/getFacilities';
import postInventory from './actions/postInventory';
import getProductTypes from './actions/getProductTypes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner';
import dateFormat from 'dateformat';

class AddInventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inventoryItem: {
        expiration: new Date(),
        expirationError: false,
        expirationErrorMsg: 'Expiration date is required',
        releaseDate: new Date(),
        releaseDateError: false,
        releaseDateErrorMsg: 'Release date is required',
        productID: '',
        productIDError: false,
        RFIDNumber: '',
        RFIDNumberError: false,
        vendor: '',
        vendorError: '',
        selectedFacility: null,
        selectedFacilityError: false,
        selectedType: null,
        selectedTypeError: false,
      },
      facilityOptions: [],
      typeOptions: [],
      waiting: false,
    };
  }
  componentDidMount = () => {
    let token = window.localStorage.getItem('token');
    if (token === null) {
      console.log(this.props.history);
      this.props.history.push('/login');
    }

    let user_id = window.localStorage.getItem('user_id');
    this.props.getFacilities(user_id).then(() => {
      let opts = [];

      if (this.props.facilities !== undefined) {
        this.props.facilities.forEach((element) => {
          opts.push({
            label: element.facility_name,
            value: element.id,
          });
        });

        this.setState({
          facilityOptions: opts,
        });
      }
    });
    this.props.getProductTypes().then(() => {
      if (this.props.productTypes !== undefined) {
        let opts = [];
        this.props.productTypes.forEach((element) => {
          opts.push({
            label: element.type,
            value: element.id,
          });
        });
        this.setState({
          typeOptions: opts,
        });
      }
    });
  };
  handleChange = (e, name) => {
    // if e is an instance of Event else its treat it as a an instance of Date
    if (e !== null) {
      if (e.target !== undefined) {
        const { inventoryItem } = this.state;
        inventoryItem[e.target.name] = e.target.value;
        inventoryItem[e.target.name + 'Error'] = false;
        this.setState({
          inventoryItem: inventoryItem,
          errorMessage: '',
        });
      } else {
        const { inventoryItem } = this.state;
        if (e < new Date()) {
          inventoryItem[name + 'ErrorMsg'] =
            "Choose a date later than today's date";
          inventoryItem[name + 'Error'] = true;
          this.setState({
            inventoryItem: inventoryItem,
            errorMessage: '',
          });
          return;
        }
        inventoryItem[name] = e;
        inventoryItem[name + 'Error'] = false;
        this.setState({
          inventoryItem: inventoryItem,
          errorMessage: '',
        });
      }
    }
  };
  validateData = () => {
    let isValid = true;
    const { inventoryItem } = this.state;
    console.log(inventoryItem['expiration']);
    for (let key in inventoryItem) {
      if (
        inventoryItem[key] === '' ||
        inventoryItem[key] === null ||
        document.getElementsByName(key).value === '' ||
        /\S/.test(inventoryItem[key]) === false
      ) {
        inventoryItem[key + 'Error'] = true;
        this.setState({
          inventoryItem: inventoryItem,
        });
        isValid = false;
      }
      // if any of the fields errors are set render inventory data invalid
      if (inventoryItem[key] === true) {
        isValid = false;
      }
    }
    return isValid;
  };

  handleFacilitySelect = (selectedOption) => {
    const { inventoryItem } = this.state;
    inventoryItem['selectedFacility'] = selectedOption;
    inventoryItem['selectedFacilityError'] = false;
    this.setState({
      inventoryItem: inventoryItem,
    });
  };
  handleTypeSelect = (selectedOption) => {
    const { inventoryItem } = this.state;
    inventoryItem['selectedType'] = selectedOption;
    inventoryItem['selectedTypeError'] = false;
    this.setState({
      inventoryItem: inventoryItem,
    });
  };

  handleCreateInventory = () => {
    if (this.validateData() === false) {
      return;
    } else {
      this.setState({
        waiting: true,
      });
      let payload = {
        facility: this.state.inventoryItem.selectedFacility.value,
        product_type: this.state.inventoryItem.selectedType.value,
        product_expiration: this.state.inventoryItem.expiration
          .toJSON()
          .slice(0, 10)
          .replace(/-/g, '-'),
        product_release: this.state.inventoryItem.releaseDate
          .toJSON()
          .slice(0, 10)
          .replace(/-/g, '-'),
        product_id: this.state.inventoryItem.productID,
        rfid_number: this.state.inventoryItem.RFIDNumber,
        product_vendor: this.state.inventoryItem.vendor,
        user_id: window.localStorage.getItem('user_id'),
      };
      console.log(payload);
      this.props
        .postInventory(payload)
        .then(() => {
          if (this.props.postedProduct.status === 200) {
            toast.success('Inventory added successfully');
            this.setState({
              waiting: false,
              inventoryItem: {
                expiration: new Date(),
                expirationError: false,
                releaseDate: new Date(),
                releaseDateError: false,
                productID: '',
                productIDError: false,
                RFIDNumber: '',
                RFIDNumberError: false,
                vendor: '',
                vendorError: '',
                selectedFacility: null,
                selectedFacilityError: false,
                selectedType: null,
                selectedTypeError: false,
              },
            });
          } else if (this.props.postedProduct.status === 401) {
            this.setState({
              waiting: false,
            });
            toast.error(
              'Inventory could not be added. The RFID number already exists.',
            );
          } else if (this.props.postedProduct.status === 404) {
            this.setState({
              waiting: false,
            });
            toast.error(
              'Inventory could not be added. The product ID already exists.',
            );
          } else {
            this.setState({
              waiting: false,
            });
            toast.error('Inventory could not be added');
          }
        })
        .catch((e) => {
          this.setState({
            waiting: false,
          });
          toast.error('Inventory could not be added');
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <div class="dashboard-content-container" data-simplebar>
          <div class="dashboard-content-inner">
            <div class="dashboard-headline">
              <h3 class="margin-bottom-40">Add New Inventory</h3>
            </div>

            <div class="row">
              <div class="col-xl-12">
                <div class="dashboard-box margin-top-0">
                  <div class="headline">
                    <h3>
                      <i class="icon-feather-file-plus" /> Add Inventory Form
                    </h3>
                  </div>

                  <div class="content with-padding padding-bottom-10">
                    <div class="row">
                      <div class="col-xl-4">
                        <div class="submit-field">
                          <h5> Facility</h5>

                          <Select
                            value={this.state.inventoryItem.selectedFacility}
                            onChange={this.handleFacilitySelect}
                            options={this.state.facilityOptions}
                            styles={customStyles}
                          />
                          {this.state.inventoryItem.selectedFacilityError ===
                          true ? (
                            <p style={{ color: 'red', marginTop: '13px' }}>
                              Please select a facility
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <div class="col-xl-4">
                        <div class="submit-field">
                          <h5> Product Type</h5>

                          <Select
                            value={this.state.inventoryItem.selectedType}
                            onChange={this.handleTypeSelect}
                            options={this.state.typeOptions}
                            styles={customStyles}
                          />
                          {this.state.inventoryItem.selectedTypeError ? (
                            <p style={{ color: 'red', marginTop: '13px' }}>
                              Please select a product type
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <div class="col-xl-4">
                        <div class="submit-field">
                          <h5> Product Expiration</h5>
                          <div class="input-with-icon-left">
                            <DatePicker
                              onChange={(date) => {
                                this.handleChange(date, 'expiration');
                              }}
                              selected={this.state.inventoryItem.expiration}
                              placeholderText="Exipration Date"
                              dateFormat="MMMM d, yyyy"
                              minDate={new Date()}
                              className="input-text with-border icon-material-outline-date-range"
                            />
                            {this.state.inventoryItem.expirationError ? (
                              <p style={{ color: 'red' }}>
                                {this.state.inventoryItem.expirationErrorMsg}
                              </p>
                            ) : null}
                          </div>
                        </div>
                      </div>

                      <div class="col-xl-4">
                        <div class="submit-field">
                          <h5> Product Release After</h5>
                          <div class="input-with-icon-left">
                            <div id="autocomplete-container">
                              <DatePicker
                                onChange={(date) => {
                                  this.handleChange(date, 'releaseDate');
                                }}
                                selected={this.state.inventoryItem.releaseDate}
                                placeholderText="Release Date"
                                dateFormat="MMMM d, yyyy"
                                minDate={new Date()}
                                className="input-text with-border icon-material-outline-date-range"
                              />
                              {this.state.inventoryItem.releaseDateError ? (
                                <p style={{ color: 'red' }}>
                                  {this.state.inventoryItem.releaseDateErrorMsg}
                                </p>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-xl-4">
                        <div class="submit-field">
                          <h5>Product ID</h5>
                          {/* <input type="text" class="with-border" /> */}
                          <CustomInput
                            type="text"
                            value={this.state.inventoryItem.productID}
                            name="productID"
                            placeholder="Product ID"
                            onChange={this.handleChange}
                            hasIcon={false}
                            iconClass="icon-line-awesome-user"
                            error={this.state.inventoryItem.productIDError}
                            helpText="Product ID  is required"
                          />
                        </div>
                      </div>

                      <div class="col-xl-4">
                        <div class="submit-field">
                          <h5>RFID Number</h5>
                          {/* <input type="text" class="with-border" /> */}
                          <CustomInput
                            type="text"
                            value={this.state.inventoryItem.RFIDNumber}
                            name="RFIDNumber"
                            placeholder="RFID Number"
                            onChange={this.handleChange}
                            hasIcon={false}
                            iconClass="icon-line-awesome-user"
                            error={this.state.inventoryItem.RFIDNumberError}
                            helpText="RFID number is required"
                          />
                        </div>
                      </div>

                      <div class="col-xl-4">
                        <div class="submit-field">
                          <h5> Product Vendor</h5>
                          {/* <Select
                            // value={this.state.facility.selectedAdmin}
                            // onChange={this.handleAdminSelect}
                            // options={this.state.managerOptions}
                            styles={customStyles}
                          /> */}
                          <CustomInput
                            type="text"
                            value={this.state.inventoryItem.vendor}
                            name="vendor"
                            placeholder="Vendor"
                            onChange={this.handleChange}
                            hasIcon={false}
                            iconClass="icon-line-awesome-user"
                            error={this.state.inventoryItem.vendorError}
                            helpText="Vendor is required"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-12">
                <button
                  href="#"
                  class="button ripple-effect big margin-top-30"
                  onClick={this.handleCreateInventory}
                >
                  {this.state.waiting ? (
                    <Loader type="Bars" color="white" height={100} width={20} />
                  ) : (
                    <span>
                      <i class="icon-feather-plus" /> Add Inventory
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    facilities: state.FacilitiesReducer.facilities,
    productTypes: state.InventoryReducer.productTypes,
    postedProduct: state.InventoryReducer.postedProduct,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFacilities: (payload) => dispatch(getFacilities(payload)),
    postInventory: (payload) => dispatch(postInventory(payload)),
    getProductTypes: () => dispatch(getProductTypes()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddInventory);
