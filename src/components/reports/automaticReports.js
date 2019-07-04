import React, { Component } from 'react';
import Container from '../components/container';
import { connect } from 'react-redux';
import AutoReportsTable from './reportTables.js/automaticReportsTable';
import UpdateReportModel from './updateReportModel';
import getAytomaticReports from './actions/getAutomaticReports';
import { ToastContainer, toast } from 'react-toastify';

class AutomaticReports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      waiting: false,
      editModelOpen: false,
      editTarget: null,
    };
  }

  componentDidMount = () => {
    this.setState({
      waiting: true,
    });
    this.props
      .getAytomaticReports({})
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

  handleUpdateClick = (e) => {
    let target = null;
    let id = e.target.id.split('-')[1];
    console.log('id is', typeof id);
    this.props.automaticReports.forEach((element) => {
      console.log('looping element is ', typeof element.id);
      if (element.id === Number(id)) {
        target = element;
      }
    });
    console.log('target is', target);
    this.setState({
      editTarget: target,
      editModelOpen: true,
    });
  };

  toggleUpdateModel = () => {
    this.setState({
      editModelOpen: !this.state.editModelOpen,
    });
  };

  reportUpdateSuccess = (status) => {
    if (status === true) {
      toast.success('Report updated successfully');
      this.toggleUpdateModel();
    } else {
      toast.error('Report could not be updated');
    }
  };
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <Container title="Automatic Reports">
          <div className="row">
            <div class="col-xl-12">
              <div class="dashboard-box margin-top-0">
                <div class="headline">
                  <h3>
                    <i class="icon-line-awesome-file-text" /> Manage Reports
                  </h3>
                </div>

                <div
                  class="content report-table with-padding padding-bottom-10"
                  style={{ height: '35px' }}
                />
                <AutoReportsTable
                  automaticReports={this.props.automaticReports}
                  waiting={this.state.waiting}
                  handleUpdateClick={this.handleUpdateClick}
                />
              </div>
            </div>
            <UpdateReportModel
              editModelOpen={this.state.editModelOpen}
              target={this.state.editTarget}
              toggleUpdateModel={this.toggleUpdateModel}
              reportUpdateSuccess={this.reportUpdateSuccess}
            />
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    automaticReports: state.reportReducer.automaticReports,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAytomaticReports: (payload) => dispatch(getAytomaticReports(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AutomaticReports);
