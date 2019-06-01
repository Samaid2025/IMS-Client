import React from 'react';
import CustomInput from '../components/customInput';
import { connect } from 'react-redux';
import performLogin from './LoginActions/loginAction';
import Loader from 'react-loader-spinner';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login_credentials: {
        username: '',
        password: '',
        usernameError: false,
        passwordError: false,
      },
      errorMessage: '',
      waiting: false,
    };
  }

  componentDidMount = () => {
    if (
      window.localStorage.getItem('first_name') !== null &&
      window.localStorage.getItem('token') !== null &&
      window.localStorage.getItem('user_id') !== null
    ) {
      this.props.history.push('/dashboard');
    }
  };

  handleChange = (e) => {
    const { login_credentials } = this.state;
    login_credentials[e.target.id] = e.target.value;
    login_credentials[e.target.id + 'Error'] = false;
    this.setState({
      login_credentials: login_credentials,
      errorMessage: '',
    });
  };

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleLoginCLick();
    }
  };

  validateLoginData = () => {
    let isValid = true;
    let { login_credentials } = this.state;
    if (login_credentials.username === '') {
      login_credentials['usernameError'] = true;
      this.setState({
        login_credentials: login_credentials,
      });
      isValid = false;
    }
    if (login_credentials.password === '') {
      login_credentials['passwordError'] = true;
      this.setState({
        login_credentials: login_credentials,
      });
      isValid = false;
    }
    return isValid;
  };

  handleLoginCLick = () => {
    if (this.validateLoginData() === false) {
      return;
    }
    this.setState({
      waiting: true,
    });
    this.props
      .performLogin(this.state.login_credentials)
      .then(() => {
        const { loginData } = this.props;
        console.log('login resposne', loginData.status);
        if (loginData.status === 200) {
          window.localStorage.setItem('user_id', loginData.data.id);
          window.localStorage.setItem('email', loginData.data.email);
          window.localStorage.setItem('token', loginData.data.token);
          window.localStorage.setItem('first_name', loginData.data.first_name);
          window.localStorage.setItem('role', loginData.data.role);
          // this.props.history.push('/dashboard');
          window.location = '/dashboard';
        } else {
          this.setState({
            errorMessage: 'Invalid login credentials',
            waiting: false,
          });
        }
      })
      .catch((e) => {
        this.setState({
          errorMessage: 'IMS could not be contacted',
          waiting: false,
        });
      });
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row margin-top-60">
            <div className="col-xl-5 offset-xl-3">
              <div className="login-register-page">
                <div className="welcome-text margin-bottom-50">
                  <h3>Log In</h3>
                </div>

                <form
                  method="post"
                  id="login-form"
                  onKeyDown={this.handleKeyPress}
                >
                  <CustomInput
                    type="text"
                    value={this.state.login_credentials.username}
                    id="username"
                    placeholder="User ID"
                    onChange={this.handleChange}
                    hasIcon={true}
                    iconClass="icon-line-awesome-user"
                    error={this.state.login_credentials.usernameError}
                    helpText="Username is required"
                  />

                  <CustomInput
                    type="password"
                    value={this.state.login_credentials.password}
                    id="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    hasIcon={true}
                    iconClass="icon-material-outline-lock"
                    error={this.state.login_credentials.passwordError}
                    helpText="Password is required"
                  />
                </form>
                <p style={{ color: 'red' }}>{this.state.errorMessage}</p>
                <button
                  onClick={this.handleLoginCLick}
                  className="button full-width button-sliding-icon ripple-effect margin-top-50"
                >
                  {this.state.waiting ? (
                    <Loader type="Bars" color="white" height={20} width={20} />
                  ) : (
                    <span>
                      Log In{' '}
                      <i className="icon-material-outline-arrow-right-alt" />
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loginData: state.LoginReducer.loginData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    performLogin: (payload) => dispatch(performLogin(payload)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
