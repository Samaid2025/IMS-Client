import React, { Component } from 'react';

class RequestsReports extends Component {
  render() {
    if (this.props.type === 'Inventory Requests Report') {
      return (
        <React.Fragment>
          <table className="basic-table">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Expiration</th>
                <th>Received Date</th>
                <th>Requested To</th>
                <th>Requested From</th>
              </tr>
            </thead>
            <tbody>
              {this.props.report.map((item, key) => (
                <tr key={'reportItem' + key}>
                  <td>{item.product_name}</td>
                  <td>{item.expiration_date}</td>
                  <td>{item.received_date}</td>
                  <td>{item.facility_to}</td>
                  <td>{item.facility_from}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      );
    } else if (this.props.type === 'Inventory Expiration Report') {
      return (
        <React.Fragment>
          <table className="basic-table">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Expiration</th>
                <th>RFID Number</th>
                <th>Facility</th>
              </tr>
            </thead>
            <tbody>
              {this.props.report.map((item, key) => (
                <tr key={'reportItem' + key}>
                  <td>{item.product_id}</td>
                  <td>{item.expiration_date}</td>
                  <td>{item.rfid}</td>
                  <td>{item.facility}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </React.Fragment>
      );
    } else {
      return <React.Fragment />;
    }
  }
}
export default RequestsReports;
