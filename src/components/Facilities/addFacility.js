import React from 'react';
import CustomInput from '../components/customInput';
import { connect } from 'react-redux';
import Select from 'react-select';
import { customStyles } from './selectStyles';
import getFacilities from './actions/getFacilities';
import getManagers from './actions/getManagers';
import postFacility from './actions/addFacility';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from 'react-loader-spinner';

class AddFacility extends React.Component {
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
      waiting: false,
    };
  }

  componentDidMount = () => {
    let user_id = window.localStorage.getItem('user_id');
    this.props.getFacilities(user_id).then(() => {
      let opts = [];
      this.props.facilities.forEach((element) => {
        opts.push({
          label: element.facility_name,
          value: element.id,
        });
      });
      this.setState({
        facilityOptions: opts,
      });
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
  handleChange = (e) => {
    const { facility } = this.state;
    facility[e.target.id] = e.target.value;
    facility[e.target.id + 'Error'] = false;
    this.setState({
      facility: facility,
      errorMessage: '',
    });
  };
  validateData = () => {
    let isValid = true;
    const { facility } = this.state;
    for (let key in facility) {
      if (
        facility[key] === '' ||
        facility[key] === null ||
        facility[key].length === 0
      ) {
        facility[key + 'Error'] = true;
        this.setState({
          facility: facility,
        });
        isValid = false;
      }
    }
    return isValid;
  };

  handleCreateFacilityClick = () => {
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
        facility_name: facility.fname,
        facility_phone: facility.fphone,
        facility_admin: facility.selectedAdmin.value,
        user_password: facility.password,
        linked_facilities: facilityIDs.join(','),
        facility_address: facility.address,
      };
      this.props
        .postFacility(payload)
        .then(() => {
          console.log('Post response ', this.props.postedFacility);
          if (this.props.postedFacility.status === 200) {
            toast.success('Facility created successfully');
            this.setState({
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
              waiting: false,
            });
          } else {
            toast.error('Facility could not be created');
            this.setState({
              waiting: false,
            });
          }
        })
        .catch(() => {
          toast.error('Facility could not be created');
          this.setState({
            waiting: false,
          });
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
              <h3 class="margin-bottom-40">Add New Facilities</h3>
            </div>

            <div class="row">
              <div class="col-xl-12">
                <div class="dashboard-box margin-top-0">
                  <div class="headline">
                    <h3>
                      <i class="icon-feather-folder-plus" /> Add Facility Form
                    </h3>
                  </div>

                  <div class="content with-padding padding-bottom-10">
                    <div class="row">
                      <div class="col-xl-4">
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

                      <div class="col-xl-4">
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

                      <div class="col-xl-4">
                        <div class="submit-field">
                          <h5>User Password</h5>
                          <CustomInput
                            type="password"
                            value={this.state.facility.password}
                            id="password"
                            placeholder="Phone"
                            onChange={this.handleChange}
                            hasIcon={false}
                            iconClass="icon-line-awesome-user"
                            error={this.state.facility.passwordError}
                            helpText="Password is required"
                          />
                        </div>
                      </div>

                      <div class="col-xl-4">
                        <div class="submit-field">
                          <h5>Facility Admin</h5>
                          <Select
                            value={this.state.facility.selectedAdmin}
                            onChange={this.handleAdminSelect}
                            options={this.state.managerOptions}
                            styles={customStyles}
                          />
                          {this.state.facility.selectedAdminError ? (
                            <p style={{ color: 'red' }}>
                              Please select an admin
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <div class="col-xl-4">
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
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-xl-12">
                <button
                  onClick={this.handleCreateFacilityClick}
                  class="button ripple-effect big margin-top-30"
                  disabled={this.state.waiting}
                >
                  {this.state.waiting ? (
                    <Loader type="Bars" color="white" height={100} width={20} />
                  ) : (
                    <span>
                      <i class="icon-feather-plus" /> Add Facility
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
    manager: state.FacilitiesReducer.manager,
    postedFacility: state.FacilitiesReducer.postedFacility,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFacilities: (payload) => dispatch(getFacilities(payload)),
    getManagers: () => dispatch(getManagers()),
    postFacility: (payload) => dispatch(postFacility(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AddFacility);
