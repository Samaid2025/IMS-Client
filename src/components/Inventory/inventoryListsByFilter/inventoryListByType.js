import React, { Component } from 'react';

const data = [
  {
    id: 1,
    asd: 'asda',
    sada: 'asda',
    asdasd: 'asda',
  },
];
class InventoryListByType extends Component {
  getColorClass = (days) => {
    if (days <= 2) {
      return 'td-danger';
    }
    if (days < 5) {
      return 'td-warning';
    }
    return 'td-success';
  };
  render() {
    return (
      <React.Fragment>
        <table className="basic-table">
          <tr>
            <th>Product Type</th>
            <th>Expiration</th>
            <th>Product ID</th>
            <th>Facility</th>
            <th>Available Date</th>
            <th>Request</th>
            <th>Ready</th>
            <th>Ship</th>
          </tr>
          {this.props.data.map((item, key) => (
            <tr key={item.id}>
              <td
                className={this.getColorClass(item.daysToExpire)}
                data-label="Column 1"
              >
                {item.product_type}
              </td>
              <td data-label="Column 2">{item.expiration_date}</td>
              <td data-label="Column 3">{item.product_id}</td>
              <td data-label="Column 4">{item.facility}</td>
              <td data-label="Column 5">{item.release_date}</td>
              <td class="td-custom" data-label="Column 6">
                <button
                  type="button"
                  class="button ripple-effect td-info-btn"
                  id={'request-' + item.id}
                  onClick={this.props.requestInventory}
                >
                  Request
                </button>
              </td>
              <td class="td-info" data-label="Column 7" />
              <td class="td-custom" data-label="Column 8">
                <button
                  type="button"
                  class="button ripple-effect td-info-btn"
                  id={'ship-' + item.id}
                  onClick={this.props.shipInventory}
                >
                  Ship
                </button>
              </td>
            </tr>
          ))}
        </table>
      </React.Fragment>
    );
  }
}
export default InventoryListByType;
