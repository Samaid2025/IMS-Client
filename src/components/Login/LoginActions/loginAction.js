// import action_types from './action_types';
import axiosInstance from '../../../helpers/axios-instance';
import { action_types } from './action_types';
import { url } from '../../../helpers/urls';
export function LoginSuccess(loginData) {
  return (dispatch) => {
    dispatch({ payload: loginData, type: action_types.LOGIN_SUCCESS });
  };
}
const performLogin = (payload) => {
  return (dispatch) => {
    return axiosInstance
      .post(url + '/client/apis/UserLogin', payload)
      .then((response) => dispatch(LoginSuccess(response.data)));
  };
};

export default performLogin;
