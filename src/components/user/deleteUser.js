import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';

class DeleteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: false,
    };
  }
  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.props.deleteModelOpen}
          onClose={this.props.dismissDeleteModel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Delete Facility'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure sure you want to delete {this.props.target.username}{' '}
              ?
            </DialogContentText>
            {this.props.waiting ? (
              <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <Loader type="Bars" color="black" height={100} width={20} />
              </div>
            ) : null}
          </DialogContent>
          <DialogActions>
            <Button onClick={this.props.dismissDeleteModel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.props.deleteUser} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </React.Fragment>
    );
  }
}

export default DeleteUser;
