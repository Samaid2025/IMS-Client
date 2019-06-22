import React from 'react';
import Container from '../components/container';
import { connect } from 'react-redux';
import getAllUsers from './actions/getAllUsers';
import Loader from 'react-loader-spinner';
import EditUser from './editUser';
import DeleteUser from './deleteUser';
import deleteUser from './actions/deleteUser';
import { ToastContainer, toast } from 'react-toastify';
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: true,
      editModelOpen: false,
      deleteModelOpen: false,
      EditTarget: {},
      deleteTarget: {},
      deleteWaiting: false,
    };
  }

  componentDidMount = () => {
    let token = window.localStorage.getItem('token');
    console.log('token is ', token);
    if (token === null) {
      this.props.history.push('/login');
    }
    let role = window.localStorage.getItem('role');
    if (role === 'ROLE_USER') {
      this.props.history.push('/dashboard');
    }
    let user_id = window.localStorage.getItem('user_id');
    this.props
      .getAllUsers(user_id)
      .then(() => {
        this.setState({
          waiting: false,
        });
      })
      .catch((e) => {
        this.setState({
          waiting: false,
        });
        throw e;
      });
  };

  handleEditClick = (e) => {
    let id = e.target.id.split('-');
    this.props.userList.forEach((element) => {
      if (element.id === Number(id[1])) {
        this.setState({
          editModelOpen: true,
          EditTarget: element,
        });
      }
    });
  };

  dismissEditModel = () => {
    this.setState({
      editModelOpen: false,
    });
  };

  handleFacilityEditResult = () => {
    if (this.props.postedUser.status === 200) {
      toast.success('User updated successfully');
      this.setState({
        waiting: false,
        editModelOpen: false,
      });
    } else if (this.props.postedUser.status === 401) {
      this.setState({
        waiting: false,
        editModelOpen: false,
      });
      toast.error('User could not be updated. User ID already exists');
    } else if (this.props.postedUser.status === 403) {
      this.setState({
        waiting: false,
        editModelOpen: false,
      });
      toast.error('User could not be updated. Email already exists');
    } else {
      this.setState({
        waiting: false,
        editModelOpen: false,
      });
      toast.error('User could not be updated.');
    }
  };

  handleDeleteClick = (e) => {
    let id = e.target.id.split('-');
    this.props.userList.forEach((element) => {
      if (element.id === Number(id[1])) {
        this.setState({
          deleteModelOpen: true,
          deleteTarget: element,
        });
      }
    });
  };

  dismissDeleteModel = () => {
    this.setState({
      deleteModelOpen: false,
    });
  };

  deleteUser = () => {
    this.setState({
      deleteWaiting: true,
    });

    this.props
      .deleteUser(this.state.deleteTarget.id)
      .then(() => {
        if (this.props.postedUser.status === 200) {
          this.setState({
            deleteWaiting: false,
            deleteModelOpen: false,
          });
          toast.success('User Deleted Sucsessfully.');
        } else {
          this.setState({
            deleteWaiting: false,
          });
          toast.error('User could not be delete.');
        }
      })
      .catch((e) => {
        this.setState({
          deleteWaiting: false,
        });
        toast.error('User could not be delete.');
        throw e;
      });
  };

  render() {
    if (this.state.waiting === true) {
      return (
        <React.Fragment>
          <Container title="Users">
            <table className="basic-table">
              <tr>
                <th>Assign Facility</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>User ID</th>
                <th>User Role</th>
                <th>View Facilities</th>
                <th>Actions</th>
              </tr>
              <tr>
                <td />
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
                <td />
              </tr>
            </table>
          </Container>
        </React.Fragment>
      );
    }

    if (this.props.userList.length === 0) {
      //|| typeof this.props.userList !== 'array'

      return (
        <React.Fragment>
          <Container title="Users">
            <table className="basic-table">
              <tr>
                <th>Assign Facility</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>User ID</th>
                <th>User Role</th>
                <th>View Facilities</th>
                <th>Actions</th>
              </tr>
              <tr>
                <td />
                <td />
                <td />
                <td>
                  <p>No users found</p>
                </td>
                <td />
                <td />
                <td />
              </tr>
            </table>
          </Container>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <ToastContainer />
          <Container title="Users">
            <table className="basic-table">
              <tr>
                <th>Assigned Facility</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>User ID</th>
                <th>User Role</th>
                <th>Viewable Facilities</th>
                <th>Actions</th>
              </tr>
              {this.props.userList.map((user, key) => (
                <tr key={user.id + 'user' + key}>
                  <td>{user.assigned_facility.name}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.user_id}</td>
                  <td>{user.role.split('_')[1]}</td>
                  <td>
                    {user.view_facilities.length !== 0 ? (
                      <ul>
                        {user.view_facilities.map((facility, key) => (
                          <li key={key + facility}>{facility.name}</li>
                        ))}
                      </ul>
                    ) : (
                      'No Viewable Facilities'
                    )}
                  </td>
                  <td data-label="Column 7">
                    <button
                      class="popup-with-zoom-anim button ripple-effect ico"
                      title="Edit"
                      data-tippy-placement="top"
                      style={{ padding: '5px', marginRight: '12px' }}
                    >
                      <i
                        class="icon-feather-edit"
                        id={'edit-' + user.id}
                        onClick={this.handleEditClick}
                      />
                    </button>
                    <button
                      class="button danger ripple-effect ico"
                      title="Remove"
                      data-tippy-placement="top"
                      style={{ padding: '5px' }}
                    >
                      <i
                        class="icon-feather-trash-2"
                        id={'del-' + user.id}
                        onClick={this.handleDeleteClick}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </table>
            <EditUser
              target={this.state.EditTarget}
              editModelOpen={this.state.editModelOpen}
              dismissEditModel={this.dismissEditModel}
              handleFacilityEditResult={this.handleFacilityEditResult}
            />
            <DeleteUser
              deleteModelOpen={this.state.deleteModelOpen}
              target={this.state.deleteTarget}
              dismissDeleteModel={this.dismissDeleteModel}
              waiting={this.state.deleteWaiting}
              deleteUser={this.deleteUser}
            />
          </Container>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    userList: state.UserReducer.userList,
    postedUser: state.UserReducer.postedUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUsers: (user_id) => dispatch(getAllUsers(user_id)),
    deleteUser: (user_id) => dispatch(deleteUser(user_id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserList);
