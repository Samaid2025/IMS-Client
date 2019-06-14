import React from 'react';
import Loader from 'react-loader-spinner';

class TableBody extends React.Component {
  render() {
    if (this.props.data.length === 0 && this.props.waiting === false) {
      return (
        <React.Fragment>
          <tr>
            <td />
            <td />
            <td />
            <td>
              <h3>No Facilities available</h3>
            </td>
            <td />
            <td />
            <td />
          </tr>
        </React.Fragment>
      );
    }
    if (this.props.waiting === false) {
      return (
        <React.Fragment>
          {this.props.data.map((item, key) => (
            <tr key={item.id}>
              <td data-label="Column 1">{item.facility_name}</td>
              <td data-label="Column 2">{item.facility_address}</td>
              <td data-label="Column 3">{item.facility_phone}</td>
              <td data-label="Column 4">{item.facility_admin}</td>
              {/* <td data-label="Column 5">12/05/2018</td> */}
              <td data-label="Column 6">
                {/* <ul>
                  {item.linked_facilities.length === 0 ? (
                    <p>No linked facilities</p>
                  ) : (
                    item.linked_facilities.map((link, key) => (
                      <li key={link.id + 'key' + key}>{link.name}</li>
                    ))
                  )}
                </ul> */}
                {item.linked_facilities.length === 0 ? (
                  'No Linked Facilities'
                ) : (
                  <ul>
                    {item.linked_facilities.map((link, key) => (
                      <li key={link.id + 'key' + key}>{link.name}</li>
                    ))}
                  </ul>
                )}
              </td>
              <td data-label="Column 7">
                <button
                  class=" button ripple-effect ico"
                  title="Edit"
                  // id={'edit-' + item.id}
                  data-tippy-placement="top"
                  // onClick={this.props.handleFacilityEditClick}
                  style={{
                    padding: '5px',
                    marginRight: '12px',
                    marginBottom: '25px',
                  }}
                >
                  <i
                    class="icon-feather-edit"
                    id={'edit-' + item.id}
                    onClick={this.props.handleFacilityEditClick}
                  />
                </button>
                <button
                  class="button danger ripple-effect ico"
                  title="Remove"
                  data-tippy-placement="top"
                  style={{ padding: '5px', marginBottom: '25px' }}
                >
                  <i
                    class="icon-feather-trash-2"
                    id={'del-' + item.id}
                    onClick={this.props.handleFacilityDeleteClick}
                  />
                </button>
              </td>
            </tr>
          ))}
        </React.Fragment>
      );
    }
    if (this.props.waiting === true) {
      return (
        <React.Fragment>
          <tr>
            <td />
            <td />
            <td />
            <td>
              <Loader type="RevolvingDot" color="blue" height={40} width={40} />
            </td>
            <td />
            <td />
            <td />
          </tr>
          <Loader type="Bars" color="white" height={100} width={20} />
        </React.Fragment>
      );
    }
  }
}

export default TableBody;
