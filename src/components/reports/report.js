import React, { Component } from 'react';
import Container from '../components/container';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import Select from 'react-select';
import { customStyles } from '../Facilities/selectStyles';
import Loader from 'react-loader-spinner';
import { url } from '../../helpers/urls';
import getReport from './actions/getReport';
import downloadReport from './actions/downloadReport';
import getExpirationReport from './actions/getInventoryExpirationReport';
import downloadExpirationReport from './actions/downloadExpirationReports';
import RequestsReports from './reportTables.js/requestsReports';
import ReactToPrint from 'react-to-print';
const report_option = [
  {
    label: 'Inventory Requests Report',
    value: 'Inventory Requests Report',
  },
  {
    label: 'Inventory Expiration Report',
    value: 'Inventory Expiration Report',
  },
];

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      report: {
        reportType: {
          label: 'Inventory Requests Report',
          value: 'Inventory Requests Report',
        },
        reportTypeError: false,
        reportTypeMsg: 'dfhgfgh',
        toDate: null,
        toDateError: false,
        toDateMsg: 'dfhgdfhg',
        fromDate: null,
        fromDateError: false,
        fromDateMsg: 'fghdfhh',
      },
      waiting: false,
      fileDownloadProgress: {
        xlsDownloading: false,
        pdfDownloading: false,
      },
      setToBlank: true,
      downloadLink: null,
      count: 0,
    };
  }
  componentDidMount = () => {
    this.setState({
      report: {
        reportType: {
          label: 'Inventory Requests Report',
          value: 'Inventory Requests Report',
        },
        reportTypeError: false,
        reportTypeMsg: 'dfhgfgh',
        toDate: null,
        toDateError: false,
        toDateMsg: 'dfhgdfhg',
        fromDate: null,
        fromDateError: false,
        fromDateMsg: 'fghdfhh',
      },
      waiting: false,
      fileDownloadProgress: {
        xlsDownloading: false,
        pdfDownloading: false,
      },
      setToBlank: true,
      downloadLink: null,
    });
  };

  handleChange = (e, name) => {
    if (e !== null) {
      if (e.target !== undefined) {
        let { report } = this.state;
        report[e.target.id] = e.target.value;
        this.setState({
          report: report,
        });
      } else {
        const { report } = this.state;
        console.log('choosen date is ', e);

        this.getUTCDate(e);
        report[name] = e;
        report[name + 'Error'] = false;
        this.setState({
          report: report,
        });
      }
    }
  };
  getUTCDate = (date) => {
    let utc_date = date.toISOString().split('T')[0];

    // console.log('calling nex day');
    // let day = this.getNextDay(Number(utc_date[2]), Number(utc_date[1]));

    // utc_date[2] = day.day;
    // utc_date[1] = day.month;
    // return utc_date.join('-');
    return utc_date;
  };
  getNextDay = (prevDay, month) => {
    console.log('prev day is', prevDay, month);
    let nextMonth = month;
    let nextDay = prevDay;

    if (prevDay === 30 && ![1, 3, 7, 8, 10, 12].includes(month + 1)) {
      nextDay = '0' + 1;
      nextMonth = month + 2;
    }
    if (prevDay === 31) {
      nextDay = 1;
      nextMonth = month + 1;
    }
    console.log(nextDay, month);
    let result = {
      day: nextDay,
      month: nextMonth,
    };
    return result;
  };
  validateData = () => {
    let { report } = this.state;
    let isValid = true;
    for (let key in report) {
      if (report[key] === '' || report[key] === null) {
        console.log(report[key], ' is empty');
        report[key + 'Error'] = true;
        report[key + 'Msg'] = 'This field is required';
        isValid = false;
      }
    }
    this.setState({
      report: report,
    });
    return isValid;
  };

  getReport = () => {
    if (this.validateData() === false) {
      return;
    } else {
      this.setState({
        waiting: true,
      });
      console.log(
        'from',
        this.state.report.fromDate.toISOString().split('T')[0],
      );
      console.log('to', this.state.report.toDate);
      let payload = {
        user_id: window.localStorage.getItem('user_id'),
        file_format: 'json',
        from_date: this.getUTCDate(this.state.report.fromDate),
        // .toJSON()
        // .slice(0, 10)
        // .replace(/-/g, '-'),
        to_date: this.getUTCDate(this.state.report.toDate),
        // .toJSON()
        // .slice(0, 10)
        // .replace(/-/g, '-'),
      };
      if (this.state.report.reportType.value === 'Inventory Requests Report') {
        this.props
          .getReport(payload)
          .then(() => {
            this.setState({
              waiting: false,
              setToBlank: false,
            });
          })
          .catch((e) => {
            this.setState({
              waiting: false,
              setToBlank: false,
            });
            throw e;
          });
      } else if (
        this.state.report.reportType.value === 'Inventory Expiration Report'
      ) {
        this.props
          .getExpirationReport(payload)
          .then(() => {
            console.log('we have expiration report', this.props.report);
            this.setState({
              waiting: false,
              setToBlank: false,
            });
          })
          .catch((e) => {
            this.setState({
              waiting: false,
              setToBlank: false,
            });
            throw e;
          });
      }
    }
  };

  export = (e) => {
    if (this.validateData() === false) {
      return;
    } else {
      e.persist();
      const { fileDownloadProgress } = this.state;

      fileDownloadProgress[e.target.id + 'Downloading'] = true;
      this.setState({
        fileDownloadProgress: fileDownloadProgress,
      });

      let payload = {
        user_id: window.localStorage.getItem('user_id'),
        file_format: e.target.id,
        from_date: this.getUTCDate(this.state.report.fromDate),
        // .toJSON()
        // .slice(0, 10)
        // .replace(/-/g, '-'),
        to_date: this.getUTCDate(this.state.report.toDate),
        // .toJSON()
        // .slice(0, 10)
        // .replace(/-/g, '-'),
      };
      if (this.state.report.reportType.value === 'Inventory Requests Report') {
        this.props
          .downloadReport(payload)
          .then(() => {
            fileDownloadProgress[e.target.id + 'Downloading'] = false;
            this.setState({
              fileDownloadProgress: fileDownloadProgress,
            });
            this.triggerFileDownload();
          })
          .catch((e) => {
            fileDownloadProgress[e.target.id + 'Downloading'] = false;
            this.setState({
              fileDownloadProgress: fileDownloadProgress,
            });
            throw e;
          });
      } else if (
        this.state.report.reportType.value === 'Inventory Expiration Report'
      ) {
        this.props
          .downloadExpirationReport(payload)
          .then(() => {
            console.log('download link ', this.props.downloadLink);
            fileDownloadProgress[e.target.id + 'Downloading'] = false;
            this.setState({
              fileDownloadProgress: fileDownloadProgress,
            });
            this.triggerFileDownload();
          })
          .catch((e) => {
            fileDownloadProgress[e.target.id + 'Downloading'] = false;
            this.setState({
              fileDownloadProgress: fileDownloadProgress,
            });
            throw e;
          });
      }
    }
  };

  triggerFileDownload = () => {
    var elem = document.getElementById('download');
    if (elem && document.createEvent) {
      var evt = document.createEvent('MouseEvents');
      evt.initEvent('click', true, false);
      elem.dispatchEvent(evt);
    }
  };

  handleTypeSelect = (option) => {
    let { report } = this.state;
    report['reportType'] = option;
    this.setState({
      report: report,
      setToBlank: true,
    });
  };
  increament = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        count: prevState.count + 1,
      };
    });
    this.setState((prevState) => {
      return {
        ...prevState,
        count: prevState.count + 10,
      };
    });
  };
  render() {
    return (
      <React.Fragment>
        <Container title="Reports">
          <div class="row">
            <div class="col-xl-3">
              <div class="submit-field">
                <Select
                  value={this.state.report.reportType}
                  onChange={this.handleTypeSelect}
                  options={report_option}
                  styles={customStyles}
                />
                {this.state.report.reportTypeError === true ? (
                  <p style={{ color: 'red', marginTop: '13px' }}>
                    Please select a report type
                  </p>
                ) : null}
              </div>
            </div>

            <div class="col-xl-3">
              <div class="submit-field">
                <div class="input-with-icon-left">
                  <DatePicker
                    onChange={(date) => {
                      this.handleChange(date, 'fromDate');
                    }}
                    selected={this.state.report.fromDate}
                    id="fromDate"
                    placeholderText="Date From"
                    dateFormat="MMMM d, yyyy"
                    className="input-text with-border icon-material-outline-date-range"
                  />
                  {this.state.report.fromDateError === true ? (
                    <p style={{ color: 'red', marginTop: '13px' }}>
                      Please select date
                    </p>
                  ) : null}
                </div>
              </div>
            </div>

            <div class="col-xl-3">
              <div class="submit-field">
                <div class="input-with-icon-left">
                  <DatePicker
                    onChange={(date) => {
                      this.handleChange(date, 'toDate');
                    }}
                    selected={this.state.report.toDate}
                    id="toDate"
                    placeholderText="Date To"
                    dateFormat="MMMM d, yyyy"
                    className="input-text with-border icon-material-outline-date-range"
                  />
                  {this.state.report.toDateError === true ? (
                    <p style={{ color: 'red', marginTop: '13px' }}>
                      Please select date
                    </p>
                  ) : null}
                </div>
              </div>
            </div>
            <div class="col-xl-3">
              <div className="submit-field" style={{ marginTop: '-30px' }}>
                <button
                  href="#"
                  class="button ripple-effect big margin-top-30"
                  onClick={this.getReport}
                >
                  {this.state.waiting ? (
                    <Loader type="Bars" color="white" height={100} width={20} />
                  ) : (
                    <span>Generate Report</span>
                  )}
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-xl-12">
              <div class="dashboard-box margin-top-0">
                <div class="headline">
                  <h3>
                    <i class="icon-line-awesome-file-text" /> View Reports
                  </h3>
                </div>

                <div
                  class="content report-table with-padding padding-bottom-10"
                  style={{ height: '350px' }}
                >
                  <div class="row">
                    <div class="col-xl-12">
                      {this.props.report === null ||
                      this.state.setToBlank === true ? null : (
                        <RequestsReports
                          report={this.props.report}
                          type={this.state.report.reportType.value}
                          ref={(el) => (this.componentRef = el)}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-4">
              <button
                class="button ripple-effect margin-top-30"
                id="xls"
                onClick={this.export}
              >
                {this.state.fileDownloadProgress.xlsDownloading ? (
                  <Loader type="Bars" color="white" height={100} width={20} />
                ) : (
                  'Export To XLS'
                )}
              </button>
            </div>
            <div class="col-xl-4">
              <button
                class="button ripple-effect margin-top-30"
                id="pdf"
                onClick={this.export}
              >
                {this.state.fileDownloadProgress.pdfDownloading ? (
                  <Loader type="Bars" color="white" height={100} width={20} />
                ) : (
                  'Export To PDF'
                )}
              </button>
            </div>
            <div class="col-xl-4 print-button-container">
              {/* <a
                href="javascript:window.print()"
                class="button ripple-effect gray margin-top-30 print-button"
              >
                Print this invoice
              </a> */}
              <ReactToPrint
                copyStyles={true}
                trigger={() => (
                  <a class="button ripple-effect gray margin-top-30 print-button">
                    Print this Report
                  </a>
                )}
                content={() => this.componentRef}
              />
            </div>
          </div>
          <a
            hidden="true"
            href={url + this.props.downloadLink}
            id="download"
            download
          />
          {/* <p>{this.state.count}</p>
          <button onClick={this.increament}>Increment</button> */}
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    report: state.reportReducer.report,
    downloadLink: state.reportReducer.downloadLink,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getReport: (payload) => dispatch(getReport(payload)),
    downloadReport: (payload) => dispatch(downloadReport(payload)),
    getExpirationReport: (payload) => dispatch(getExpirationReport(payload)),
    downloadExpirationReport: (payload) =>
      dispatch(downloadExpirationReport(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Reports);
