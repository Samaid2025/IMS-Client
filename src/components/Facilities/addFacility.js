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
        // password: '',
        address: '',
        selectedAdmin: null,
        selectedAdminError: false,
        linkedFacilities: [],
        linkedFacilitiesError: false,
        fphoneError: false,
        fnameError: false,
        // passwordError: false,
        addressError: false,
      },
      facilityOptions: [],
      managerOptions: [],
      waiting: false,
      imageError: false,
      imageMsg: '',
    };
  }

  componentDidMount = () => {
    let token = window.localStorage.getItem('token');
    if (token === null) {
      console.log(this.props.history);
      this.props.history.push('/login');
    }
    let role = window.localStorage.getItem('role');
    if (role === 'ROLE_USER') {
      this.props.history.push('/dashboard');
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

    this.props.getManagers().then(() => {
      let opts = [];
      if (this.props.manager !== undefined) {
        this.props.manager.forEach((element) => {
          opts.push({
            label: element.username,
            value: element.id,
          });
        });
      }
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
        // facility[key] === null ||
        (/\S/.test(facility[key]) === false &&
          typeof facility[key] === 'string')
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
    if (this.validateData() === false || this.state.imageError === true) {
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
      let payload = new FormData();
      console.log('logo is ', document.getElementById('logoFile'));
      payload.append('facility_name', facility.fname);
      payload.append('facility_phone', facility.fphone);
      payload.append(
        'facility_admin',
        facility.selectedAdmin !== null ? facility.selectedAdmin.value : 0,
      );
      payload.append('user_password', 'deprecated');
      payload.append('linked_facilities', facilityIDs.join(','));
      payload.append('facility_address', facility.address);
      payload.append('logo', document.getElementById('logoFile').files[0]);
      this.props
        .postFacility(payload)
        .then(() => {
          console.log('Post response ', this.props.postedFacility);
          if (this.props.postedFacility.status === 200) {
            toast.success('Facility created successfully');
            let preview = document.getElementById('logoPreview');
            preview.style.backgroundColor = '';
            preview.style.position = '';
            preview.style.zIndex = '';
            this.setState({
              facility: {
                fname: '',
                fphone: '',
                address: '',
                selectedAdmin: null,
                selectedAdminError: false,
                linkedFacilities: [],
                linkedFacilitiesError: false,
                fphoneError: false,
                fnameError: false,
                addressError: false,
              },
              waiting: false,
            });
            document.getElementById('logoPreview').src =
              'images/user-avatar-placeholder.png';
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
  hasExtension = (inputID, exts) => {
    var fileName = document.getElementById(inputID).value;
    return new RegExp('(' + exts.join('|').replace(/\./g, '\\.') + ')$').test(
      fileName,
    );
  };

  checkFileSize = (inputID) => {
    var FileSize = document.getElementById(inputID).files[0].size / 1024 / 1024;
    if (FileSize > 1) {
      return false;
    }
    return true;
  };
  handleImageSelect = () => {
    if (
      !this.hasExtension('logoFile', [
        '.jpg',
        '.png',
        '.bmp',
        '.JPG',
        '.PNG',
        '.BMP',
      ])
    ) {
      this.setState({
        imageError: true,
        imageMsg: 'Only image file is allowed',
      });
      return;
    } else if (this.checkFileSize('logoFile') === true) {
      this.setState({
        imageError: false,
      });
      let image = document.getElementById('logoFile');
      let preview = document.getElementById('logoPreview');
      preview.style.backgroundColor = 'white';
      preview.style.position = 'absolute';
      preview.style.zIndex = '3';
      document.getElementById('logoPreview').src = image;
      if (image.files && image.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
          document
            .getElementById('logoPreview')
            .setAttribute('src', e.target.result);
        };
        reader.readAsDataURL(image.files[0]);
      }
    } else {
      this.setState({
        imageError: true,
        imageMsg: 'Image file must be smaller than 1 MB',
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
                      <div class="col-12">
                        <div class="submit-field margin-bottom-0">
                          <h5>Facility Logo</h5>
                        </div>
                        <div
                          class="avatar-wrapper"
                          data-tippy-placement="bottom"
                          title="Choose Logo"
                        >
                          <img
                            class="profile-pic"
                            src="images/user-avatar-placeholder.png"
                            id="logoPreview"
                            alt=""
                          />
                          <div
                            class="upload-button"
                            onClick={() => {
                              document.getElementById('logoFile').click();
                            }}
                          />
                          <input
                            // class="file-upload"
                            type="file"
                            id="logoFile"
                            onChange={this.handleImageSelect}
                            accept="image/*"
                          />
                        </div>
                        {this.state.imageError ? (
                          <p style={{ color: 'red' }}>{this.state.imageMsg}</p>
                        ) : null}
                      </div>

                      <div class="col-xl-4">
                        <div class="submit-field">
                          <h5>Facility Name*</h5>
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
                          <h5>Facility Phone*</h5>

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

                      {/* <div class="col-xl-4">
                        <div class="submit-field">
                          <h5>User Password*</h5>
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
                      </div> */}

                      <div class="col-xl-4">
                        <div class="submit-field">
                          <h5>Facility Admin*</h5>
                          <Select
                            value={this.state.facility.selectedAdmin}
                            onChange={this.handleAdminSelect}
                            options={this.state.managerOptions}
                            styles={customStyles}
                          />
                          {this.state.facility.selectedAdminError ? (
                            <p style={{ color: 'red', marginTop: '13px' }}>
                              Please select an admin
                            </p>
                          ) : null}
                        </div>
                      </div>

                      <div class="col-xl-4">
                        <div class="submit-field">
                          <h5>Linked Facilities</h5>

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

                      <div class="col-xl-12">
                        <div class="submit-field">
                          <h5>Facility Address*</h5>
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
