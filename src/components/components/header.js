import React from 'react';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      role: '',
      name: '',
    };
  }

  componentDidMount = () => {
    let role = window.localStorage.getItem('role');
    let name = window.localStorage.getItem('first_name');
    if (role !== null) {
      this.setState({
        role: role === 'ROLE_ADMIN' ? 'Admin' : 'User',
        name: name,
      });
    }
  };

  logout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('first_name');
    this.props.history.push('/login');
  };
  render() {
    return (
      <React.Fragment>
        <header
          id="header-container"
          class="fullwidth dashboard-header not-sticky"
        >
          <div id="header">
            <div class="container">
              <div class="left-side">
                <div id="logo">
                  <a href="dashboard.html">
                    <img src="images/logo.png" alt="" />
                  </a>
                </div>
              </div>

              <div class="right-side">
                <div class="header-widget">
                  <div class="header-notifications user-menu">
                    <div class="header-notifications-trigger">
                      <a href="#">
                        <div class="user-avatar status-online">
                          <img src="images/user-avatar-small-01.jpg" alt="" />
                        </div>
                      </a>
                    </div>

                    <div class="header-notifications-dropdown">
                      <div class="user-status">
                        <div class="user-details">
                          <div class="user-avatar status-online">
                            <img src="images/user-avatar-small-01.jpg" alt="" />
                          </div>
                          <div class="user-name">
                            {this.state.name} <span>{this.state.role}</span>
                          </div>
                        </div>
                      </div>

                      <ul class="user-menu-small-nav">
                        <li>
                          <button onClick={this.logout}>
                            <i class="icon-material-outline-power-settings-new" />{' '}
                            Logout
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <span class="mmenu-trigger">
                  <button class="hamburger hamburger--collapse" type="button">
                    <span class="hamburger-box">
                      <span class="hamburger-inner" />
                    </span>
                  </button>
                </span>
              </div>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

export default Header;
