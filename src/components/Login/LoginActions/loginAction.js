// import action_types from './action_types';
import axiosInstance from '../../../helpers/axios-instance';
import { action_types } from './action_types';

export function LoginSuccess(loginData) {
  return (dispatch) => {
    dispatch({ payload: loginData, type: action_types.LOGIN_SUCCESS });
  };
}
const performLogin = (payload) => {
  return (dispatch) => {
    return axiosInstance
      .post('http://192.168.10.104:8080/client/apis/UserLogin', payload)
      .then((response) => dispatch(LoginSuccess(response.data)));
  };
};

export default performLogin;
