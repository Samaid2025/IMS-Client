import React, { Component } from 'react';
import CustomInput from '../components/customInput';
import Select from 'react-select';
import { customStyles } from './selectEditStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import getFacilities from './actions/getFacilities';
import getManagers from './actions/getManagers';
import updateFacility from './actions/updateFacility';
import { ToastContainer, toast } from 'react-toastify';

class EditFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      facility: {
        fname: '',
        fphone: '',
        password: '',
        address: '',
        selectedAdmin: null,
        selectedAdminError: false,
        linkedFacilities: [],
        linkedFacilitiesError: false,
        fphoneError: false,
        fnameError: false,
        passwordError: false,
        addressError: false,
      },
      facilityOptions: [],
      managerOptions: [],
      initailState: {},
      waiting: false,
      error: false,
    };
  }
  componentDidMount = () => {
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

    this.props.getManagers().then(() => {
      let opts = [];
      this.props.manager.forEach((element) => {
        opts.push({
          label: element.username,
          value: element.id,
        });
      });
      this.setState({
        managerOptions: opts,
      });
    });
  };
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps !== this.props) {
      console.log(this.props.target);
      let { facility } = this.state;
      let selectedFaclities = [];
      let selectedAdmin = {};
      facility['fname'] = this.props.target['facility_name'];
      facility['fphone'] = this.props.target['facility_phone'];
      facility['password'] = 'jkajkhadj';
      facility['address'] = this.props.target['facility_address'];
      this.state.facilityOptions.forEach((element) => {
        if (this.props.target.linked_facilities !== undefined) {
          this.props.target.linked_facilities.forEach((targetFacility) => {
            if (element.value === targetFacility.id) {
              selectedFaclities.push({
                label: element.label,
                value: element.value,
              });
            }
          });
        }
      });
      this.state.managerOptions.forEach((element) => {
        if (this.props.target.facility_admin !== undefined) {
          if (element.label === this.props.target.facility_admin) {
            selectedAdmin = {
              label: element.label,
              value: element.value,
            };
          }
        }
      });
      facility['linkedFacilities'] = selectedFaclities;
      facility['selectedAdmin'] = selectedAdmin;
      this.setState({
        facility: facility,
        initailState: facility,
      });
    }
  };
  handleChange = (e) => {
    const { facility } = this.state;
    facility[e.target.id] = e.target.value;
    facility[e.target.id + 'Error'] = false;
    this.setState({
      facility: facility,
      errorMessage: '',
      error: false,
    });
  };
  handleAdminSelect = (selectedOption) => {
    const { facility } = this.state;
    facility['selectedAdmin'] = selectedOption;
    facility['selectedAdminError'] = false;
    this.setState({
      facility: facility,
    });
  };

  handleFacilitySelect = (selectedOption) => {
    const { facility } = this.state;
    facility['linkedFacilities'] = selectedOption;
    facility['linkedFacilitiesError'] = false;
    this.setState({
      facility: facility,
    });
  };
  validateData = () => {
    let isValid = true;
    const { facility } = this.state;
    for (let key in facility) {
      if (facility[key] === '' || facility[key] === null) {
        facility[key + 'Error'] = true;
        this.setState({
          facility: facility,
        });
        isValid = false;
      }
    }
    return isValid;
  };
  handleUpdateFacilityClick = () => {
    console.log(this.state.facility, this.state.initailState);
    if (this.validateData() === false) {
      return;
    } else {
      this.setState({
        waiting: true,
      });
      let facilityIDs = [];
      this.state.facility.linkedFacilities.forEach((element) => {
        facilityIDs.push(element.value);
      });
      let { facility } = this.state;
      let payload = {
        facility_id: this.props.target.id,
        facility_name: facility.fname,
        facility_phone: facility.fphone,
        facility_admin: facility.selectedAdmin.value,
        user_password: facility.password,
        linked_facilities: facilityIDs.join(','),
        facility_address: facility.address,
      };
      this.props
        .updateFacility(payload)
        .then(() => {
          console.log('Post response ', this.props.postedFacility);
          if (this.props.postedFacility.status === 200) {
            // console.log('update success');
            // toast.success('Facility updated successfully');
            this.setState({
              waiting: false,
            });
            this.props.dismissFacilityModel(true);
          }
        })
        .catch(() => {
          toast.error('Facility could not be updated');
          this.setState({
            waiting: false,
          });
        });
    }
  };
  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.props.open}
          onClose={this.props.dismissFacilityModel}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Edit Facility
            <ToastContainer />
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {'You are editing ' +
                this.props.target.facility_name +
                '. Please make sure that all the details are correctly filled'}
            </DialogContentText>
            <div className="row">
              <div class="col-xl-12">
                <div class="submit-field">
                  <h5>Facility Name</h5>
                  <CustomInput
                    type="text"
                    value={this.state.facility.fname}
                    id="fname"
                    placeholder="Name"
                    onChange={this.handleChange}
                    hasIcon={false}
                    iconClass="icon-line-awesome-user"
                    error={this.state.facility.fnameError}
                    helpText="Facility name is required"
                  />
                </div>
              </div>
              <div class="col-xl-12">
                <div class="submit-field">
                  <h5>Facility Phone</h5>

                  <CustomInput
                    type="tel"
                    value={this.state.facility.fphone}
                    id="fphone"
                    placeholder="Phone"
                    onChange={this.handleChange}
                    hasIcon={false}
                    iconClass="icon-line-awesome-user"
                    error={this.state.facility.fphoneError}
                    helpText="Phone number is required"
                  />
                </div>
              </div>
              <div class="col-xl-12">
                <div class="submit-field">
                  <h5>User Password</h5>
                  <CustomInput
                    type="password"
                    value={this.state.facility.password}
                    id="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    hasIcon={false}
                    iconClass="icon-line-awesome-user"
                    error={this.state.facility.passwordError}
                    helpText="Password is required"
                  />
                </div>
              </div>
              <div class="col-xl-12">
                <div class="submit-field">
                  <h5>Facility Admin</h5>
                  <Select
                    value={this.state.facility.selectedAdmin}
                    onChange={this.handleAdminSelect}
                    options={this.state.managerOptions}
                    styles={customStyles}
                  />
                  {this.state.facility.selectedAdminError ? (
                    <p style={{ color: 'red' }}>Please select an admin</p>
                  ) : null}
                </div>
              </div>
              <div class="col-xl-12">
                <div class="submit-field">
                  <h5>Linked Facilities</h5>
                  <div>
                    <Select
                      value={this.state.facility.linkedFacilities}
                      options={this.state.facilityOptions}
                      styles={customStyles}
                      onChange={this.handleFacilitySelect}
                      isMulti={true}
                    />
                    {this.state.facility.linkedFacilitiesError ? (
                      <p style={{ color: 'red' }}>
                        Please select linked facilities
                      </p>
                    ) : null}
                  </div>
                </div>
              </div>
              <div class="col-xl-12">
                <div class="submit-field">
                  <h5>Facility Address</h5>
                  <textarea
                    value={this.state.facility.address}
                    cols="30"
                    rows="5"
                    class="with-border"
                    id="address"
                    onChange={this.handleChange}
                  />
                  {this.state.facility.addressError ? (
                    <p style={{ color: 'red' }}>
                      Please enter facility address
                    </p>
                  ) : null}
                </div>
              </div>
              {this.state.error ? (
                <div className="col-xl-12">
                  <p style={{ color: 'red' }}>
                    No updates have been made to facility
                  </p>
                </div>
              ) : null}
              <div class="col-xl-12">
                <button
                  onClick={this.handleUpdateFacilityClick}
                  class="button ripple-effect big margin-top-30"
                  disabled={this.state.waiting}
                >
                  {this.state.waiting ? (
                    <Loader type="Bars" color="white" height={100} width={20} />
                  ) : (
                    <span>Update Facility</span>
                  )}
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    facilities: state.FacilitiesReducer.facilities,
    manager: state.FacilitiesReducer.manager,
    postedFacility: state.FacilitiesReducer.postedFacility,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFacilities: (payload) => dispatch(getFacilities(payload)),
    getManagers: () => dispatch(getManagers()),
    updateFacility: (payload) => dispatch(updateFacility(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditFacility);
