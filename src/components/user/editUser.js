import React, { Component } from 'react';
import CustomInput from '../components/customInput';
import Select from 'react-select';
import { customStyles } from '../Facilities/selectStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Loader from 'react-loader-spinner';
import getFacilities from '../Facilities/actions/getFacilities';
import editUser from './actions/editUser';
import { connect } from 'react-redux';

import { url } from '../../helpers/urls';

class EditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: '',
        nameError: false,
        email: '',
        emailError: false,
        emailErrorMsg: 'Email is required',
        password: '',
        passwordError: false,
        passwordErrorMsg: 'Password is required',
        userID: '',
        userIDError: false,
        selectedAssignedFacility: null,
        selectedAssignedFacilityError: false,
        selectedViewableFacilities: null,
        selectedViewableFacilitiesError: false,
        role: 'ROLE_USER',
      },
      AssignedfacilityOptions: [],
      ViewableFacilityOptions: [],
      waiting: false,
      role: null,
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
    this.props
      .getFacilities(user_id)
      .then(() => {
        let opts = [];

        if (this.props.facilities !== undefined) {
          this.props.facilities.forEach((element) => {
            opts.push({
              label: element.facility_name,
              value: element.id,
            });
          });
          console.log('options are', opts);
          this.setState({
            AssignedfacilityOptions: opts,
            ViewableFacilityOptions: opts,
            role: role,
          });
        }
      })
      .catch((e) => {
        this.setState({
          waiting: false,
        });
      });
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps !== this.props) {
      console.log(this.props.target);
      let role = window.localStorage.getItem('role');
      let { user } = this.state;
      let selectedFaclities = [];
      let selectdassignedFacility = {};
      user['name'] = this.props.target['username'];
      user['email'] = this.props.target['email'];
      user['userID'] = this.props.target['user_id'];
      user['password'] = '@Samaid2@2025';
      user['role'] = this.props.target['role'];

      if (this.props.target.assigned_facility !== undefined) {
        this.state.AssignedfacilityOptions.forEach((element) => {
          console.log(element, this.props.target.assigned_facility.id);
          if (this.props.target.assigned_facility.id === element.value) {
            selectdassignedFacility = element;
          }
        });
      }
      this.state.ViewableFacilityOptions.forEach((element) => {
        if (this.props.target.view_facilities !== undefined) {
          this.props.target.view_facilities.forEach((targetFacility) => {
            console.log(element, targetFacility);
            if (element.value === targetFacility.id) {
              selectedFaclities.push({
                label: element.label,
                value: element.value,
              });
            } else {
              console.log(targetFacility.name, ' no match');
            }
          });
        }
      });
      console.log('selected viewables arre', selectedFaclities);
      user['selectedAssignedFacility'] = selectdassignedFacility;
      user['selectedViewableFacilities'] = selectedFaclities;
      this.setState({
        user: user,
        role: role,
      });
    }
  };

  handleModelClose = () => {
    this.setState({
      user: {
        name: '',
        nameError: false,
        email: '',
        emailError: false,
        emailErrorMsg: 'Email is required',
        password: '',
        passwordError: false,
        passwordErrorMsg: 'Password is required',
        userID: '',
        userIDError: false,
        selectedAssignedFacility: null,
        selectedAssignedFacilityError: false,
        selectedViewableFacilities: null,
        selectedViewableFacilitiesError: false,
        role: 'ROLE_USER',
      },
      waiting: false,
      role: null,
    });
    this.props.dismissEditModel();
  };

  handleChange = (e) => {
    const { user } = this.state;
    user[e.target.id] = e.target.value;
    user[e.target.id + 'Error'] = false;
    this.setState({
      user: user,
      errorMessage: '',
    });
  };

  handleAssignedFacilitySelect = (selectedOption) => {
    const { user } = this.state;
    user['selectedAssignedFacility'] = selectedOption;
    user['selectedAssignedFacilityError'] = false;
    this.setState({
      user: user,
    });
  };

  handleViewableFacilitySelect = (selectedOption) => {
    const { user } = this.state;
    user['selectedViewableFacilities'] = selectedOption;
    user['selectedViewableFacilitiesError'] = false;
    this.setState({
      user: user,
    });
  };

  validateData = () => {
    let isValid = true;
    const { user } = this.state;
    for (let key in user) {
      if (
        user[key] === '' ||
        user[key] === null ||
        user[key] === [] ||
        /\S/.test(user[key]) === false
      ) {
        user[key + 'Error'] = true;
        isValid = false;
      }
    }
    this.setState({
      user: user,
    });
    return isValid;
  };

  regexBasedValidation = () => {
    const { user } = this.state;
    let isValid = true;
    let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
    if (emailRegex.test(this.state.user.email) === false) {
      user['emailError'] = true;
      user['emailErrorMsg'] = 'Please provide valid email address';
      isValid = false;
    }

    if (passwordRegex.test(this.state.user.password) === false) {
      console.log(
        this.state.user.password,
        passwordRegex.test(this.state.user.password),
      );
      user['passwordError'] = true;
      user['passwordErrorMsg'] =
        'Password should be 12 characters long having captial letter, number and a apecial character';
      isValid = false;
    }
    this.setState({
      user: user,
    });
    return isValid;
  };

  handleEditUserClick = () => {
    console.log(this.state.user);
    if (this.validateData() === false) {
      return;
    } else if (this.regexBasedValidation()) {
      this.setState({
        waiting: true,
      });
      let facilityIDs = [];
      let user_id = window.localStorage.getItem('user_id');
      this.state.user.selectedViewableFacilities.forEach((element) => {
        facilityIDs.push(element.value);
      });
      const { user } = this.state;
      let payload = {
        id: this.props.target.id,
        username: user.name,
        email: user.email,
        password: user.password,
        user_id: user.userID,
        employer_id: user_id,
        user_role: user.role,
        assigned_facility: user.selectedAssignedFacility.value,
        view_facilities: facilityIDs.join(','),
      };
      this.props
        .editUser(payload)
        .then(() => {
          this.setState({
            user: {
              name: '',
              nameError: false,
              email: '',
              emailError: false,
              emailErrorMsg: 'Email is required',
              password: '',
              passwordError: false,
              passwordErrorMsg: 'Password is required',
              userID: '',
              userIDError: false,
              selectedAssignedFacility: null,
              selectedAssignedFacilityError: false,
              selectedViewableFacilities: null,
              selectedViewableFacilitiesError: false,
              role: 'ROLE_USER',
            },
            waiting: false,
            role: null,
          });
          this.props.handleFacilityEditResult();
        })
        .catch((e) => {
          this.setState({
            waiting: false,
          });
          //   toast.error('User could not be added.');
          throw e;
        });
    }
  };

  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.props.editModelOpen}
          onClose={this.handleModelClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {'You are editing ' +
                this.props.target.username +
                '. Please make sure that all the details are correctly filled'}
            </DialogContentText>
            <div class="row">
              <div class="col-xl-12">
                <div class="submit-field">
                  <h5>Assigned Facility</h5>
                  <Select
                    value={this.state.user.selectedAssignedFacility}
                    options={this.state.AssignedfacilityOptions}
                    styles={customStyles}
                    onChange={this.handleAssignedFacilitySelect}
                  />
                  {this.state.user.selectedAssignedFacilityError ? (
                    <p style={{ color: 'red', marginTop: '13px' }}>
                      Please select an assigned facility
                    </p>
                  ) : null}
                </div>
              </div>

              <div class="col-xl-12">
                <div class="submit-field">
                  <h5>User Name</h5>
                  <CustomInput
                    type="text"
                    value={this.state.user.name}
                    id="name"
                    placeholder="User Name"
                    onChange={this.handleChange}
                    hasIcon={false}
                    error={this.state.user.nameError}
                    helpText="User name is required"
                  />
                </div>
              </div>

              <div class="col-xl-12">
                <div class="submit-field">
                  <h5>User Email</h5>
                  <CustomInput
                    type="text"
                    value={this.state.user.email}
                    id="email"
                    placeholder="User Email"
                    onChange={this.handleChange}
                    hasIcon={false}
                    error={this.state.user.emailError}
                    helpText={this.state.user.emailErrorMsg}
                  />
                </div>
              </div>

              <div class="col-xl-12">
                <div class="submit-field">
                  <h5>User ID</h5>
                  <CustomInput
                    type="text"
                    value={this.state.user.userID}
                    id="userID"
                    placeholder="User ID"
                    onChange={this.handleChange}
                    hasIcon={false}
                    error={this.state.user.userIDError}
                    helpText="User ID is required"
                  />
                </div>
              </div>

              <div class="col-xl-12">
                <div class="submit-field">
                  <h5>User Password</h5>
                  <CustomInput
                    type="password"
                    value={this.state.user.password}
                    id="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    hasIcon={false}
                    error={this.state.user.passwordError}
                    helpText={this.state.user.passwordErrorMsg}
                  />
                </div>
              </div>

              <div class="col-xl-12">
                <div class="submit-field">
                  <h5>View Facilities</h5>
                  <Select
                    value={this.state.user.selectedViewableFacilities}
                    options={this.state.ViewableFacilityOptions}
                    styles={customStyles}
                    onChange={this.handleViewableFacilitySelect}
                    isMulti={true}
                  />
                  {this.state.user.selectedViewableFacilitiesError ? (
                    <p style={{ color: 'red', marginTop: '13px' }}>
                      Please select atleast one view facility
                    </p>
                  ) : null}
                </div>
              </div>

              <div
                class="col-xl-12"
                hidden={this.state.role !== 'ROLE_SUPER_ADMIN'}
              >
                <div class="submit-field">
                  <h5>User Role</h5>
                  <div class="radio">
                    <input
                      id="radio-1"
                      name="radio"
                      type="radio"
                      checked={this.state.user.role === 'ROLE_USER'}
                      onChange={() => {
                        const { user } = this.state;
                        user['role'] = 'ROLE_USER';
                        this.setState({
                          user: user,
                        });
                      }}
                    />
                    <label for="radio-1">
                      <span class="radio-label" /> User
                    </label>
                  </div>

                  <div class="radio margin-left-30">
                    <input
                      id="radio-2"
                      name="radio"
                      type="radio"
                      checked={this.state.user.role === 'ROLE_MANAGER'}
                      onChange={() => {
                        const { user } = this.state;
                        user['role'] = 'ROLE_MANAGER';
                        this.setState({
                          user: user,
                        });
                      }}
                    />
                    <label for="radio-2">
                      <span class="radio-label" /> Manager
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-xl-12">
              <button
                href="#"
                class="button ripple-effect big margin-top-30"
                onClick={this.handleEditUserClick}
              >
                {this.state.waiting ? (
                  <Loader type="Bars" color="white" height={100} width={20} />
                ) : (
                  <span>
                    Update User
                    {/* <i class="icon-feather-plus" /> Update User */}
                  </span>
                )}
              </button>
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
    postedUser: state.UserReducer.postedUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFacilities: (payload) => dispatch(getFacilities(payload)),
    editUser: (payload) => dispatch(editUser(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditUser);
