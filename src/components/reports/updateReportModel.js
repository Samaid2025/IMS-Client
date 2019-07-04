import React, { Component } from 'react';
import { connect } from 'react-redux';
import Select from 'react-select';
import { customStyles } from '../Facilities/selectEditStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Loader from 'react-loader-spinner';
import getManagers from '../Facilities/actions/getManagers';
import updateAutoReport from './actions/updateAutomaticReport';

class UpdateReportModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: {
        selectedUsers: [],
        selectedInterval: null,
      },
      managerOptions: [],
      intervalOptions: [
        { label: 'Daily', value: '1' },
        { label: 'Weekly', value: '7' },
        { label: 'Monthly', value: '30' },
      ],
      waiting: false,
      error: false,
    };
  }
  componentDidMount = () => {
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
  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps !== this.props && this.props.target !== null) {
      let currentUsers = [];
      let currentInterval;
      this.props.target.recipients.forEach((element) => {
        console.log('recepient is ', element);
        currentUsers.push({
          label: element.username + ' (' + element.user_id + ')',
          value: element.id,
        });
      });
      this.state.intervalOptions.forEach((element) => {
        console.log(
          'interval===> element is ',
          element.value,
          ' interval is ',
          this.props.target.interval,
        );
        if (Number(element.value) === this.props.target.interval) {
          currentInterval = element;
        }
      });
      let { report } = this.state;
      report['selectedUsers'] = currentUsers;
      report['selectedInterval'] = currentInterval;
      this.setState({
        report: report,
        waiting: false,
      });
    }
  };
  handleUserSelect = (selectedOption) => {
    let { report } = this.state;
    report['selectedUsers'] = selectedOption;
    this.setState({
      report: report,
    });
  };
  handleIntervalSelect = (selectedOption) => {
    let { report } = this.state;
    report['selectedInterval'] = selectedOption;
    this.setState({
      report: report,
    });
  };
  handleUpdateClick = () => {
    let selectedManagers = [];
    this.state.report.selectedUsers.forEach((element) => {
      selectedManagers.push(element.value);
    });
    console.log('sleected managers are', selectedManagers);
    let payload = {
      id: this.props.target.id,
      users: selectedManagers,
      interval: this.state.report.selectedInterval.value,
    };
    console.log('payload is ', payload);
    this.setState({
      waiting: true,
    });
    this.props.updateAutoReport(payload).then(() => {
      if (this.props.updateReportResponse !== null) {
        if (this.props.updateReportResponse.status === 200) {
          this.props.reportUpdateSuccess(true);
        } else {
          this.props.reportUpdateSuccess(false);
        }
      } else {
        this.props.reportUpdateSuccess(false);
      }
    });
  };
  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.props.editModelOpen}
          aria-labelledby="draggable-dialog-title"
          scroll={'body'}
          onClose={this.props.toggleUpdateModel}
        >
          <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
            Update Report
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              You are updating automatic report{' '}
              {this.props.target !== null ? this.props.target.report_name : ''}{' '}
              .Please make sure to fill in every information correctly
            </DialogContentText>
            <div className="row" style={{ height: '100%' }}>
              <div className="col-12" style={{ marginTop: '35px' }}>
                <div class="submit-field margin-bottom-0">
                  <h5>Recipients</h5>
                  <Select
                    value={this.state.report.selectedUsers}
                    options={this.state.managerOptions}
                    onChange={this.handleUserSelect}
                    styles={customStyles}
                    isMulti={true}
                  />
                </div>
              </div>
              <div className="col-12" style={{ marginTop: '35px' }}>
                <div class="submit-field ">
                  <h5>Schedule</h5>
                  <Select
                    styles={customStyles}
                    value={this.state.report.selectedInterval}
                    onChange={this.handleIntervalSelect}
                    options={this.state.intervalOptions}
                  />
                </div>
              </div>
              <div class="col-xl-12">
                <button
                  onClick={this.handleUpdateClick}
                  class="button ripple-effect big margin-top-30"
                  disabled={this.state.waiting}
                >
                  {this.state.waiting ? (
                    <Loader type="Bars" color="white" height={100} width={20} />
                  ) : (
                    <span>Update Report</span>
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
    manager: state.FacilitiesReducer.manager,
    updateReportResponse: state.reportReducer.updateReportResponse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getManagers: () => dispatch(getManagers()),
    updateAutoReport: (payload) => dispatch(updateAutoReport(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateReportModel);
