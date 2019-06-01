import React, { Component } from 'react';
import { connect } from 'react-redux';
import Container from '../components/container';
import Table from '../components/Table/Table';
import getFacilitiesList from './actions/getFacilitiesList';
import EditFacility from './editModel';
import ReactPaginate from 'react-paginate';
import { ToastContainer, toast } from 'react-toastify';
import DeleteFacility from './deleteModel';

class FacilityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      offset: 1,
      waiting: true,
      editModelOpen: false,
      EditTarget: {},
      deleteModelOpen: false,
      deleteTarget: {},
    };
  }

  componentDidUpdate = () => {
    console.log('compoenent updating');
  };
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
      .getFacilitiesList(user_id, 1)
      .then(() => {
        console.log('Facilities list ', this.props.facilitiesList);
        this.setState({
          waiting: false,
        });
      })
      .catch(() => {
        this.setState({
          waiting: false,
        });
      });
  };

  handleFacilityEditClick = (e) => {
    let id = e.target.id.split('-');
    console.log(id, 'is id sh');
    this.props.facilitiesList.forEach((element) => {
      console.log(element.id, id[1]);
      console.log(element.id === Number(id[1]));
      if (element.id === Number(id[1])) {
        this.setState({
          editModelOpen: true,
          EditTarget: element,
        });
      }
    });
  };
  dismissFacilityModel = (status) => {
    if (status === true) {
      toast.success('Facility updated successfully');

      this.setState({
        editModelOpen: false,
      });
      // this.componentDidMount();
    } else {
      this.setState({
        editModelOpen: false,
      });
    }
  };
  handleFacilityDeleteClick = (e) => {
    let id = e.target.id.split('-');
    console.log(id, 'is id sh');
    this.props.facilitiesList.forEach((element) => {
      console.log(element.id, id[1]);
      console.log(element.id === Number(id[1]));
      if (element.id === Number(id[1])) {
        this.setState({
          deleteModelOpen: true,
          deleteTarget: element,
        });
      }
    });
  };
  toggleDeleteModel = () => {
    this.setState({
      deleteModelOpen: !this.state.deleteModelOpen,
    });
  };
  handleFacilityDeleteSuccess = () => {
    this.setState({
      deleteModelOpen: !this.state.deleteModelOpen,
    });
    this.componentDidMount();
  };
  handlePaginatorClick = (offset) => {
    this.props.getFacilitiesList(1, offset.selected + 1).then(() => {
      this.setState({
        waiting: false,
      });
    });
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Container title={'Facilities List'}>
          <Table
            data={
              this.props.facilitiesList === undefined
                ? []
                : this.props.facilitiesList
            }
            handleFacilityEditClick={this.handleFacilityEditClick}
            handleFacilityDeleteClick={this.handleFacilityDeleteClick}
            waiting={this.state.waiting}
          />

          {this.state.waiting === true ||
          this.props.facilitiesList === undefined ? null : (
            <div style={{ float: 'right' }}>
              <div className="pagination">
                <ReactPaginate
                  previousLabel={'<'}
                  nextLabel={'>'}
                  breakLabel={'...'}
                  breakClassName={'pagination'}
                  pageCount={this.props.totalFacilities}
                  pageRangeDisplayed={5}
                  initialPage={0}
                  marginPagesDisplayed={2}
                  onPageChange={this.handlePaginatorClick}
                  subContainerClassName={'pagination'}
                  pageClassName={'ripple-effect'}
                  activeClassName={'current-page'}
                  activeLinkClassName={'current-page'}
                />
              </div>
            </div>
          )}

          <EditFacility
            open={this.state.editModelOpen}
            target={this.state.EditTarget}
            dismissFacilityModel={this.dismissFacilityModel}
          />
          <DeleteFacility
            deleteModelOpen={this.state.deleteModelOpen}
            toggleDeleteModel={this.toggleDeleteModel}
            handleFacilityDeleteSuccess={this.handleFacilityDeleteSuccess}
            target={this.state.deleteTarget}
          />
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    facilitiesList: state.FacilitiesReducer.facilitiesList,
    totalFacilities: state.FacilitiesReducer.totalFacilities,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getFacilitiesList: (user_id, page) =>
      dispatch(getFacilitiesList(user_id, page)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FacilityList);
