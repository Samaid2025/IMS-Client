import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';
import deleteFacility from './actions/deleteFacility';

class DeleteFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: false,
    };
  }

  handleDeleteClick = () => {
    this.setState({
      waiting: true,
    });
    this.props
      .deleteFacility(this.props.target.id)
      .then(() => {
        if (this.props.postedFacility.status === 200) {
          this.props.handleFacilityDeleteSuccess(true);
          this.setState({
            waiting: false,
          });
        } else {
          this.props.handleFacilityDeleteSuccess(false);
          this.setState({
            waiting: false,
          });
        }
      })
      .catch(() => {
        this.props.handleFacilityDeleteSuccess(false);
        this.setState({
          waiting: false,
        });
      });
  };

  render() {
    return (
      <React.Fragment>
        {/* <ToastContainer /> */}
        <Dialog
          open={this.props.deleteModelOpen}
          onClose={this.props.toggleDeleteModel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Delete Facility'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure sure you want to delete{' '}
              {this.props.target.facility_name} ?
            </DialogContentText>
            {this.state.waiting ? (
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <Loader type="Bars" color="black" height={100} width={20} />
              </div>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.toggleDeleteModel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleDeleteClick} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    postedFacility: state.FacilitiesReducer.postedFacility,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteFacility: (id) => dispatch(deleteFacility(id)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeleteFacility);
