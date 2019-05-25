import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

class Sidebar extends React.Component {
  render() {
    const { pathname } = this.props.location;
    console.log('current path', pathname);
    return (
      <React.Fragment>
        <div class="dashboard-sidebar">
          <div class="dashboard-sidebar-inner" data-simplebar>
            <div class="dashboard-nav-container">
              <a href="#" class="dashboard-responsive-nav-trigger">
                <span class="hamburger hamburger--collapse">
                  <span class="hamburger-box">
                    <span class="hamburger-inner" />
                  </span>
                </span>
                <span class="trigger-title">Dashboard Navigation</span>
              </a>

              <div class="dashboard-nav">
                <div class="dashboard-nav-inner">
                  <ul>
                    <li
                      className={
                        pathname === '/dashboard' || pathname === '/'
                          ? 'active'
                          : ''
                      }
                    >
                      <NavLink to={`/dashboard`} activeClassName="active">
                        <i class="icon-material-outline-dashboard" />
                        Dashboard
                      </NavLink>
                    </li>
                    <li className={pathname === '/addFacility' ? 'active' : ''}>
                      <a>
                        <i class="icon-material-outline-assignment" />{' '}
                        Facilities List
                      </a>
                      <ul>
                        <li>
                          <a
                            name="facilityActive"
                            href=""
                            id="view-facility"
                            onClick={this.handleItemClick}
                          >
                            View Facilities{' '}
                          </a>
                        </li>
                        <li>
                          {/* <a id="add-facility" onClick={this.handleItemClick}>
                            Add Fcailities
                          </a> */}
                          <NavLink to={`/addFacility`} activeClassName="active">
                            Add Facility
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="">
                        <i class="icon-line-awesome-users" /> User List
                      </a>
                      <ul>
                        <li>
                          <a href="view-users.html">View Users </a>
                        </li>
                        <li>
                          <a href="add-user.html">Add Users</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="add-inventory.html">
                        <i class="icon-feather-file-plus" /> Add Inventory
                      </a>
                    </li>
                    <li>
                      <a href="report.html">
                        <i class="icon-line-awesome-file-text" /> Reports
                      </a>
                    </li>
                    <li>
                      <a href="resport-list.html">
                        <i class="icon-material-outline-file-copy" /> Manage
                        Automatic Reports
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default withRouter(Sidebar);
