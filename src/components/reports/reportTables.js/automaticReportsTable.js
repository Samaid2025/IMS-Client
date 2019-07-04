import React, { Component } from 'react';
import Loader from 'react-loader-spinner';
class AutoReportsTable extends Component {
  render() {
    if (this.props.automaticReports.length !== 0) {
      return (
        <React.Fragment>
          <div class="row">
            <div class="col-xl-12">
              <table className="basic-table">
                <thead>
                  <tr>
                    <th>Report Name</th>
                    <th>Last Executed</th>
                    <th>Schedule</th>
                    <th>Update Recepients</th>
                  </tr>
                </thead>
                <tbody>
                  {this.props.automaticReports.map((item, key) => (
                    <tr key={'report' + key}>
                      <td>{item.report_name}</td>
                      <td>{item.last_executed}</td>
                      <td>
                        {item.interval < 2
                          ? item.interval + ' day'
                          : 'Every ' + item.interval + ' days'}
                      </td>
                      <td>
                        <button
                          class=" button ripple-effect ico"
                          title="Edit"
                          data-tippy-placement="top"
                          style={{ padding: '5px', marginRight: '12px' }}
                        >
                          <i
                            class="icon-feather-edit"
                            id={'edit-' + item.id}
                            onClick={this.props.handleUpdateClick}
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </React.Fragment>
      );
    }
    if (this.props.waiting === true) {
      return (
        <React.Fragment>
          <div class="row">
            <div class="col-xl-12">
              <table className="basic-table">
                <thead>
                  <tr>
                    <th>Report Name</th>
                    <th>Last Executed</th>
                    <th>Schedule</th>
                    <th>Update Recepients</th>
                  </tr>
                </thead>
              </table>
              <div style={{ marginLeft: '45%' }}>
                <Loader
                  type="RevolvingDot"
                  color="blue"
                  height={40}
                  width={40}
                />
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <div class="row">
            <div class="col-xl-12">
              <table className="basic-table">
                <thead>
                  <tr>
                    <th>Report Name</th>
                    <th>Last Executed</th>
                    <th>Schedule</th>
                    <th>Update Recepients</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td />
                    <td />
                    <td>No Reports</td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </React.Fragment>
      );
    }
  }
}

export default AutoReportsTable;
