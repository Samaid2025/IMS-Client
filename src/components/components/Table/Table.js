import React, { Component } from 'react';
import TableHead from './tableHead';
import TableBody from './tableBody';
class Table extends Component {
  render() {
    return (
      <React.Fragment>
        <table class="basic-table">
          <TableHead
            headings={[
              'Name',
              'Address',
              'Phone',
              'Admin',
              // 'Available Date',
              'Linked Facilities',
            ]}
          />
          <TableBody
            data={this.props.data}
            handleFacilityEditClick={this.props.handleFacilityEditClick}
            handleFacilityDeleteClick={this.props.handleFacilityDeleteClick}
            waiting={this.props.waiting}
          />
        </table>
      </React.Fragment>
    );
  }
}

export default Table;
