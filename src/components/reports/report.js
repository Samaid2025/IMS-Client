import React, { Component } from 'react';
import Container from '../components/container';
class Reports extends Component {
  render() {
    return (
      <React.Fragment>
        <Container title="Reports">
          <div class="row">
            <div class="col-xl-4">
              <div class="submit-field">
                <select
                  class="selectpicker with-border"
                  title="Select Report Type"
                >
                  <option>Report A</option>
                  <option>Report B</option>
                  <option>Report C</option>
                </select>
              </div>
            </div>

            <div class="col-xl-4">
              <div class="submit-field">
                <div class="input-with-icon">
                  <div id="autocomplete-container">
                    <input
                      id="datepickerFrom"
                      class="with-border"
                      type="text"
                      placeholder="Date From"
                    />
                  </div>
                  <i class="icon-material-outline-date-range" />
                </div>
              </div>
            </div>

            <div class="col-xl-4">
              <div class="submit-field">
                <div class="input-with-icon">
                  <div id="autocomplete-container">
                    <input
                      id="datepickerTo"
                      class="with-border"
                      type="text"
                      placeholder="Date To"
                    />
                  </div>
                  <i class="icon-material-outline-date-range" />
                </div>
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
                  class="content with-padding padding-bottom-10"
                  style={{ height: '350px' }}
                >
                  <div class="row">
                    <div class="col-xl-12" />
                  </div>
                </div>
              </div>
            </div>

            <div class="col-xl-4">
              <a href="#" class="button ripple-effect margin-top-30">
                {' '}
                EXPORT TO XLS
              </a>
            </div>
            <div class="col-xl-4">
              <a href="#" class="button ripple-effect margin-top-30">
                {' '}
                EXPORT TO PDF
              </a>
            </div>
            <div class="col-xl-4 print-button-container">
              <a
                href="javascript:window.print()"
                class="button ripple-effect gray margin-top-30 print-button"
              >
                Print this invoice
              </a>
            </div>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default Reports;
